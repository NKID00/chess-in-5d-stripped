
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      wide_lg_1920: {
        name: 'Desktop Wide Mode (LG) 1920x1080',
        styles: {
          width: '1920px',
          height: '1080px'
        },
        type: 'desktop'
      },
      wide_lg_1600: {
        name: 'Desktop Wide Mode (LG) 1600x900',
        styles: {
          width: '1600px',
          height: '900px'
        },
        type: 'desktop'
      },
      wide_lg_1440: {
        name: 'Desktop Wide Mode (LG) 1440x900',
        styles: {
          width: '1440px',
          height: '900px'
        },
        type: 'desktop'
      },
      wide_lg_1366: {
        name: 'Desktop Wide Mode (LG) 1366x768',
        styles: {
          width: '1366px',
          height: '768px'
        },
        type: 'desktop'
      },
      wide_lg_1280: {
        name: 'Tablet Wide Mode (LG) 1280x800',
        styles: {
          width: '1280px',
          height: '800px'
        },
        type: 'tablet'
      },
      wide_lg_1280_2: {
        name: 'Desktop Wide Mode (LG) 1280x720',
        styles: {
          width: '1280px',
          height: '720px'
        },
        type: 'desktop'
      },
      wide_md_1024: {
        name: 'Tablet Wide Mode (MD) 1024x768',
        styles: {
          width: '1024px',
          height: '768px'
        },
        type: 'tablet'
      },
      wide_sm_962: {
        name: 'Tablet Wide Mode (SM) 962x600',
        styles: {
          width: '962px',
          height: '600px'
        },
        type: 'tablet'
      },
      wide_sm_896: {
        name: 'Mobile Wide Mode (SM) 896x414',
        styles: {
          width: '896px',
          height: '414px'
        },
        type: 'mobile'
      },
      wide_sm_780: {
        name: 'Mobile Wide Mode (SM) 780x360',
        styles: {
          width: '780px',
          height: '360px'
        },
        type: 'mobile'
      },
      wide_xs_640: {
        name: 'Mobile Wide Mode (XS) 640x360',
        styles: {
          width: '640px',
          height: '360px'
        },
        type: 'mobile'
      },
      wide_xxs_426: {
        name: 'Mobile Wide Mode (XXS) 426x240',
        styles: {
          width: '426px',
          height: '240px'
        },
        type: 'mobile'
      },

      tall_lg_1440: {
        name: 'Desktop Tall Mode (LG) 1440x2560',
        styles: {
          width: '1440px',
          height: '2560px'
        },
        type: 'desktop'
      },
      tall_md_1080: {
        name: 'Desktop Tall Mode (MD) 1080x1920',
        styles: {
          width: '1080px',
          height: '1920px'
        },
        type: 'desktop'
      },
      tall_sm_900: {
        name: 'Desktop Tall Mode (SM) 900x1600',
        styles: {
          width: '900px',
          height: '1600px'
        },
        type: 'desktop'
      },
      tall_sm_900_2: {
        name: 'Desktop Tall Mode (SM) 900x1440',
        styles: {
          width: '900px',
          height: '1440px'
        },
        type: 'desktop'
      },
      tall_sm_800: {
        name: 'Tablet Tall Mode (SM) 800x1280',
        styles: {
          width: '800px',
          height: '1280px'
        },
        type: 'tablet'
      },
      tall_sm_768: {
        name: 'Desktop Tall Mode (SM) 768x1366',
        styles: {
          width: '768px',
          height: '1366px'
        },
        type: 'desktop'
      },
      tall_sm_768_2: {
        name: 'Tablet Tall Mode (SM) 768x1024',
        styles: {
          width: '768px',
          height: '1024px'
        },
        type: 'tablet'
      },
      tall_xs_720: {
        name: 'Desktop Tall Mode (XS) 720x1280',
        styles: {
          width: '720px',
          height: '1280px'
        },
        type: 'desktop'
      },
      tall_xs_600: {
        name: 'Tablet Tall Mode (XS) 600x962',
        styles: {
          width: '600px',
          height: '962px'
        },
        type: 'tablet'
      },
      tall_xxs_414: {
        name: 'Mobile Tall Mode (XXS) 414x896',
        styles: {
          width: '414px',
          height: '896px'
        },
        type: 'mobile'
      },
      tall_xxs_360: {
        name: 'Mobile Tall Mode (XXS) 360x780',
        styles: {
          width: '360px',
          height: '780px'
        },
        type: 'mobile'
      },
      tall_xxs_360_2: {
        name: 'Mobile Tall Mode (XXS) 360x640',
        styles: {
          width: '360px',
          height: '640px'
        },
        type: 'mobile'
      },
    }
  }
}