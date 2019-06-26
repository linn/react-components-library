export const getSeenNotifications = state => {
    const { news } = state;
    return news ? news.seen : null;
};

export const getUnseenNotifications = state => {
    const { news } = state;import React, { useState, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import { withStyles } from '@material-ui/core/styles';
    import {
        Tabs,
        Tab,
        AppBar,
        ClickAwayListener,
        Menu,
        MenuItem,
        Toolbar,
        Grid,
        Typography,
        Badge,
        Button
    } from '@material-ui/core';
    import { useSnackbar } from 'notistack';
    import AccountCircle from '@material-ui/icons/AccountCircle';
    import Notifications from '@material-ui/icons/Notifications';
    import Panel from './Panel';
    import config from '../config';
    
    const styles = theme => ({
        root: {
            position: 'absolute',
            width: '100%',
            top: 0,
            zIndex: 10
        },
        tabLabel: {
            fontSize: '12px'
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
        fullHeight: {
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
        markNotificationSeen
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
                window.location.assign(`${config.authorityUri}account/logout`);
            };
    
            const actions = (key, e) => (
                <Fragment>
                    <Button
                        variant="contained"
                        onClick={() => {
                            window.location = e.links.filter(l => l.rel === 'self')[0].href;
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
                let total = 0;
                if (seenNotifications) {
                    total += seenNotifications.length;
                }
                if (unseenNotifications) {
                    total += unseenNotifications.length;
                }
                return total === 0;
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
                <ClickAwayListener onClickAway={() => setSelected(false)}>
                    <div className={classes.root}>
                        {sections && !loading && (
                            <AppBar position="static" color="default">
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
                                                        classes={{ root: classes.fullHeight }}
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
                                                    <span>
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
                                        section={sections.filter(e => e.id === item)[0]}
                                        id={item}
                                        style={{ align: 'right' }}
                                        anchorEl={item.id}
                                        close={() => setSelected(false)}
                                    />
                                )
                        )}
                    </div>
                </ClickAwayListener>
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
        markNotificationSeen: PropTypes.func.isRequired
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
    
    return news ? news.unseen : null;
};

export const getNewsLoading = state => {
    const { news } = state;
    return news.loading;
};
