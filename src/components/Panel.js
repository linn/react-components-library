import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';

const styles = {
    listItemText: {
        '&:first-child': {
            paddingLeft: 30,
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    paper: {
        backgroundColor: '#f5f5f5',
        position: 'relative',
        zIndex: -1
    },
    menuItems: {
        fontSize: '12px',
        lineHeight: 2
    },
    closeButton: {
        marginRight: '10px',
        marginTop: '10px',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1
    }
};

function Panel({ section, classes, close }) {
    const { columns } = section;

    return (
        <Paper classes={{ root: classes.paper }}>
            <Button onClick={close} color="secondary" style={styles.closeButton}>
                <Close />
            </Button>
            <Grid container justifyContent="flex-start">
                {columns.map((col, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={i}>
                        {col.categories
                            .filter(e => e.items.filter(item => item.showInMenu).length > 0)
                            .map(category => (
                                <List key={category.title}>
                                    <ListItem>
                                        <Typography variant="button" gutterBottom>
                                            {category.title.replace('&amp;', '&')}
                                        </Typography>
                                    </ListItem>
                                    {category.items.map(entry => (
                                        <div key={entry.href}>
                                            {entry.showInMenu && (
                                                <a
                                                    href={entry.href}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <ListItem
                                                        classes={{ root: classes.listItemText }}
                                                        button
                                                    >
                                                        <Typography
                                                            variant="overline"
                                                            classes={{
                                                                overline: classes.menuItems
                                                            }}
                                                            color="primary"
                                                        >
                                                            {entry.title}
                                                        </Typography>
                                                    </ListItem>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </List>
                            ))}
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <a href={`/${section.id}`}>
                        <Button
                            onClick={close}
                            color="primary"
                            style={{ marginRight: '10px', marginBottom: '10px', float: 'right' }}
                        >
                            SHOW ALL OPTIONS...
                        </Button>{' '}
                    </a>
                </Grid>
            </Grid>
        </Paper>
    );
}

Panel.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    section: PropTypes.shape({}).isRequired,
    close: PropTypes.func.isRequired
};

export default withStyles(styles)(Panel);
