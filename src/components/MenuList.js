import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%",
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  titles: {
    paddingLeft: theme.spacing.unit * 4,
    fontWeight: "bold !important",
  }
});

class MenuList extends React.Component {
  
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, title, entries } = this.props;
    return (
      <List
        component="nav"
        className={classes.root}
      >
        
        <ListItem button onClick={this.handleClick} >
          <ListItemText> {title}</ListItemText>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {entries.map((entry, index) => (
              entry.showInMenu ? (<span key={index}>
                
                <ListItem key={entry.title} button className={classes.nested} onClick={() => { window.location.href = (window.APPLICATION_SETTINGS.proxyRoot + entry.href) }} >
                  <ListItemText primary={entry.title}  />
                </ListItem>  </span>) : <span />
            ))}
          </List>
        </Collapse>
      </List>
    );
  }
}

MenuList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuList);