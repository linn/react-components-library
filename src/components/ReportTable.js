import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatTitle, displayError, setDrilldown, setValueDrilldown, setTextValueDrilldown } from '../utilities/DisplayUtilities';
import { reportResultType } from '../propTypes/index'
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const styles = theme => ({
  root: {
    width: "100%",  
    minWidth: "fit-content",
  },
  table: {
  },
});

const theme = createMuiTheme({
    overrides: {
      MuiTable :{
        root: {
            maxWidth: "inherit"
        }
      },
      MuiTableCell: {
        body: {
          fontSize:"12px",
        },
        head: {
          fontSize:"14px"
        }
      }
    }
});

const Placeholder = ({ rows, columns }) => (
    <Table >
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
        classes,
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
        <Paper className={classes.root}>
            {formatTitle(title, showTitle, !reportData, reportData && reportData.error, reportData ? reportData.reportHelpText : null)}
            {!reportData
                ? <Placeholder rows={placeholderRows} columns={placeholderColumns} /> :
                reportData.error ? displayError(reportData.message)
                    : <div style={{backgroundColor: "white"}}>
                        <Table className={styles.table}>
                                <TableHead key="headers">
                                <TableRow>
                                    {showRowTitles ? (
                                        <TableCell />) : null}
                                    {reportData.headers.columnHeaders.map((header, i) => (
                                        <TableCell key={i}>
                                                {header}
                                        </TableCell>))}
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {reportData.results.map((item, j) => (
                                    <TableRow key={j} >
                                        {showRowTitles ? (<TableCell className="single-line-field" data-tip={item.rowTitle.displayString}>{setDrilldown(item.rowTitle)}</TableCell>) : null}
                                        {item.values
                                            .map((value, i) => (
                                            <TableCell 
                                                key={i}>{setValueDrilldown(value)}{setTextValueDrilldown(value)}
                                            </TableCell>))}
                                    </TableRow>
                                ))}

                                {showTotals
                                    ? (<TableRow key="totals">
                                        {showRowTitles ? (<TableCell>{reportData.totals.rowTitle.displayString}</TableCell>) : null}
                                        {reportData.totals.values
                                            .map((value, i) => (
                                            <TableCell 
                                                key={i}>{setValueDrilldown(value)}
                                            </TableCell>))}
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
