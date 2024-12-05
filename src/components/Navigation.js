import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import utilities from '../utilities';
import Panel from './Panel';
import SearchPanel from './SearchPanel';

function Navigation({
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

    const styles = {
        root: {
            position: 'absolute',
            width: '100%',
            margin: 0,
            top: 0,
            zIndex: 10
        },
        tabLabel: {
            fontSize: '1rem',
            color: '#B0B0B0' // Adjust based on theme
        },
        snackbarNew: {
            background: '#1a73e8', // Primary Dark color
            width: '800px'
        },
        snackbarSeen: {
            width: '800px'
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20
        },
        tab: {
            minWidth: '100px'
        },
        toolbar: {
            paddingLeft: 0,
            paddingRight: 0
        },
        tabs: {
            paddingLeft: 0,
            flexGrow: 1
        },
        container: {
            width: '100%',
            margin: 0
        },
        appBar: {
            backgroundColor: '#424242',
            width: '100% !important',
            margin: 0,
            position: 'fixed',
            zIndex: 1300
        },
        icons: {
            cursor: 'pointer',
            color: 'white'
        }
    };
    const handleClose = () => {
        setAnchorEl();
    };

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                setSelected(false);
            }
        };
        // Add event listener on mount
        document.addEventListener('keydown', handleKeyDown);

        // Remove event listener on cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (sections) {
        const menuIds = sections.map(item => item.id);

        const handleClick = event => {
            setAnchorEl(event.currentTarget);
        };

        const handleSignOut = () => {
            window.location.assign(`${authRoot}account/logout`);
        };

        const actions = (key, e) => (
            <>
                <Button
                    variant="contained"
                    onClick={() => {
                        window.location = utilities.getSelfHref(e);
                    }}
                >
                    View
                </Button>
                <Button
                    onClick={() => {
                        closeSnackbar(key);
                        localStorage.setItem(e.title, e.content);
                        markNotificationSeen(e);
                    }}
                >
                    Dismiss
                </Button>
            </>
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
                                sx: {
                                    root: localStorage.getItem(e.title)
                                        ? styles.snackbarSeen
                                        : styles.snackbarNew
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
                <div className="hide-when-printing">
                    <Grid container spacing={3}>
                        {sections && !loading && (
                            <AppBar position="static" sx={styles.appBar}>
                                <Toolbar>
                                    <Grid container spacing={3} sx={styles.container}>
                                        <Grid size={9}>
                                            <Tabs
                                                sx={styles.tabs}
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
                                                        sx={styles.tab}
                                                        label={
                                                            <span style={styles.tabLabel}>
                                                                {item.title}
                                                            </span>
                                                        }
                                                        selected={false}
                                                    />
                                                ))}
                                            </Tabs>
                                        </Grid>
                                        <Grid size={1}>
                                            <Typography variant="h4">
                                                <AccountCircle
                                                    sx={styles.icons}
                                                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                                                    onClick={handleClick}
                                                    id={sections.length}
                                                    key={sections.length}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid size={1}>
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
                                                    <Notifications
                                                        sx={styles.icons}
                                                        onClick={queueNotifications}
                                                    />
                                                </Badge>
                                            </Typography>
                                        </Grid>
                                        <Grid size={1}>
                                            <Typography variant="h4">
                                                <Search
                                                    sx={styles.icons}
                                                    onClick={() => setSelected(sections.length)}
                                                />
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
                    </Grid>
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
                    {selected === sections.length && (
                        <SearchPanel menu={sections} close={() => setSelected(false)} />
                    )}
                </div>
            </ClickAwayListener>
        );
    }
    return (
        <div style={styles.root}>
            <AppBar position="static" color="default">
                <Toolbar sx={styles.toolbar} />
            </AppBar>
        </div>
    );
}

Navigation.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    username: PropTypes.string,
    myStuff: PropTypes.shape({ groups: PropTypes.arrayOf(PropTypes.shape({})) }),
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

export default Navigation;
