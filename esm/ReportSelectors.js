export default function(t){var e=this;this.getReportState=function(e){return e[t]||{}},this.getReportData=function(t){var r=e.getReportState(t);return r.results?r.results.data:null},this.getReportLoading=function(t){var r=e.getReportState(t);return!!r.results&&r.results.loading},this.getReportOptions=function(t){return e.getReportState(t).options}}
