import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Slash() {
    return <> {' / '} </>;
}

function Breadcrumbs({
    navigate,
    rootPathLength = 2,
    homeUrl = 'https://app.linn.co.uk',
    location
}) {
    let path = location.pathname;
    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }

    const crumbs = path
        .split('/')
        .filter(x => x !== 'report')
        .reduce((sofar, crumb, i, list) => {
            const currentPath = list.slice(0, i + 1).join('/') || '/';
            const handleClick = e => {
                if (list.length > rootPathLength) {
                    e.preventDefault();
                    navigate(currentPath);
                }
            };

            return crumb
                ? [
                      ...sofar,
                      {
                          key: i,
                          caption: crumb,
                          href: currentPath,
                          onClick: handleClick
                      }
                  ]
                : sofar;
        }, []);

    return (
        <Fragment style={{ width: '100%' }}>
            <Link
                key="home"
                href={homeUrl}
                variant="button"
                sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
            >
                HOME
            </Link>
            <Slash />
            {crumbs.map((crumb, index) => {
                if (index < crumbs.length - 1) {
                    return (
                        <Fragment key={index}>
                            <Link
                                key={crumb.href}
                                href={crumb.href}
                                variant="button"
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}
                                onClick={crumb.onClick}
                            >
                                {crumb.caption}
                            </Link>
                            <Slash />
                        </Fragment>
                    );
                }
                return (
                    <Typography display="inline" variant="button" key={index}>
                        {crumb.caption}
                    </Typography>
                );
            })}
        </Fragment>
    );
}

export default Breadcrumbs;
