import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from 'prop-types';

const ExportButton = ({ href }) => (
    <div style={{ float: 'right' }}>
        <Tooltip title="Download report as CSV file" placement="top-end">
            <Button href={href} color="primary" variant="outlined">
                Export
                <SvgIcon>
                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"
                    />
                </SvgIcon>
            </Button>
        </Tooltip>
    </div>
);

ExportButton.propTypes = {
    href: PropTypes.string.isRequired
};

export default ExportButton;
