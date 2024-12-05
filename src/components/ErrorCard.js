import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Error from '@mui/icons-material/Error';
import PropTypes from 'prop-types';

function ErrorCard({ errorMessage, detailLines }) {
    return (
        <Card
            sx={{
                width: '50%',
                margin: '0 auto',
                padding: theme => theme.spacing(2),
                backgroundColor: theme => theme.palette.error.light
            }}
        >
            <Error sx={{ color: theme => theme.palette.error.dark, float: 'right' }} />

            <Typography align="center">{errorMessage}</Typography>
            <div>
                {detailLines?.map(d => (
                    <Typography
                        key={d.descriptor}
                        align="center"
                    >{`${d.descriptor} - ${d.message}`}</Typography>
                ))}
            </div>
        </Card>
    );
}

ErrorCard.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        icon: PropTypes.string,
        typography: PropTypes.string,
        details: PropTypes.string
    }),
    detailLines: PropTypes.arrayOf(
        PropTypes.shape({ descriptor: PropTypes.string, message: PropTypes.string })
    ),
    errorMessage: PropTypes.string.isRequired
};

ErrorCard.defaultProps = {
    classes: {},
    detailLines: []
};

export default ErrorCard;
