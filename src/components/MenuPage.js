import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        margin: 40,
        padding: 40
    }
});

function MenuPage({ section }) {
    console.info("i rendered");
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Grid container alignItems="flex-start" styles={{ alignItems: 'flex-start' }}>
                {section !== null ? (
                    section.map((column, i) => (
                        <Grid item xs={12} sm={12} md={6} key={i}>
                            <Column data={column} />
                        </Grid>
                    ))
                ) : (
                    <Fragment />
                )}
            </Grid>
        </Paper>
    );
}

const Column = ({ data }) =>
    data.categories.map(c => (
        <List key={c.title}>
            <Typography variant="h4" gutterBottom>
                {c.title.replace('&amp;', '&')}
            </Typography>
            {c.items.map(item => (
                <a key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <Typography variant="button" gutterBottom color="primary">
                            {item.title}
                        </Typography>
                    </ListItem>
                </a>
            ))}
        </List>
    ));

MenuPage.propTypes = {
    match: PropTypes.shape({}).isRequired,
    section: PropTypes.arrayOf(PropTypes.shape({}))
};

MenuPage.defaultProps = {
    section: []
};

Column.propTypes = {
    data: PropTypes.shape({})
};

export default MenuPage;
