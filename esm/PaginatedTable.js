import e,{useState as t,Fragment as r}from"react";import n from"@material-ui/core/Button";import o from"prop-types";import{a,h as i}from"./chunk-24be6bba.js";import l from"@material-ui/core/Typography";import c from"@material-ui/core/Table";import m from"@material-ui/core/TableBody";import s from"@material-ui/core/TableCell";import u from"@material-ui/core/TableHead";import p from"@material-ui/core/TableRow";import d from"@material-ui/styles/makeStyles";import"@material-ui/core/IconButton";import f from"@material-ui/core/TablePagination";import g from"@material-ui/core/TableFooter";import b from"@material-ui/core/TableSortLabel";import E from"@material-ui/icons/Edit";import P from"@material-ui/core/LinearProgress";import y from"./utilities.js";import"@material-ui/icons/FirstPage";import"@material-ui/icons/KeyboardArrowLeft";import"@material-ui/icons/KeyboardArrowRight";import"@material-ui/icons/LastPage";import h from"./TablePaginationActions.js";var k=d(function(e){return{link:{"&:hover":{cursor:"pointer"}},button:{maxWidth:e.spacing(5),minWidth:e.spacing(5),maxHeight:e.spacing(3),minHeight:e.spacing(3),padding:0},exandedRow:{background:e.palette.grey[100]},expandedTitleText:{fontWeight:e.typography.fontWeightBold}}});function w(o){var d=o.sortable,w=o.handleRowLinkClick,T=o.expandable,v=o.loading,x=o.columns,C=o.rows,R=o.pageOptions,A=o.setPageOptions,O=o.totalItemCount,B=t(),j=a(B,2),S=j[0],H=j[1],L=k();return e.createElement(c,{size:"small"},e.createElement(u,null,e.createElement(p,null,Object.keys(x).map(function(t){return d?e.createElement(s,{key:t,sortDirection:R.orderBy===t&&R.orderAscending?"asc":"desc"},e.createElement(b,{active:R.orderBy===t,direction:R.orderAscending?"asc":"desc",onClick:function(){return e=t,void A(function(t){return i({},t,{orderBy:e,orderAscending:!t.orderAscending})});var e}},x[t])):e.createElement(s,null,x[t])}),T&&e.createElement(s,null,"Actions"))),v?e.createElement(s,{colspan:x.length+1},e.createElement(P,null)):e.createElement(r,null,e.createElement(m,null,C.map(function(t){return e.createElement(r,{key:t.id},e.createElement(p,{className:L.link,hover:!0,onClick:function(){return T?(e=t.id,H(S===e?null:e)):w(y.getSelfHref(t));var e}},Object.keys(t).filter(function(e){return function(e){return"elements"!==e&&"links"!==e&&"href"!==e&&"id"!==e}(e)}).map(function(r){return e.createElement(s,{component:"th",scope:"row"},t[r]||"-")}),T&&e.createElement(s,null,e.createElement(n,{classes:{root:L.button},key:y.getSelfHref(t),onClick:function(){return w(y.getSelfHref(t))},size:"small",variant:"outlined",color:"primary"},e.createElement(E,{fontSize:"small"})))),T&&S===t.id&&t.elements&&e.createElement(p,null,e.createElement(s,{colspan:Object.keys(x).length+1},e.createElement(c,null,t.elements.map(function(t){return e.createElement(p,null,Object.keys(t).map(function(r){return e.createElement(s,{classes:{root:L.exandedRow},size:"small"},e.createElement(l,{classes:{root:L.expandedTitleText},variant:"caption"},r,":"),e.createElement(l,{variant:"caption"}," ".concat(t[r])))}))})))))})),e.createElement(g,null,O&&e.createElement(p,null,e.createElement(f,{rowsPerPageOptions:[5,10,25,50],count:O,rowsPerPage:R.rowsPerPage,page:R.currentPage,SelectProps:{native:!0},onChangePage:function(e,t){A(function(e){return i({},e,{currentPage:t})})},onChangeRowsPerPage:function(e){var t=e.target.value;A(function(e){return i({},e,{rowsPerPage:parseInt(t,10),currentPage:0})})},ActionsComponent:h})))))}w.propTypes={sortable:o.bool,handleRowLinkClick:o.func.isRequired,expandable:o.bool,loading:o.bool,columns:o.shape({}).isRequired,rows:o.arrayOf(o.shape({})).isRequired,pageOptions:o.shape({orderBy:o.string,orderAscending:o.bool,currentPage:o.number,rowsPerPage:o.number}).isRequired,setPageOptions:o.func.isRequired,totalItemCount:o.number},w.defaultProps={sortable:!1,expandable:!1,loading:!1,totalItemCount:0};export default w;
