import React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function ReportDataGrid({
    report,
    renderZeroes = false,
    titleVariant = 'h6',
    showHeader = true,
    showExport = false,
    showTotals = false,
    openLinksInNewTabs = true,
    fixedRowHeight = false
}) {
    // Rendering cell with drill-down functionality
    const renderCell = params => {
        const hasDrillDown = params.row[`${params.field}DrillDown`]?.url;
        if (hasDrillDown) {
            if (params.row[`${params.field}DrillDown`].external) {
                return (
                    <a
                        target={openLinksInNewTabs ? '_blank' : ''}
                        rel={openLinksInNewTabs ? 'noopener noreferrer' : ''}
                        href={params.row[`${params.field}DrillDown`].url}
                    >
                        {params.formattedValue}
                    </a>
                );
            }
            return (
                <Link
                    target={openLinksInNewTabs ? '_blank' : ''}
                    rel={openLinksInNewTabs ? 'noopener noreferrer' : ''}
                    to={params.row[`${params.field}DrillDown`].url}
                >
                    {params.formattedValue}
                </Link>
            );
        }

        if (fixedRowHeight) {
            return (
                <Tooltip title={params.formattedValue}>
                    <span>{params.formattedValue}</span>
                </Tooltip>
            );
        }

        return <span>{params.formattedValue}</span>;
    };

    // Define columns dynamically from the report data
    const columns = report.headers.dataGridColumnSpecifications.map((c, i) => ({
        field: c.columnId,
        headerName: report.headers.columnHeaders[i],
        align: report.headers.dataGridColumnSpecifications[i].align,
        headerAlign: report.headers.dataGridColumnSpecifications[i].align,
        width: report.headers.dataGridColumnSpecifications[i].columnWidth,
        valueFormatter: value => {
            if (
                report.headers.dataGridColumnSpecifications[i].columnType === 'number' &&
                (value || value === 0 || value === '0')
            ) {
                const { decimalPlaces } = report.headers.dataGridColumnSpecifications[i];
                const numberFormat = Intl.NumberFormat('en-GB', {
                    minimumFractionDigits: decimalPlaces ?? 2,
                    maximumFractionDigits: decimalPlaces ?? 99
                });

                return numberFormat.format(value);
            }

            return value;
        },
        renderCell
    }));

    // Map rows from the report data
    let rows = report.results.map(r => {
        const values = columns.reduce((acc, col, i) => {
            let val = r.values[i]?.textDisplayValue ?? r.values[i]?.displayValue;
            if ((val === 0 || val === '0') && !renderZeroes) {
                val = '';
            }

            acc[col.field] = val;

            const drillDowns = r.values[i]?.drillDowns;
            const hasDrilldown = drillDowns?.length;
            if (hasDrilldown) {
                acc[`${col.field}DrillDown`] = {
                    url: drillDowns[0].href,
                    external: drillDowns[0].externalLink
                };
            }
            return acc;
        }, {});
        return { id: r.rowTitle.displayString, rowType: r.rowType, ...values };
    });

    // Configure slots based on props
    let slots = {};
    if (!showHeader) {
        slots = {
            columnHeaders: () => null
        };
    }

    // Add totals row if required
    if (showTotals) {
        const { totals, headers } = report;
        const totalsValues = headers.dataGridColumnSpecifications.reduce((acc, spec, i) => {
            let totalVal = totals.values[i]?.displayValue;

            if ((totalVal === 0 || totalVal === '0') && !renderZeroes) {
                totalVal = '';
            }

            acc[spec.columnId] = totalVal;

            return acc;
        });
        rows = [...rows, { id: 'ReportDataGridTotalsRow', ...totalsValues }];
    }

    // Define row class based on row id
    const getRowClass = params => {
        if (params.id === 'ReportDataGridTotalsRow') {
            return 'totalLine'; // This will be handled by sx
        }

        if (params.row.rowType === 'Subtotal' || params.row.rowType === 'Total') {
            return 'totalLine';
        }

        return null;
    };

    // Define title element
    const titleHasDrilldowns = report.title?.drillDowns?.length;
    const title = () => (
        <Typography variant={titleVariant}>{report.title.displayString}</Typography>
    );

    // Fixed height style condition
    const fullPages = rows?.length >= 100;
    const fixedHeightStyle = { height: '100vh' };

    return (
        <Grid container spacing={3}>
            <Grid size={12} sx={{ marginBottom: '-10px' }}>
                {titleHasDrilldowns ? (
                    <a
                        target={openLinksInNewTabs ? '_blank' : ''}
                        rel={openLinksInNewTabs ? 'noopener noreferrer' : ''}
                        href={report.title.drillDowns[0].href}
                    >
                        {title()}
                    </a>
                ) : (
                    title()
                )}
            </Grid>
            <Grid size={12} sx={fullPages ? fixedHeightStyle : {}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slots={slots}
                    showToolbar={showExport}
                    autoHeight={!fullPages}
                    density="compact"
                    getRowHeight={() => (fixedRowHeight ? 30 : 'auto')}
                    disableRowSelectionOnClick
                    getRowClassName={getRowClass}
                    hideFooter={report.results.length <= 100}
                    sx={{
                        [`& .${gridClasses.cell}`]: {
                            py: 1,
                            whiteSpace: fixedRowHeight ? '' : 'normal !important',
                            wordWrap: fixedRowHeight ? '' : 'break-word !important',
                            wordBreak: fixedRowHeight ? '' : 'break-word !important',
                            lineHeight: fixedRowHeight ? 1 : '1.5 !important'
                        },
                        [`& .${gridClasses.row}`]: {
                            maxHeight: 'none !important'
                        },
                        '.totalLine': {
                            fontWeight: 'bolder'
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default ReportDataGrid;
