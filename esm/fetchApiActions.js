import{i as t,j as e}from"./chunk-24be6bba.js";import{RSAA as n}from"redux-api-middleware";import{F as r}from"./chunk-2aea02a5.js";export default function(a,c,o,s){var i,p={type:o["REQUEST_".concat(a)],payload:{}},u={type:o["RECEIVE_".concat(a)],payload:(i=e(regeneratorRuntime.mark(function t(e,n,r){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.json();case 2:return t.t0=t.sent,t.abrupt("return",{data:t.t0});case 4:case"end":return t.stop()}},t)})),function(t,e,n){return i.apply(this,arguments)})},d={type:r,payload:function(t,e,n){return n?"Error - ".concat(n.status," ").concat(n.statusText):"Network request failed"}};this.fetch=function(){return t({},n,{endpoint:"".concat(s).concat(c),method:"GET",options:{requiresAuth:!0},headers:{Accept:"application/json"},types:[p,u,d]})},this.fetchPage=function(e,r){return t({},n,{endpoint:"".concat(s).concat(c,"/").concat(e,"/").concat(r),method:"GET",options:{requires:!0},headers:{Accept:"application/json"},types:[p,u,d]})},this.fetchSortedPage=function(e,r,a,o){return t({},n,{endpoint:"".concat(s).concat(c,"/").concat(e,"/").concat(r,"/").concat(a,"/").concat(o),method:"GET",options:{requires:!0},headers:{Accept:"application/json"},types:[p,u,d]})},this.search=function(r){return t({},n,{endpoint:"".concat(s).concat(c,"?searchTerm=").concat(r),method:"GET",options:{requiresAuth:!0},headers:{Accept:"application/json"},types:[{type:o["REQUEST_SEARCH_".concat(a)],payload:{}},{type:o["RECEIVE_SEARCH_".concat(a)],payload:(i=e(regeneratorRuntime.mark(function t(e,n,r){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.json();case 2:return t.t0=t.sent,t.abrupt("return",{data:t.t0});case 4:case"end":return t.stop()}},t)})),function(t,e,n){return i.apply(this,arguments)})},d]});var i},this.clearSearch=function(){return{type:o["CLEAR_SEARCH_".concat(a)],payload:{}}}}
