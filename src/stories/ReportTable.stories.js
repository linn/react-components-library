import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import ReportTable from '../components/ReportTable';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { boolean, text } from '@storybook/addon-knobs';

// some sample report data with 2 results
let reportData =  require('../../public/sampleReportData.json');

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
