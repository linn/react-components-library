import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Notifications from '@material-ui/icons/Notifications';
import utilities from '../utilities/index';
import Panel from './Panel';

const styles = theme => ({
    root: {
        position: 'absolute',
        width: '100%',
        top: 0,
        zIndex: 10
    },
    tabLabel: {
        fontSize: theme.typography.fontSize,
        color: theme.palette.grey[200]
    },
    snackbarNew: {
        background: theme.palette.primary.dark,
        width: '800px'
    },
    snackbarSeen: {
        width: '800px'
    },
    panel: {
        position: 'relative'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    tab: {
        ...theme.mixins.toolbar,
        minWidth: '100px'
    },
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0
    },
    tabs: {
        ...theme.mixins.toolbar,
        paddingLeft: 40
    },
    container: {
        width: '100%'
    },
    appBar: {
        backgroundColor: theme.palette.grey[800]
    }
});

function Navigation({
    classes,
    sections,
    loading,
    username,
    myStuff,
    seenNotifications,
    unseenNotifications,
    markNotificationSeen,
    authRoot
}) {
    const [selected, setSelected] = useState(false);
    const [anchorEl, setAnchorEl] = useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    if (sections) {
        const menuIds = sections.map(item => item.id);

        const handleClick = event => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl();
        };
        const handleSignOut = () => {
            window.location.assign(`${authRoot}account/logout`);
        };

        const actions = (key, e) => (
            <Fragment>
                <Button
                    variant="contained"
                    onClick={() => {
                        window.location = utilities.getSelfHref(e);
                    }}
                >
                    {'View'}
                </Button>
                <Button
                    onClick={() => {
                        closeSnackbar(key);
                        localStorage.setItem(e.title, e.content);
                        markNotificationSeen(e);
                    }}
                >
                    {'Dismiss'}
                </Button>
            </Fragment>
        );

        const noNotifications = () => {
            if (!seenNotifications && !unseenNotifications) {
                return true;
            }
            return seenNotifications.length + unseenNotifications.length === 0;
        };

        const queueNotifications = () => {
            if (noNotifications()) {
                enqueueSnackbar('No notifications to show!', {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    },
                    variant: 'info',
                    preventDuplicate: true
                });
            } else {
                unseenNotifications.concat(seenNotifications).forEach((e, i) => {
                    setTimeout(() => {
                        enqueueSnackbar(`${e.title} ${e.content}`, {
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right'
                            },
                            ContentProps: {
                                classes: {
                                    root: localStorage.getItem(e.title)
                                        ? classes.snackbarSeen
                                        : classes.snackbarNew
                                }
                            },
                            action: key => actions(key, e),
                            preventDuplicate: true
                        });
                    }, i * 200);
                });
            }
        };

        return (
            <Fragment>
                <ClickAwayListener onClickAway={() => setSelected(false)}>
                    <div className={classes.root}>
                        {sections && !loading && (
                            <AppBar position="static" classes={{ root: classes.appBar }}>
                                <Toolbar classes={{ gutters: classes.toolbar }}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justify="space-between"
                                        spacing={3}
                                        classes={{ container: classes.container }}
                                    >
                                        <Grid item xs={10}>
                                            <Tabs
                                                classes={{
                                                    root: classes.tabs
                                                }}
                                                value={selected}
                                                onChange={(event, value) => {
                                                    if (selected === value) {
                                                        setSelected(false);
                                                    } else {
                                                        setSelected(value);
                                                    }
                                                }}
                                                scrollButtons="auto"
                                                variant="scrollable"
                                                indicatorColor="primary"
                                                textColor="primary"
                                            >
                                                {sections.map(item => (
                                                    <Tab
                                                        id={item.id}
                                                        key={item.id}
                                                        classes={{ root: classes.tab }}
                                                        label={
                                                            <span className={classes.tabLabel}>
                                                                {item.title}
                                                            </span>
                                                        }
                                                        selected={false}
                                                    />
                                                ))}
                                            </Tabs>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography variant="h4">
                                                <AccountCircle
                                                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                                                    onClick={handleClick}
                                                    id={sections.length}
                                                    key={sections.length}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography variant="h4">
                                                <Badge
                                                    badgeContent={
                                                        unseenNotifications
                                                            ? unseenNotifications.length
                                                            : 0
                                                    }
                                                    color="primary"
                                                    variant="dot"
                                                >
                                                    <Notifications onClick={queueNotifications} />
                                                </Badge>
                                            </Typography>
                                        </Grid>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}>{username}</MenuItem>
                                            {username &&
                                                myStuff.groups.map(item => (
                                                    <span key={item.items[0].href}>
                                                        <a href={item.items[0].href}>
                                                            <MenuItem onClick={handleClose}>
                                                                {item.items[0].title}
                                                            </MenuItem>
                                                        </a>
                                                    </span>
                                                ))}
                                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                        </Menu>
                                    </Grid>
                                </Toolbar>
                            </AppBar>
                        )}
                        {menuIds.map(
                            (item, i) =>
                                selected === i && (
                                    <Panel
                                        key={item}
                                        section={sections.find(e => e.id === item)}
                                        id={item}
                                        style={{ align: 'right' }}
                                        anchorEl={item.id}
                                        close={() => setSelected(false)}
                                    />
                                )
                        )}
                    </div>
                </ClickAwayListener>
            </Fragment>
        );
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar classes={{ gutters: classes.toolbar }} />
            </AppBar>
        </div>
    );
}

Navigation.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    sections: PropTypes.arrayOf(PropTypes.shape({})),
    history: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool,
    username: PropTypes.string,
    myStuff: PropTypes.shape({}),
    seenNotifications: PropTypes.arrayOf(PropTypes.shape({})),
    unseenNotifications: PropTypes.arrayOf(PropTypes.shape({})),
    markNotificationSeen: PropTypes.func.isRequired,
    authRoot: PropTypes.string.isRequired
};

Navigation.defaultProps = {
    sections: null,
    myStuff: null,
    seenNotifications: [],
    unseenNotifications: [],
    loading: false,
    username: ''
};

export default withStyles(styles)(Navigation);
