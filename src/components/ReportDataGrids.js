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

export default ReportDataGrids;
