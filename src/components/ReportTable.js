import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classnames from 'classnames';
import { formatTitle, displayError, setDrilldown, setValueDrilldown, setTextValueDrilldown } from '../utilities/DisplayUtilities';
import { reportResultType } from '../propTypes/index'
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const styles = theme => ({
  root: {
    width: '100%',
    margin: theme.spacing.unit * 3,

    overflowX: 'auto',
  },
  table: {

    margin: theme.spacing.unit * 3,
  },
});

const theme = createMuiTheme({
    overrides: {
      MuiTableCell: {
        body: {
          fontSize:"12px"
        },
        head: {
          fontSize:"14px"
        }
      }
    }
});

const getCellClassName = (isVarianceColumn, isTotalColumn, value, textValue, defaults = []) => classnames(
    defaults,
    { 'variance-positive': (isVarianceColumn && value > 0) },
    { 'variance-negative': (isVarianceColumn && value < 0) },
    { 'success total': (isTotalColumn) },
    { 'text-right': (!textValue) }
);

const getTableClassNames = (containsSubtotals, defaults = []) => classnames(
    defaults, 'table', 'table-condensed', 'table-bordered', 'small',
    { 'table-striped': !containsSubtotals }
);

const getTableRowClassNames = (rowType, containsSubtotals, defaults = []) => classnames(
    defaults,
    { 'subtotal-row active': containsSubtotals && rowType === 'Subtotal' },
    { 'success': rowType === 'Total' }
);

const getTableHeaderClassNames = (cellHeader, fixColumnWidth, isTextColumn, defaults = []) => classnames(
    defaults,
    { 'col-xs-1': fixColumnWidth && cellHeader },
    { 'col-xs-2': fixColumnWidth && !cellHeader },
    { 'text-right': !(isTextColumn) }
);

const Placeholder = ({ rows, columns }) => (
    <Table className="table placeholder table-placeholder">
        <TableBody>
            {
                [...Array(rows).keys()].map((row) => (
                    <TableRow key={row}>
                        {[...Array(columns).keys()].map((column) => (
                            <TableCell key={column}></TableCell>
                        ))}
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>);

const ReportTable = (
    {
        reportData,
        title,
        showTitle = true,
        showTotals = true,
        placeholderRows = 5,
        placeholderColumns = 6,
        containsSubtotals = false,
        fixColumnWidths = false,
        showRowTitles = true
    }) => (
        <MuiThemeProvider theme={theme}>
        <Paper className={styles.root}>
            {formatTitle(title, showTitle, !reportData, reportData && reportData.error, reportData ? reportData.reportHelpText : null)}
            {!reportData
                ? <Placeholder rows={placeholderRows} columns={placeholderColumns} /> :
                reportData.error ? displayError(reportData.message)
                    : <div style={{backgroundColor: "white"}}>
                        <Table className={getTableClassNames(containsSubtotals)}>
                                <TableHead key="headers">
                                <TableRow>
                                    {showRowTitles ? (<TableCell className={getTableHeaderClassNames(false, fixColumnWidths, '')}></TableCell>) : null}
                                    {reportData.headers.columnHeaders
                                        .map((header, i) => (<TableCell className={getTableHeaderClassNames(true, fixColumnWidths, reportData.headers.textColumns.includes(i), [])} key={i}>{header}</TableCell>))}
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {reportData.results.map((item, j) => (
                                    <TableRow className={getTableRowClassNames(item.rowType, containsSubtotals, ['report-data-row'])} key={j} >
                                        {showRowTitles ? (<TableCell className="single-line-field" data-tip={item.rowTitle.displayString}>{setDrilldown(item.rowTitle)}</TableCell>) : null}
                                        {item.values
                                            .map((value, i) => (<TableCell className={getCellClassName(reportData.headers.varianceColumns.includes(i) || reportData.headers.varianceRows.includes(j), reportData.headers.totalColumns.includes(i), value.displayValue, value.textDisplayValue, [])} key={i}>{setValueDrilldown(value)}{setTextValueDrilldown(value)}</TableCell>))}
                                    </TableRow>
                                ))}

                                {showTotals
                                    ? (<TableRow className={getTableRowClassNames(reportData.totals.rowType, containsSubtotals, ['report-totals'])} key="totals">
                                        {showRowTitles ? (<TableCell>{reportData.totals.rowTitle.displayString}</TableCell>) : null}
                                        {reportData.totals.values
                                            .map((value, i) => (<TableCell className={getCellClassName(reportData.headers.varianceColumns.includes(i), reportData.headers.totalColumns.includes(i), value.displayValue, value.textDisplayValue, ['total'])} key={i}>{setValueDrilldown(value)}</TableCell>))}
                                    </TableRow>)
                                    : false
                                }
                            </TableBody>
                        </Table>
                    </div>
            }
        </Paper>
        </MuiThemeProvider>
    );

Table.propTypes = {
    reportData: reportResultType,
    title: PropTypes.object,
    showTitle: PropTypes.bool,
    showTotals: PropTypes.bool,
    placeholderRows: PropTypes.number,
    placeholderColumns: PropTypes.number,
    containsSubtotals: PropTypes.bool,
    fixColumnWidths: PropTypes.bool,
    showRowTitles: PropTypes.bool
}


export default withStyles(styles)(ReportTable);
