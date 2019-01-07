import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuPage from "./MenuPage";
import { Link } from 'react-router-dom';
import { createMuiTheme, } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';


const drawerWidth = 180;
let menu;
const blue =  {main: "#bde0f7"};

const muiTheme = createMuiTheme({
    palette:{
      primary: blue,
      secondary: blue,
      accent: blue,
      error: blue,
      contrastText: blue }
});

const styles = theme => ({
    root:
    {
        display: "flex"
    },

    appBar:
    {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },

    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    menuButton: {
        marginLeft: 0,
        marginRight: 0
    },

    hide: {
        display: "none"
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },

    drawerPaper: {
        width: drawerWidth
    },

    drawerHeader: {
        display: "flex",
        alignItems: "left",
        textAlign: "left",
        padding: "0 0px",
        ...theme.mixins.toolbar
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },

    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
});

class Navigation extends React.Component {
    state = {
        open: true,
        selected: "",
        lists: []
    };

    constructor(props) {
        super(props);
        menu = require('../../public/menu.json').sections
        this.HandleMenuItemClick = this.HandleMenuItemClick.bind(this);
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    getTopLevelMenu = () => {
        var topLevel = menu.map(x => ({ id: x.id, title: x.title, link: x.links[0].href }));
        return topLevel;
    }

    slugify = (title) => {
        var id = title.toLowerCase();
        id = id.replace("&", "-and-");
        return id;
    }

    HandleMenuItemClick = (text) => {
        this.setState({
            selected: text
        });
        var id = this.slugify(text);
        var section = menu.filter(x => x.id === id);
        var columns = section[0].columns;
        var categoriesListArray = [];
        columns.forEach(function (column) {
            categoriesListArray.push(column.categories);
        });
        var lists = [];
        categoriesListArray.forEach(function (categoriesList) {
            lists.push(categoriesList);
        });
        this.setState({
            lists: lists
        });
    };

    render() {
        const { classes, theme, Breadcrumbs } = this.props;
        const { open, selected } = this.state;

        return (
            <MuiThemeProvider theme={muiTheme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            {Breadcrumbs ? 
                            <Breadcrumbs {...this.props} /> : <span />}  
                        </Toolbar>

                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper
                        }}>
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === "ltr" ? (
                                    <ChevronLeftIcon />
                                ) : (<ChevronRightIcon />)}
                                Main Menu
                    </IconButton>
                        </div>
                        <Divider />
                        <List>
                            {this.getTopLevelMenu().map((item) => (
                                <Link style={{ textDecoration: 'none' }} key={item.id} to={item.link}>
                                    <ListItem key={item.id} button onClick={() => this.HandleMenuItemClick(item.title)} selected={this.state.selected === item.title}>
                                        <ListItemText> {item.title}</ListItemText>
                                    </ListItem> </Link>
                            ))}
                        </List>
                    </Drawer>
                    <main
                        className={classNames(classes.content, {
                            [classes.contentShift]: open
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        <MenuPage lists={this.state.lists} />
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navigation);