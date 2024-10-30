import React from 'react';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

function ReportDataGrid({
    report,
    renderZeroes,
    titleVariant,
    showHeader,
    showExport,
    showTotals,
    openLinksInNewTabs,
    fixedRowHeight
}) {
    const useStyles = makeStyles(() => ({
        totalLine: {
            fontWeight: 'bolder'
        }
    }));
    const classes = useStyles();

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
                        {params.value}
                    </a>
                );
            }
            return (
                <Link
                    target={openLinksInNewTabs ? '_blank' : ''}
                    rel={openLinksInNewTabs ? 'noopener noreferrer' : ''}
                    to={params.row[`${params.field}DrillDown`].url}
                >
                    {params.value}
                </Link>
            );
        }

        if (fixedRowHeight) {
            return (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            );
        }

        return <span>{params.value}</span>;
    };
    const columns = report.headers.dataGridColumnSpecifications.map((c, i) => ({
        field: c.columnId,
        headerName: report.headers.columnHeaders[i],
        align: report.headers.dataGridColumnSpecifications[i].align,
        headerAlign: report.headers.dataGridColumnSpecifications[i].align,
        width: report.headers.dataGridColumnSpecifications[i].columnWidth,
        renderCell
    }));

    let rows = report.results.map(r => {
        const values = columns.reduce((acc, col, i) => {
            let val = r.values[i]?.textDisplayValue ?? r.values[i]?.displayValue;
            const isValue = !!r.values[i]?.displayValue;

            const decimalPlaces = r.values[i]?.decimalPlaces;
            if ((val === 0 || val === '0') && !renderZeroes) {
                val = '';
            }
            if (isValue) {
                const numberFormat = Intl.NumberFormat('en-GB', {
                    minimumFractionDigits: decimalPlaces ?? 2,
                    maximumFractionDigits: decimalPlaces ?? 99
                });
                val = val ? numberFormat.format(val) : '';
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
        return { id: r.rowTitle.displayString, ...values };
    });
    let slots = {};
    if (!showHeader) {
        slots = {
            columnHeaders: () => null
        };
    }
    if (showExport) {
        slots = { ...slots, toolbar: GridToolbar };
    }

    if (showTotals) {
        const { totals, headers } = report;
        const totalsValues = headers.dataGridColumnSpecifications.reduce((acc, spec, i) => {
            let totalVal = totals.values[i]?.displayValue;
            const isValue = !!totalVal;

            const decimalPlaces = totals.values[i]?.decimalPlaces;
            if ((totalVal === 0 || totalVal === '0') && !renderZeroes) {
                totalVal = '';
            }
            if (isValue) {
                const numberFormat = Intl.NumberFormat('en-GB', {
                    minimumFractionDigits: decimalPlaces ?? 2,
                    maximumFractionDigits: decimalPlaces ?? 99
                });
                totalVal = totalVal ? numberFormat.format(totalVal) : '';
            }
            acc[spec.columnId] = totalVal;

            return acc;
        });
        rows = [...rows, { id: 'ReportDataGridTotalsRow', ...totalsValues }];
    }

    const getRowClass = params => {
        if (params.id === 'ReportDataGridTotalsRow') {
            return classes.totalLine;
        }

        return null;
    };

    const fullPages = rows?.length >= 100;
    const fixedHeightStyle = { height: '100vh' };
    const titleHasDrilldowns = report.title?.drillDowns?.length;

    const title = () => (
        <Typography variant={titleVariant}>{report.title.displayString}</Typography>
    );
    return (
        <>
            <Grid item xs={12} style={{ marginBottom: '-10px' }}>
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
            <Grid item xs={12} style={fullPages ? fixedHeightStyle : {}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slots={slots}
                    autoHeight={!fullPages}
                    density="compact"
                    getRowHeight={() => (fixedRowHeight ? 34 : 'auto')}
                    disableRowSelectionOnClick
                    getRowClassName={getRowClass}
                    hideFooter={report.results.length <= 100}
                    sx={{
                        [`& .${gridClasses.cell}`]: {
                            py: 1,
                            whiteSpace: fixedRowHeight ? '' : 'normal !important',
                            wordWrap: fixedRowHeight ? '' : 'break-word !important',
                            wordBreak: fixedRowHeight ? '' : 'break-word !important',
                            lineHeight: fixedRowHeight ? '' : '1.5 !important'
                        },
                        [`& .${gridClasses.row}`]: {
                            maxHeight: 'none !important'
                        }
                    }}
                />
            </Grid>
        </>
    );
}

ReportDataGrid.propTypes = {
    showExport: PropTypes.bool,
    renderZeroes: PropTypes.bool,
    titleVariant: PropTypes.string,
    showHeader: PropTypes.bool,
    report: PropTypes.shape({
        title: PropTypes.shape({
            displayString: PropTypes.string,
            drillDowns: PropTypes.arrayOf(PropTypes.shape({ href: PropTypes.string }))
        }),
        totals: PropTypes.shape({
            values: PropTypes.arrayOf(
                PropTypes.shape({ displayValue: PropTypes.number, decimalPlaces: PropTypes.number })
            )
        }),
        results: PropTypes.arrayOf(PropTypes.shape({})),
        headers: PropTypes.shape({
            columnHeaders: PropTypes.arrayOf(PropTypes.string),
            dataGridColumnSpecifications: PropTypes.arrayOf(
                PropTypes.shape({ align: PropTypes.string, columnWidth: PropTypes.number })
            ).isRequired
        })
    }).isRequired,
    showTotals: PropTypes.bool,
    openLinksInNewTabs: PropTypes.bool,
    fixedRowHeight: PropTypes.bool
};

ReportDataGrid.defaultProps = {
    showExport: false,
    renderZeroes: false,
    titleVariant: 'h6',
    showHeader: true,
    showTotals: false,
    openLinksInNewTabs: true,
    fixedRowHeight: false
};

export default ReportDataGrid;
