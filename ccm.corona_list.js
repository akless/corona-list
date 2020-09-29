/**
 * @overview <i>ccmjs</i>-based component for corona list
 * @author André Kless <andre.kless@web.de> 2020
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (29.09.2020)
 */

( () => {

  const component = {

    name: 'corona_list',

    ccm: 'https://ccmjs.github.io/akless-components/quick_question/resources/ccm.js',

    config: {
//    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/styles.css" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/helper.mjs" ],
      "html": [ "ccm.load", "https://akless.github.io/corona-list/resources/templates.mjs" ],
      "qr_code": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ]
    },

    Instance: function () {

      let $;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        const onConfirm = () => {

          const results = $.formData( this.element );

          const validInputResults = async () => {
            const { email, tel } = results;

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
          };

          if ( !validInputResults() ) return;

          const showQrCode = () => {

            const secret = btoa( JSON.stringify( results ) );
            try {
              const demoQRCode = qrcode( 0, 'M' );
              demoQRCode.addData( 'https://akless.github.io/corona-list/#' + secret );
              demoQRCode.make();
              const qrCodeSVGTag = document.createElement( 'div' );
              qrCodeSVGTag.innerHTML = demoQRCode.createImgTag();
              $.setContent( this.element, qrCodeSVGTag.firstChild );
            } catch ( e ) {}

          };

          showQrCode();

        };

        $.render( $.html( this.html.input, onConfirm ), this.element );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();