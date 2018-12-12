import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { ChevronRight } from '@material-ui/icons';

class Breadcrumbs extends Component {

    render() {
        const { location, history, rootPathLength = 2 } = this.props

        const crumbs = location.pathname
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
            {crumbs.map(crumb => (
            <span>
                  <Button variant="contained" ><Link to={crumb.href}> { crumb.caption }   </Button> <ChevronRight /> </Link>
            </span>
            )) }
        </div>
        );
    }
}

export default Breadcrumbs;
