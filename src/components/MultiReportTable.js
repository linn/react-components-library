import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { formatHeading, displayError, formatTitle } from '../utilities/DisplayUtilities';
import ReportTable from './ReportTable';

const setPageBreaks = (tableSequence, pageBreaks, defaults = []) =>
    classnames(defaults, { 'new-page-after': pageBreaks.includes(tableSequence) });

const Placeholder = ({ rows, columns }) => (
    <table className="table placeholder table-placeholder">
        <tbody>
            {[...Array(rows).keys()].map(row => (
                <tr key={row}>
                    {[...Array(columns).keys()].map(column => (
                        <td key={column} />
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

const Results = ({
    reportData,
    showTotals,
    placeholderRows,
    placeholderColumns,
    pageBreaksAfter,
    fixColumnWidths,
    containsSubtotals,
    showRowTitles,
    showTitle
}) => (
    <div>
        {reportData.error ? (
            displayError(reportData.message)
        ) : (
            <Fragment>
                {reportData
                    .sort((a, b) => {
                        if (a.displaySequence > b.displaySequence) {
                            return 1;
                        }

                        if (b.displaySequence > a.displaySequence) {
                            return -1;
                        }

                        return 0;
                    })
                    .map((data, i) => (
                        <Box
                            paddingBottom={3}
                            key={i}
                            className={setPageBreaks(i, pageBreaksAfter)}
                        >
                            {formatTitle(
                                data.title,
                                showTitle,
                                !reportData,
                                reportData && reportData.error
                            )}
                            <ReportTable
                                reportData={data}
                                containsSubtotals={containsSubtotals}
                                showTitle={false}
                                showTotals={showTotals}
                                fixColumnWidths={fixColumnWidths}
                                placeholderRows={placeholderRows}
                                placeholderColumns={placeholderColumns}
                                showRowTitles={showRowTitles}
                            />
                        </Box>
                    ))}
            </Fragment>
        )}
    </div>
);

const MultiReportTable = ({
    reportData,
    title,
    showTitle,
    showTotals,
    placeholderRows,
    placeholderColumns,
    pageBreaksAfter,
    fixColumnWidths,
    containsSubtotals,
    showRowTitles
}) => (
    <div>
        {formatHeading(title, showTitle, !reportData, reportData && reportData.error)}
        {!reportData ? (
            <div>
                <Placeholder rows={placeholderRows} columns={placeholderColumns} />
                <Placeholder rows={placeholderRows} columns={placeholderColumns} />
            </div>
        ) : (
            <Results
                reportData={reportData}
                showTotals={showTotals}
                placeholderRows={10}
                placeholderColumns={3}
                showRowTitles={showRowTitles}
                containsSubtotals={containsSubtotals}
                pageBreaksAfter={pageBreaksAfter}
                fixColumnWidths={fixColumnWidths}
                showTitle={showTitle}
            />
        )}
    </div>
);

MultiReportTable.propTypes = {
    reportData: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string,
    showTitle: PropTypes.bool,
    showTotals: PropTypes.bool,
    showRowTitles: PropTypes.bool,
    placeholderRows: PropTypes.number,
    placeholderColumns: PropTypes.number,
    pageBreaksAfter: PropTypes.arrayOf(PropTypes.number),
    fixColumnWidths: PropTypes.bool,
    containsSubtotals: PropTypes.bool
};

MultiReportTable.defaultProps = {
    reportData: [],
    title: '',
    showTitle: true,
    showTotals: true,
    showRowTitles: true,
    placeholderRows: 4,
    placeholderColumns: 4,
    pageBreaksAfter: [],
    fixColumnWidths: false,
    containsSubtotals: false
};

Results.propTypes = {
    reportData: PropTypes.arrayOf(PropTypes.shape({})),
    showTotals: PropTypes.bool,
    showTitle: PropTypes.bool,
    showRowTitles: PropTypes.bool,
    placeholderRows: PropTypes.number,
    placeholderColumns: PropTypes.number,
    pageBreaksAfter: PropTypes.arrayOf(PropTypes.number),
    fixColumnWidths: PropTypes.bool,
    containsSubtotals: PropTypes.bool
};

Results.defaultProps = {
    reportData: [],
    showTotals: true,
    showRowTitles: true,
    showTitle: true,
    placeholderRows: 4,
    placeholderColumns: 4,
    pageBreaksAfter: [],
    fixColumnWidths: false,
    containsSubtotals: false
};

Placeholder.propTypes = {
    rows: PropTypes.number,
    columns: PropTypes.number
};

Placeholder.defaultProps = {
    rows: 4,
    columns: 4
};

export default MultiReportTable;
