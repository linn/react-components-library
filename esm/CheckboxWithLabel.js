import e from"react";import o from"prop-types";import r from"@material-ui/core/FormControlLabel";import a from"@material-ui/core/Checkbox";import l from"@material-ui/styles/withStyles";var t=function(o){var l=o.classes,t=o.checked,c=o.color,i=void 0===c?"primary":c,s=o.label,m=o.onChange;return e.createElement(r,{label:s,classes:{label:"".concat(l.root)},control:e.createElement(a,{checked:t,onChange:m,color:i})})};t.propTypes={classes:o.shape({}),checked:o.bool,color:o.string,label:o.string,onChange:o.func.isRequired},t.defaultProps={classes:{},checked:!1,color:"primary",label:""};var c=l({root:{width:"100%",fontSize:14}})(t);export default c;
