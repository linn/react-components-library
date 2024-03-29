import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
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
        textAlign: 'center',
        pageBreakInside: 'avoid'
    },
    rootAllowsPageBreaks: {
        width: '100%',
        overflow: 'auto',
        textAlign: 'center'
    },
    numberField: {
        textAlign: 'right'
    },
    noWrap: {
        whiteSpace: 'nowrap'
    },
    smallCol: {
        width: '100px',
        overflow: 'auto'
    },
    mediumCol: {
        width: '200px',
        overflow: 'auto'
    },
    largeCol: {
        width: '300px',
        overflow: 'auto'
    },
    textBold: {
        fontWeight: 'bold'
    }
}));

const setCellClasses = (
    classes,
    textDisplayValue,
    rowType,
    textColumn,
    totalColumn,
    allowWrap,
    defaultClasses,
    attributes
) => {
    let generatedClasses = '';
    if (rowType === 'Subtotal' || totalColumn) {
        generatedClasses += `${classes.subTotal} `;
    }

    if (!textColumn && !textDisplayValue) {
        generatedClasses += `${classes.numberField} `;
    }

    if (!allowWrap) {
        generatedClasses += `${classes.noWrap} `;
    }

    if (defaultClasses) {
        generatedClasses += `${defaultClasses} `;
    }

    if (attributes?.length) {
        const textAttribute = attributes.find(a => a.attributeType === 'text-weight');
        if (textAttribute?.attributeValue === 'very-bold') {
            generatedClasses += `${classes.subTotal} `;
        } else if (textAttribute?.attributeValue === 'bold') {
            generatedClasses += `${classes.textBold} `;
        }
    }

    return generatedClasses;
};

const getAttributeStyles = attributes => {
    let style = {};
    if (attributes?.length) {
        const textAttribute = attributes.find(a => a.attributeType === 'text-colour');
        if (textAttribute) {
            style = { ...style, color: textAttribute?.attributeValue };
        }

        const backgroundAttribute = attributes.find(a => a.attributeType === 'background-colour');
        if (backgroundAttribute) {
            style = { ...style, backgroundColor: backgroundAttribute?.attributeValue };
        }
    }

    return style;
};

const setHeaderCellClasses = (classes, textColumn, columnClass, defaultClasses) => {
    let generatedClasses = '';
    if (!textColumn) {
        generatedClasses += `${classes.numberField} `;
    }

    if (columnClass === 'small') {
        generatedClasses += `${classes.smallCol} `;
    }

    if (columnClass === 'medium') {
        generatedClasses += `${classes.mediumCol} `;
    }

    if (columnClass === 'large') {
        generatedClasses += `${classes.largeCol} `;
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
    showRowTitles,
    columnClasses,
    allowPageBreakInside,
    showRowCount
}) => (
    <Paper className={allowPageBreakInside ? classes.rootAllowsPageBreaks : classes.root}>
        <Title
            text={formatTitle(
                title,
                showTitle,
                !reportData,
                reportData && reportData.error,
                reportData?.reportHelpText ?? ''
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
                                    reportData.headers.textColumns.includes(i),
                                    columnClasses ? columnClasses[i] : null
                                )}
                                key={header}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportData.results.map((item, j) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableRow key={j}>
                            {showRowTitles ? (
                                <TableCell className={classes.noWrap}>
                                    {setDrilldown(item.rowTitle, hasExternalLinks)}
                                </TableCell>
                            ) : null}
                            {item.values.map((value, i) => (
                                <TableCell
                                    style={getAttributeStyles(value?.attributes)}
                                    className={setCellClasses(
                                        classes,
                                        value?.textDisplayValue,
                                        item.rowType,
                                        reportData.headers.textColumns.includes(i),
                                        reportData.headers.totalColumns.includes(i),
                                        value?.allowWrap ?? true,
                                        null,
                                        value?.attributes
                                    )}
                                    // remove this if we implement reordering of columns
                                    // eslint-disable-next-line react/no-array-index-key
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
                                    style={getAttributeStyles(value?.attributes)}
                                    className={setCellClasses(
                                        classes,
                                        value?.textDisplayValue,
                                        'Total',
                                        reportData.headers.textColumns.includes(i),
                                        reportData.headers.totalColumns.includes(i),
                                        value?.allowWrap,
                                        null,
                                        value?.attributes
                                    )}
                                    // remove this if we implement reordering of columns
                                    // eslint-disable-next-line react/no-array-index-key
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
            {showRowCount && reportData && reportData.results && (
                <Typography
                    variant="body2"
                    style={{
                        float: 'left',
                        paddingLeft: '15px',
                        paddingTop: '10px',
                        paddingBottom: '10px'
                    }}
                >
                    Number of rows: {reportData.results.length}
                </Typography>
            )}
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
    showRowTitles,
    columnClasses,
    allowPageBreakInside,
    showRowCount
}) {
    const classes = useStyles();
    if (!reportData) {
        return (
            <Paper className={allowPageBreakInside ? classes.rootAllowsPageBreaks : classes.root}>
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
        showTotals,
        columnClasses,
        allowPageBreakInside,
        showRowCount
    });
}

Results.propTypes = {
    hasExternalLinks: PropTypes.bool,
    reportData: reportResultType,
    classes: PropTypes.shape({
        root: PropTypes.shape({}),
        noWrap: PropTypes.shape({}),
        rootAllowsPageBreaks: PropTypes.shape({})
    }).isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    showTitle: PropTypes.bool,
    showTotals: PropTypes.bool,
    showRowTitles: PropTypes.bool,
    columnClasses: PropTypes.arrayOf(PropTypes.string),
    allowPageBreakInside: PropTypes.bool.isRequired,
    showRowCount: PropTypes.bool
};

Results.defaultProps = {
    reportData: null,
    title: null,
    showTitle: true,
    showTotals: true,
    showRowTitles: true,
    hasExternalLinks: false,
    columnClasses: null,
    showRowCount: false
};

ReportTable.propTypes = {
    hasExternalLinks: PropTypes.bool,
    placeholderRows: PropTypes.number,
    placeholderColumns: PropTypes.number,
    reportData: PropTypes.shape({ message: PropTypes.string }),
    columnClasses: PropTypes.arrayOf(PropTypes.string),
    allowPageBreakInside: PropTypes.bool,
    title: PropTypes.shape({}),
    showTitle: PropTypes.bool,
    showTotals: PropTypes.bool,
    showRowTitles: PropTypes.bool,
    showRowCount: PropTypes.bool
};

ReportTable.defaultProps = {
    reportData: null,
    placeholderRows: 5,
    placeholderColumns: 6,
    hasExternalLinks: false,
    columnClasses: null,
    allowPageBreakInside: false,
    title: '',
    showTitle: true,
    showTotals: false,
    showRowTitles: false,
    showRowCount: false
};

export default ReportTable;
