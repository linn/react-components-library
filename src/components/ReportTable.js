import React from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import {
    formatTitle,
    setDrilldown,
    setValueDrilldown,
    setTextValueDrilldown
} from '../utilities/DisplayUtilities';
import { reportResultType } from '../propTypes/index';
import Title from './Title';
import ErrorCard from './ErrorCard';

const styles = () => ({
    root: {
        width: '100%',
        overflow: 'auto',
        textAlign: 'center'
    }
});

const theme = createMuiTheme({
    overrides: {
        MuiTable: {
            root: {
                maxWidth: 'inherit'
            }
        },
        MuiTableCell: {
            body: {
                fontSize: '12px'
            },
            head: {
                fontSize: '14px'
            }
        }
    }
});

const Results = ({
    reportData,
    appRoutes,
    classes,
    title,
    showTitle,
    showTotals,

    showRowTitles
}) => (
    <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
            <Title
                text={formatTitle(
                    title,
                    showTitle,
                    !reportData,
                    reportData && reportData.error,
                    reportData ? reportData.reportHelpText : ''
                )}
            />
            <div style={{ backgroundColor: 'white' }}>
                <Table className={styles.table}>
                    <TableHead key="headers">
                        <TableRow>
                            {showRowTitles ? <TableCell /> : null}
                            {reportData.headers.columnHeaders.map((header, i) => (
                                <TableCell key={i}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.results.map((item, j) => (
                            <TableRow key={j}>
                                {showRowTitles ? (
                                    <TableCell
                                        className="single-line-field"
                                        data-tip={item.rowTitle.displayString}
                                    >
                                        {setDrilldown(item.rowTitle, appRoutes)}
                                    </TableCell>
                                ) : null}
                                {item.values.map((value, i) => (
                                    <TableCell key={i}>
                                        {setValueDrilldown(value, appRoutes)}
                                        {setTextValueDrilldown(value, appRoutes)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                        {showTotals ? (
                            <TableRow key="totals">
                                {showRowTitles ? (
                                    <TableCell>
                                        {reportData.totals.rowTitle.displayString}
                                    </TableCell>
                                ) : null}
                                {reportData.totals.values.map((value, i) => (
                                    <TableCell key={i}>
                                        {setValueDrilldown(value, appRoutes)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ) : (
                            false
                        )}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    </MuiThemeProvider>
);

function ReportTable({
    placeholderRows,
    placeholderColumns,
    reportData,
    appRoutes,
    classes,
    title,
    showTitle,
    showTotals,
    showRowTitles
}) {
    if (!reportData) {
        return (
            <Paper className={classes.root}>
                <Table>
                    <TableBody>
                        {[...Array(placeholderRows).keys()].map(row => (
                            <TableRow key={row}>
                                {[...Array(placeholderColumns).keys()].map(column => (
                                    <TableCell key={column} />
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
    if (reportData.message) {
        return <ErrorCard errorMessage={reportData.message} />;
    }
    return Results({ reportData, appRoutes, classes, title, showRowTitles, showTitle, showTotals });
}

Results.propTypes = {
    reportData: reportResultType,
    classes: PropTypes.shape({}).isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    showTitle: PropTypes.bool,
    showTotals: PropTypes.bool,
    showRowTitles: PropTypes.bool,
    appRoutes: PropTypes.arrayOf(PropTypes.string)
};

Results.defaultProps = {
    reportData: null,
    title: null,
    showTitle: true,
    showTotals: true,
    showRowTitles: true,
    appRoutes: null
};

ReportTable.propTypes = {
    placeholderRows: PropTypes.number.isRequired,
    placeholderColumns: PropTypes.number.isRequired,
    reportData: PropTypes.shape({})
};

ReportTable.defaultProps = {
    reportData: null,
    placeholderRows: 5,
    placeholderColumns: 6
};

export default withStyles(styles)(ReportTable);
