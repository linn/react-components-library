import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const Placeholder = ({ rows, columns }) => (
    <table className="table placeholder table-placeholder">
        <tbody>
            {
                [...Array(rows).keys()].map((row) => (
                    <tr key={row}>
                        {[...Array(columns).keys()].map((column) => (
                            <td key={column}></td>
                        ))}
                    </tr>
                ))
            }
        </tbody>
    </table>);

class ReportTable extends Component {

    render() {
        const { reportData, title, placeholderRows, placeholderColumns, classes} = this.props;

        if (!reportData) {
          return (
              <Placeholder rows={placeholderRows} columns={placeholderColumns} />
          );
        }

        return (
          <Paper className={classes.root}>
          <div> we got a report </div>
          </Paper>
        )
    }
}

export default withStyles(styles)(ReportTable);
