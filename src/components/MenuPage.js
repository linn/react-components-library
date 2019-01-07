import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuList from './MenuList';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: "auto",
        width: "220",

        backgroundColor: "rgba(0,0,0,0)"
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

const MenuPage = ({ classes, lists }) => (
    lists.length >= 1 ?
    (
        <div> 
            {lists.map((list, i) => (
                <div key={i} className={classes.paper}> {list.map((item, index) => (
                    <div key={index + item.title}>
                        <MenuList key={item.title} title={item.title} entries={item.items} />
                        <Divider />
                    </div>))}
                </div>
            ))}
        </div>
    )
    : 
    <span />
);

MenuPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuPage);
