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
      "html": [ "ccm.load", "https://akless.github.io/corona-list/resources/templates.mjs" ]
    },

    Instance: function () {

      let $;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        this.element.innerHTML = 'Hello, World!';

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();