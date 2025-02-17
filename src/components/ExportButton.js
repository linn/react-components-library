import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import SvgIcon from '@mui/material/SvgIcon';
import Loading from './Loading';

function ExportButton({
    href,
    accept = 'text/csv',
    fileName = 'export.csv',
    buttonText = 'EXPORT',
    tooltipText = 'Download report as CSV file',
    disabled = false,
    accessToken = null
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    let h = {
        Accept: accept
    };

    if (accessToken) {
        h = { ...h, Authorization: `Bearer ${accessToken}` };
    }

    const download = () =>
        fetch(href, {
            headers: new Headers(h)
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
                a.download = fileName;
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
        <div style={{ float: 'right' }}>
            <Tooltip title={tooltipText} placement="top-end">
                {loading ? (
                    <Loading />
                ) : (
                    <Button
                        variant="outlined"
                        disabled={disabled}
                        color={error ? 'secondary' : 'primary'}
                        onClick={() => {
                            setLoading(true);
                            setError(false);
                            download();
                        }}
                    >
                        {error ? 'Retry' : buttonText}
                        <SvgIcon>
                            <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"
                            />
                        </SvgIcon>
                    </Button>
                )}
            </Tooltip>
        </div>
    );
}

export default ExportButton;
