import React from 'react';

import ReportDataGrid from './ReportDataGrid.js';

function ReportDataGrids({
    reportData = [],
    renderZeroes = false,
    titlesVariant = 'h6',
    repeatHeaders = true,
    perReportExport = false,
    openLinksInNewTabs = true,
    showTotals = false,
    fixedRowHeight = false,
    showRowCount = false
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
                    showRowCount={showRowCount}
                />
            ))}
        </>
    );
}

export default ReportDataGrids;
