import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

const useStyles = makeStyles(() => ({
    subTotal: {
        fontWeight: 'bolder'
    },
    root: {
        width: '100%',
        overflow: 'auto',
        textAlign: 'center'
    },
    numberField: {
        textAlign: 'right'
    }
}));

const setCellClasses = (
    classes,
    displayValue,
    textDisplayValue,
    rowType,
    varianceColumn,
    textColumn,
    totalColumn,
    defaultClasses
) => {
    let generatedClasses = '';
    if (rowType === 'Subtotal') {
        generatedClasses += `${classes.subTotal} `;
    }

    if (!textColumn && !textDisplayValue) {
        generatedClasses += `${classes.numberField} `;
    }

    if (defaultClasses) {
        generatedClasses += `${defaultClasses} `;
    }

    return generatedClasses;
};

const setHeaderCellClasses = (classes, varianceColumn, textColumn, totalColumn, defaultClasses) => {
    let generatedClasses = '';
    if (!textColumn) {
        generatedClasses += `${classes.numberField} `;
    }

    if (defaultClasses) {
        generatedClasses += `${defaultClasses} `;
    }

    return generatedClasses;
};

const Results = ({
    reportData,
    classes,
    title,
    showTitle,
    showTotals,
    hasExternalLinks,
    showRowTitles
}) => (
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
            <Table size="small">
                <TableHead key="headers">
                    <TableRow>
                        {showRowTitles ? (
                            <TableCell> {reportData.headers.rowHeader} </TableCell>
                        ) : null}
                        {reportData.headers.columnHeaders.map((header, i) => (
                            <TableCell
                                className={setHeaderCellClasses(
                                    classes,
                                    reportData.headers.varianceColumns.includes(i),
                                    reportData.headers.textColumns.includes(i),
                                    reportData.headers.totalColumns.includes(i)
                                )}
                                key={i}
                            >
                                {header}
                            </TableCell>
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
                                    {setDrilldown(item.rowTitle, hasExternalLinks)}
                                </TableCell>
                            ) : null}
                            {item.values.map((value, i) => (
                                <TableCell
                                    className={setCellClasses(
                                        classes,
                                        value ? value.displayValue : null,
                                        value ? value.textDisplayValue : null,
                                        item.rowType,
                                        reportData.headers.varianceColumns.includes(i),
                                        reportData.headers.textColumns.includes(i),
                                        reportData.headers.totalColumns.includes(i)
                                    )}
                                    key={i}
                                >
                                    {setValueDrilldown(value, hasExternalLinks)}
                                    {setTextValueDrilldown(value, hasExternalLinks)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}

                    {showTotals ? (
                        <TableRow key="totals">
                            {showRowTitles ? (
                                <TableCell>{reportData.totals.rowTitle.displayString}</TableCell>
                            ) : null}
                            {reportData.totals.values.map((value, i) => (
                                <TableCell
                                    className={setCellClasses(
                                        classes,
                                        value ? value.displayValue : null,
                                        value ? value.textDisplayValue : null,
                                        'Total',
                                        reportData.headers.varianceColumns.includes(i),
                                        reportData.headers.textColumns.includes(i),
                                        reportData.headers.totalColumns.includes(i)
                                    )}
                                    key={i}
                                >
                                    {setValueDrilldown(value, hasExternalLinks)}
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
);

function ReportTable({
    placeholderRows,
    placeholderColumns,
    reportData,
    hasExternalLinks,
    title,
    showTitle,
    showTotals,
    showRowTitles
}) {
    const classes = useStyles();
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
    return Results({
        reportData,
        hasExternalLinks,
        classes,
        title,
        showRowTitles,
        showTitle,
        showTotals
    });
}

Results.propTypes = {
    hasExternalLinks: PropTypes.bool,
    reportData: reportResultType,
    classes: PropTypes.shape({}).isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    showTitle: PropTypes.bool,
    showTotals: PropTypes.bool,
    showRowTitles: PropTypes.bool
};

Results.defaultProps = {
    reportData: null,
    title: null,
    showTitle: true,
    showTotals: true,
    showRowTitles: true,
    hasExternalLinks: false
};

ReportTable.propTypes = {
    hasExternalLinks: PropTypes.bool,
    placeholderRows: PropTypes.number.isRequired,
    placeholderColumns: PropTypes.number.isRequired,
    reportData: PropTypes.shape({})
};

ReportTable.defaultProps = {
    reportData: null,
    placeholderRows: 5,
    placeholderColumns: 6,
    hasExternalLinks: false
};

export default ReportTable;
