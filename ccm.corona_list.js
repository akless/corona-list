/**
 * @overview <i>ccmjs</i>-based web component for corona list
 * @author André Kless <andre.kless@web.de> 2020
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (06.10.2020)
 */

// immediate invoked function expression (IIFE) to encapsulate inner local variables
( () => {

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
//    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/styles.css" ],     // default layout
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
      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        /**
         * encoded guest data from web URL (if any exists)
         * @type {string}
         */
        const web_url_data = location.href.split( '#' )[ 1 ];

        if ( web_url_data )      // has encoded guest data from web URL?
          restaurantOwnerView()  // => render restaurant owner view
        else                     // otherwise:
          guestView();           // => render guest view

        /** renders the guest view in the webpage area */
        function guestView() {

          // get already existing encoded guest data from Session Storage (if any exists)
          const encoded_guest_data = sessionStorage.getItem( 'corona-list' );

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
            $.render( $.html( self.html.guestForm, onConfirm, onCancel ), self.element );

            // has start values? => fill the input fields with initial values
            if ( initial_values )
              $.fillForm( self.element, initial_values );

            /** callback when confirm button is clicked */
            async function onConfirm() {

              /**
               * entered guest data
               * @type {Object}
               */
              const guest_data = $.formData( self.element );

              // guest data is not valid? => abort
              if ( !( await isValidGuestData() ) ) return;

              const encoded_guest_data = btoa( JSON.stringify( guest_data ) );  // encode guest data
              sessionStorage.setItem( 'corona-list', encoded_guest_data )       // save encoded guest data in Session Storage
              renderGuestQrCode( encoded_guest_data );                          // render QR code of the guest for restaurant owner

              /** checks whether the guest data is valid */
              async function isValidGuestData() {

                const { email, tel } = guest_data;

                if ( !email && !tel ) return false;

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
              renderGuestQrCode( encoded_guest_data );
            }

          }

          /** shows the QR code in the webpage area of the component */
          function renderGuestQrCode( encoded_quest_data ) {

            // render HTML template for the QR code of the guest in the webpage area of the component
            $.render( $.html( self.html.guestQrCode, onEdit ), self.element );

            // create QR code and put it into frontend
            try {
              const demoQRCode = qrcode( 0, 'M' );
              const url = location.href.split( '#' )[ 0 ] + '#' + encoded_quest_data;
              console.log( url );
              demoQRCode.addData( url );
              demoQRCode.make();
              const qrCodeSVGTag = document.createElement( 'div' );
              qrCodeSVGTag.innerHTML = demoQRCode.createImgTag();
              $.setContent( self.element.querySelector( '#qrcode' ), qrCodeSVGTag.firstChild );
            } catch ( e ) {}

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

        /** renders the restaurant owner view in the webpage area */
        function restaurantOwnerView() {

          renderTable();

          function renderTable() {
            $.render( $.html( self.html.table, new Date( Date.now() ).toString(), web_url_data ), self.element );
          }

        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();