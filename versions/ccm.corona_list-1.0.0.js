/**
 * @overview <i>ccmjs</i>-based web component for corona list
 * @author André Kless <andre.kless@web.de> 2020
 * @version 1.0.0
 * @changes
 * version 1.0.0 (10.10.2020)
 */

// immediate invoked function expression (IIFE) to encapsulate inner local variables
( function () {

  /**
   * object that defines the component
   * @type {Object}
   */
  const component = {

    /**
     * unique name of the component
     * @type {string}
     */
    name: 'corona_list',

    /**
     * default used version of the <i>ccmjs</i> web technology
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.0.0.js',

    /**
     * default app configuration
     * @type {Object}
     */
    config: {
      "html": [ "ccm.load", "https://akless.github.io/corona-list/resources/templates.mjs" ],                     // default HTML templates
      "css": [ "ccm.load",                                                                                        // default layout => bootstrap and fonts
        "https://akless.github.io/corona-list/resources/styles.css",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        { "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css" },
        { "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css", "context": "head" }
      ],
      "store": [ "ccm.store", { "name": "corona-list" } ],                                                        // offline datastore for saved guests data
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.0.mjs" ],    // useful help functions
      "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ]  // JavaScript library for creating QR codes
    },

    /**
     * Instances can be created from the component. Each instance can then design its own website area.
     * @constructor
     */
    Instance: function () {

      /**
       * shortcut to access the help functions
       * @type {Object}
       */
      let $;

      /**
       * reference to the instance for inner functions
       * @type {component}
       */
      const self = this;

      /**
       * called when the app is started
       * @function
       * @returns {Promise<void>}
       */
      this.start = async function () {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        /**
         * received encoded guest data from web URL (if any exists)
         * @type {string}
         */
        const received_guest_data = location.href.split( '#' )[ 1 ];

        if ( received_guest_data )            // has received guest data?
          renderReceivedGuestData();          // => show it
        else if ( await this.store.count() )  // has already saved guests data?
          renderGuestsList();                 // => show it
        else                                  // otherwise:
          guestView();                        // => show guest view

        /** renders the guest view in the webpage area of the component */
        function guestView() {

          // get already existing encoded guest data from Local Storage (if any exists)
          const encoded_guest_data = localStorage.getItem( 'corona-list' );

          if ( encoded_guest_data )                   // has encoded guest data?
            renderGuestQrCode( encoded_guest_data );  // => show QR code
          else                                        // otherwise:
            renderGuestForm();                        // => show form for entering guest data

          /**
           * renders the form for entering guest data in the webpage area of the component
           * @param {Object} [initial_values] - initial values for input fields
           */
          function renderGuestForm( initial_values ) {

            // render HTML template for entering guest data in the webpage area of the component
            $.render( $.html( self.html.guestForm, onSubmit, onCancel, onDelete, initial_values ), self.element );

            /** callback when submit button is clicked */
            async function onSubmit( event ) {

              // prevent page reload
              event.preventDefault();
              const form = self.element.querySelector( 'form' );
              const is_valid = form.checkValidity();
              form.reportValidity();
              if ( !is_valid ) return;

              /**
               * entered guest data
               * @type {Object}
               */
              const guest_data = $.formData( self.element );

              // guest data is not valid? => abort
              if ( !( await isValidGuestData() ) ) return;

              const encoded_guest_data = btoa( JSON.stringify( guest_data ) );  // encode guest data
              localStorage.setItem( 'corona-list', encoded_guest_data )         // save encoded guest data in Local Storage
              renderGuestQrCode( encoded_guest_data );                          // render QR code of the guest for restaurant owner

              /** checks whether the guest data is valid */
              async function isValidGuestData() {

                const { name, adress, tel, email } = guest_data;

                if ( !name || ( !adress && !email && !tel ) ) return false;

                // verify email
                if ( email ) {
                  //sendEmail( email );
                  //const number = await enterConfirmNumber();
                  //if ( !validNumber( number ) ) return false;
                }

                // verify tel
                if ( tel ) {
                  //sendSms( tel );
                  //const number = await enterConfirmNumber();
                  //if ( !validNumber( number ) ) return false;
                }

                return true;
              }

            }

            /** callback when cancel button is clicked */
            function onCancel() {
              guestView();
            }

            /** callback when delete button is clicked */
            function onDelete() {

              if ( confirm( 'Sind Sie sicher, dass Sie die Kontaktdaten löschen wollen?' ) ) {  // confirm deletion
                localStorage.removeItem( 'corona-list' );                                       // delete guest data in Local Storage
                guestView();                                                                    // clear input fields
              }

            }

          }

          /** shows the QR code in the webpage area of the component */
          function renderGuestQrCode( encoded_quest_data ) {

            // render HTML template for the QR code of the guest in the webpage area of the component
            $.render( $.html( self.html.qrCode, 'Kontaktdaten editieren', onEdit ), self.element );

            // render QR code to share the app
            renderQrCode( location.href.split( '#' )[ 0 ] + '#' + encoded_quest_data );

            /** callback when edit button is clicked */
            function onEdit() {

              /**
               * decoded guest data
               * @type {Object}
               */
              const decoded_guest_data = JSON.parse( atob( encoded_quest_data ) );

              // render form for entering guest data with decoded guest data as initial values
              renderGuestForm( decoded_guest_data );

            }

          }

        }

        /** renders the received guest data in the webpage area of the component */
        async function renderReceivedGuestData() {

          /**
           * decoded received guest data
           * @type {Object}
           */
          const guest_data = JSON.parse( atob( received_guest_data ) );

          /**
           * current date and time
           * @type {Date}
           */
          const timestamp = new Date( Date.now() );

          // expand received guest data
          guest_data.key = await self.store.count() + 1;     // add unique key
          guest_data.date = timestamp.toLocaleDateString();  // add date
          guest_data.time = timestamp.toLocaleTimeString();  // add time

          // render HTML template that shows the received guest data in the webpage area of the component
          $.render( $.html( self.html.guestData, onSave, onDiscard, guest_data ), self.element );

          /** callback when save button is clicked */
          async function onSave() {
            await self.store.set( guest_data );                        // save guest data in IndexedDB
            window.location = window.location.href.split( '#' )[ 0 ];  // remove encoded guest data from web URL (restarts the app)
          }

          /** callback when discard button is clicked */
          function onDiscard() {
            if ( confirm( "Sind Sie sicher, dass Sie die empfangenen Daten verwerfen wollen?" ) )
              window.location = window.location.href.split( '#' )[ 0 ];  // remove encoded guest data from web URL (restarts the app)
          }

        }

        /** renders the list of all already saved guests data */
        async function renderGuestsList() {

          /**
           * all already saved guests data from IndexedDB
           * @type {Object[]}
           */
          const guests_data = await self.store.get();

          // render HTML template that shows all already saved guests data in the webpage area of the component
          $.render( $.html( self.html.guestsList, guests_data, onDelete, onPrint, onShareApp, onGuestMode, onDeleteAll ), self.element );

          /**
           * callback when delete button is clicked
           * @param {string} key - unique key of the corresponding guest data
           */
          async function onDelete( key ) {

            // make sure that this operation is really wanted
            if ( !confirm( 'Sind Sie sicher, dass Sie den Datensatz unwideruflich löschen wollen?' ) ) return;

            await self.store.del( key );  // delete guest data in IndexedDB
            await self.start();           // restart app (updates table)

          }

          /** callback when print button is clicked */
          function onPrint() {
            window.print();
          }

          /** callback when button for guest mode is clicked */
          function onGuestMode() {
            guestView();
          }

          /** callback when share button is clicked */
          function onShareApp() {

            // render HTML template for the QR code to share the app in the webpage area of the component
            $.render( $.html( self.html.qrCode, 'Zurück', renderGuestsList ), self.element );

            // render QR code to share the app
            renderQrCode( location.href.split( '#' )[ 0 ] );

          }

          /** callback when 'delete all' button is clicked */
          async function onDeleteAll() {

            // make sure that this operation is really wanted
            if ( !confirm( 'Sind Sie sicher, dass Sie alle Kontaktdaten unwideruflich löschen wollen?' ) ) return;

            for ( let i = 0; i < guests_data.length; i++ )       // for each guest data:
              await self.store.del( guests_data[ i ].key );      // => delete guest data in IndexedDB
            alert( 'Alle Kontaktdaten erfolgreich gelöscht!' );  // show success message
            await self.start();                                  // restart app

          }

        }

        /**
         * renders a QR code
         * @param {string} url - web adress that opens when QR code is scanned
         */
        function renderQrCode( url ) {
          console.log( url );

          // create QR code and put it into frontend
          try {
            const code = qrcode( 0, 'M' );
            code.addData( url );
            code.make();
            self.element.querySelector( '#qrcode' ).innerHTML = code.createSvgTag();
            self.element.querySelector( '#qrcode svg' ).removeAttribute( 'width' );
            self.element.querySelector( '#qrcode svg' ).removeAttribute( 'height' );
          } catch ( e ) {}

        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();