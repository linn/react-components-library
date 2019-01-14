import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { ChevronRight } from '@material-ui/icons';

class Breadcrumbs extends Component {

    render() {
         const { location, history, rootPathLength = 2 } = this.props;

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
        <div>
           {crumbs.map((crumb, index) => (
                <Link to={crumb.href} key={index}>           
                    <span>                 
                        <Button variant="contained" >
                            {crumb.caption }   
                        </Button>                 
                        {index < crumbs.length -1 ? <ChevronRight/> :false // dont show chevron pointing away from last crumb                 
                        }
                    </span>
                </Link> 
            )) }
        </div>
        );
    }
}

export default Breadcrumbs;
