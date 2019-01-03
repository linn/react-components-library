import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import  ReportTable  from '../components/ReportTable';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { boolean, text } from '@storybook/addon-knobs';

// data grabbed from an existing form to see how it renders.. there is definitely a better way to provide sample data!
const reportData = {"title":{"displayString":"Product Ranges","drillDowns":[]},"resultType":null,"reportValueType":"Value","displaySequence":null,"headers":{"rowHeader":"Id","columnHeaders":["Name","Description"],"varianceRows":[],"varianceColumns":[],"totalColumns":[],"textColumns":[0,1]},"filterOptions":[],"results":[{"rowTitle":{"displayString":"2","drillDowns":[]},"rowSortOrder":0,"values":[{"displayValue":null,"textDisplayValue":"AKURATE","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=2&productRangeName=AKURATE&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"AKURATE PRODUCTS","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"10","drillDowns":[]},"rowSortOrder":1,"values":[{"displayValue":null,"textDisplayValue":"AML","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=10&productRangeName=AML&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"ASTON MARTIN","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"6","drillDowns":[]},"rowSortOrder":2,"values":[{"displayValue":null,"textDisplayValue":"CLASSIK","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=6&productRangeName=CLASSIK&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"CLASSIK MUSIC","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"7","drillDowns":[]},"rowSortOrder":3,"values":[{"displayValue":null,"textDisplayValue":"KIKO","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=7&productRangeName=KIKO&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"KIKO SYSTEMS","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"3","drillDowns":[]},"rowSortOrder":4,"values":[{"displayValue":null,"textDisplayValue":"KLIMAX","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=3&productRangeName=KLIMAX&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"KLIMAX PRODUCTS","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"5","drillDowns":[]},"rowSortOrder":5,"values":[{"displayValue":null,"textDisplayValue":"KNEKT","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=5&productRangeName=KNEKT&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"KNEKT & CUSTOM INSTALL PRODUCTS","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"4","drillDowns":[]},"rowSortOrder":6,"values":[{"displayValue":null,"textDisplayValue":"LP12 PRODUCTS","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=4&productRangeName=LP12 PRODUCTS&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"TURNTABLES & ACCESSORIES (EXCLUDING EKOS SE, AKIVA, KEEL)","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"1","drillDowns":[]},"rowSortOrder":7,"values":[{"displayValue":null,"textDisplayValue":"MAJIK","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=1&productRangeName=MAJIK&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"MAJIK PRODUCTS","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"41","drillDowns":[]},"rowSortOrder":8,"values":[{"displayValue":null,"textDisplayValue":"MINI","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=41&productRangeName=MINI&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"MINI INTEGRATED SYSTEMS","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"8","drillDowns":[]},"rowSortOrder":9,"values":[{"displayValue":null,"textDisplayValue":"OTHER","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=8&productRangeName=OTHER&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"OTHER","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"43","drillDowns":[]},"rowSortOrder":10,"values":[{"displayValue":null,"textDisplayValue":"SEKRIT","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=43&productRangeName=SEKRIT&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"SEKRIT","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"44","drillDowns":[]},"rowSortOrder":11,"values":[{"displayValue":null,"textDisplayValue":"SELEKT","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=44&productRangeName=SELEKT&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"SELEKT","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"42","drillDowns":[]},"rowSortOrder":12,"values":[{"displayValue":null,"textDisplayValue":"SERIES 5","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=42&productRangeName=SERIES 5&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"SERIES 5","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"},{"rowTitle":{"displayString":"9","drillDowns":[]},"rowSortOrder":13,"values":[{"displayValue":null,"textDisplayValue":"UNIDISK","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[{"name":"sales-products","href":"/products/reports/sales-products-by-product-range?productRangeId=9&productRangeName=UNIDISK&includePhasedOut=false"}]},{"displayValue":null,"textDisplayValue":"UNIDISK PRODUCTS","prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Value"}],"totals":{"rowTitle":{"displayString":"Totals","drillDowns":[]},"rowSortOrder":null,"values":[{"displayValue":null,"textDisplayValue":null,"prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]},{"displayValue":null,"textDisplayValue":null,"prefix":null,"suffix":null,"decimalPlaces":null,"drillDowns":[]}],"rowType":"Total"},"reportHelpText":null};

let config = {
  title: "A Report",
  showTitle: false,
  showTotals: false,
  placeholderRows: 10,
  placeholderColumns: 3,
  containsSubtotals: false,
  showRowTitles: false,
  reportData: reportData
}

const stories = storiesOf('ReportTable', module);
stories.addDecorator(withKnobs);
stories.addDecorator(StoryRouter());

stories.add('default', () => (
  <ReportTable
    showTitle={boolean('showTitle', false)}
    title={text('title', 'Your Report Title')}
    containsSubtotals={boolean('containsSubtotals', false)}
    showRowTitles={boolean('showRowTitles', false)}
    showTotals={boolean('showTotals', false)}
    reportData={object('reportData', reportData)}
    >
  </ReportTable>
));