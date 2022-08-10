import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Loading from './Loading';

const DownloadButton = ({ href, accept, fileName, buttonText }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const download = () =>
        fetch(href, {
            headers: new Headers({
                Accept: accept
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                if (fileName) {
                    a.download = `${fileName}`;
                }
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .then(() => setLoading(false))
            .catch(() => {
                setError(true);
                setLoading(false);
                alert('Download failed');
            });

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Button
                    variant="outlined"
                    color={error ? 'secondary' : 'primary'}
                    onClick={() => {
                        setLoading(true);
                        setError(false);
                        download();
                    }}
                >
                    {error ? 'Retry' : buttonText}
                </Button>
            )}
        </>
    );
};

DownloadButton.propTypes = {
    href: PropTypes.string.isRequired,
    accept: PropTypes.string,
    fileName: PropTypes.string,
    buttonText: PropTypes.string
};

DownloadButton.defaultProps = {
    accept: 'text/csv',
    buttonText: 'EXPORT',
    fileName: null
};

export default DownloadButton;
