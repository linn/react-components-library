import t,{useEffect as e}from"react";export default function(i){return function(n){var r=n.initialise,o=n.itemId;return e(function(){r&&o?r({itemId:o}):r&&r()},[r,o]),t.createElement(i,n)}}
