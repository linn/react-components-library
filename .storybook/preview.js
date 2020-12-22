// import { configure, addDecorator } from '@storybook/react';
// // import { withOptions } from '@storybook/addon-options';
// import { addons } from '@storybook/addons';

// // Option defaults:
// addDecorator(
//     withOptions({
//         /**
//          * name to display in the top left corner
//          * @type {String}
//          */
//         name: 'Linn',
//         /**
//          * URL for name in top left corner to link to
//          * @type {String}
//          */
//         url: 'https://github.com/linn/react-components-library',
//         /**
//          * show story component as full screen
//          * @type {Boolean}
//          */
//         goFullScreen: false,
//         /**
//          * display panel that shows a list of stories
//          * @type {Boolean}
//          */
//         showStoriesPanel: true,
//         /**
//          * display panel that shows addon configurations
//          * @type {Boolean}
//          */
//         showAddonPanel: true,
//         /**
//          * display floating search box to search through stories
//          * @type {Boolean}
//          */
//         showSearchBox: false,
//         /**
//          * show addon panel as a vertical panel on the right
//          * @type {Boolean}
//          */
//         addonPanelInRight: false,
//         /**
//          * sorts stories
//          * @type {Boolean}
//          */
//         sortStoriesByKind: false,
//         /**
//          * regex for finding the hierarchy separator
//          * @example:
//          *   null - turn off hierarchy
//          *   /\// - split by `/`
//          *   /\./ - split by `.`
//          *   /\/|\./ - split by `/` or `.`
//          * @type {Regex}
//          */
//         hierarchySeparator: null,
//         /**
//          * regex for finding the hierarchy root separator
//          * @example:
//          *   null - turn off multiple hierarchy roots
//          *   /\|/ - split by `|`
//          * @type {Regex}
//          */
//         hierarchyRootSeparator: null,
//         /**
//          * sidebar tree animations
//          * @type {Boolean}
//          */
//         sidebarAnimations: true,
//         /**
//          * id to select an addon panel
//          * @type {String}
//          */
//         selectedAddonPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
//         /**
//          * enable/disable shortcuts
//          * @type {Boolean}
//          */
//         enableShortcuts: true, // true by default,
//         selectedKind: undefined
//     })
// );

// // const req = require.context('../src/stories', true, /.stories.js$/);

// // function loadStories() {
// //     req.keys().forEach(filename => req(filename));
// // }

// // configure(loadStories, module);
