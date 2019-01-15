import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom'
import { ChevronRight } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const styles = {
    root: {
        width: '100%',
        paddingTop: '20px',
        paddingLeft: '10%',
        paddingLeft: '10%'
    }
}


class Breadcrumbs extends Component {

    render() {
        const { location, classes, history, rootPathLength = 2 } = this.props;

        let path = location.pathname;
        if (path.indexOf('/report') > -1) {
            path = path.substring(0, path.indexOf('/report'));
        }

        const crumbs = path
            .split('/')
            .reduce((sofar, crumb, i, crumbs) => {
                const path = crumbs.slice(0, i + 1);
                const href = path.join('/') || '/';
                const handleClick = e => {
                    // we should just let the browser handle any paths
                    // shorter than our root path, e.g.the 'Home' path
                    if (path.length > rootPathLength) {
                        e.preventDefault();
                        history.push(href);
                    }
                };

                return [
                    ...sofar,
                    { key: i, caption: crumb || 'Home', href: href, onClick: e => handleClick(e) }
                ];
            }, []);

        return (
            <div className={classes.root}>
                {crumbs.map((crumb, index) => (
                    <span>
                        <NavLink to={crumb.href} key={index}>
                            <Button variant="contained" >
                                <Typography variant="subtitle2">
                                    <strong>{crumb.caption}</strong>
                                </Typography>
                            </Button>
                        </NavLink>
                        {index < crumbs.length - 1 ? <ChevronRight /> : false // dont show chevron pointing away from last crumb                 
                        }
                    </span>

                ))}
            </div>
        );
    }
}

export default withStyles(styles)(Breadcrumbs);;
