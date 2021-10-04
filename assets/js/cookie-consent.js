/**
 * @link [orestbida/cookieconsent](https: //github.com/orestbida/cookieconsent)
 */
$(function () {
  // obtain cookieconsent plugin
  var cc = initCookieConsent();
  var description = 'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only upon approval. <a aria-label="Cookie policy" class = "cc-link" href = "/cookies/" >Read more</a>';

  // run plugin with config object
  cc.run({
    autorun: true,
    delay: 0,
    current_lang: 'en',
    autoclear_cookies: true,
    cookie_expiration: 365,

    gui_options: {
      consent_modal: {
        layout: 'cloud',
        position: 'bottom',
        transition: 'slide'
      },
      settings_modal: {
        layout: 'box',
        transition: 'slide'
      }
    },

    onAccept: function (cookies) {
      if (cc.allowedCategory('analytics_cookies')) {
        cc.loadScript('https://www.googletagmanager.com/gtag/js?id=G-YF5EFDHHXC', function () {
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'G-YF5EFDHHXC');
        });
      }
    },

    languages: {
      en: {
        consent_modal: {
          title: "Cookies on the Playbook site",
          description: description,
          primary_btn: {
            text: 'Accept',
            role: 'accept_all' //'accept_selected' or 'accept_all'
          },
          secondary_btn: {
            text: 'Settings',
            role: 'settings' //'settings' or 'accept_necessary'
          }
        },
        settings_modal: {
          title: 'Cookie preferences',
          save_settings_btn: "Save settings",
          accept_all_btn: "Accept all",
          cookie_table_headers: [{
              col1: "Name"
            },
            {
              col2: "Domain"
            },
            {
              col3: "Expiration"
            },
            {
              col4: "Description"
            },
            {
              col5: "Type"
            }
          ],
          blocks: [{
              title: "Cookie usage",
              description: description,
            },
            {
              title: "Analytics cookies",
              description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you.',
              toggle: {
                value: 'analytics_cookies',
                enabled: false,
                readonly: false
              },
            }
          ]
        }
      }
    }
  });

});