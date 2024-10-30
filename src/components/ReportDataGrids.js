import React from 'react';
import PropTypes from 'prop-types';
import ReportDataGrid from './ReportDataGrid';

function ReportDataGrids({
    reportData,
    renderZeroes,
    titlesVariant,
    repeatHeaders,
    perReportExport,
    openLinksInNewTabs,
    showTotals,
    fixedRowHeight
}) {
    return (
        <>
            {reportData.map((d, i) => (
                <ReportDataGrid
                    key={d.title.displayString}
                    report={d}
                    showExport={perReportExport}
                    showTotals={showTotals}
                    fixedRowHeight={fixedRowHeight}
                    renderZeroes={renderZeroes}
                    titleVariant={titlesVariant}
                    showHeader={repeatHeaders || i === 0}
                    openLinksInNewTabs={openLinksInNewTabs}
                />
            ))}
        </>
    );
}

ReportDataGrids.propTypes = {
    reportData: PropTypes.arrayOf(PropTypes.shape({})),
    renderZeroes: PropTypes.bool,
    titlesVariant: PropTypes.string,
    repeatHeaders: PropTypes.bool,
    perReportExport: PropTypes.bool,
    openLinksInNewTabs: PropTypes.bool,
    showTotals: PropTypes.bool,
    fixedRowHeight: PropTypes.bool
};

ReportDataGrids.defaultProps = {
    reportData: [],
    renderZeroes: false,
    titlesVariant: 'h6',
    repeatHeaders: true,
    perReportExport: false,
    openLinksInNewTabs: true,
    showTotals: false,
    fixedRowHeight: false
};

export default ReportDataGrids;
