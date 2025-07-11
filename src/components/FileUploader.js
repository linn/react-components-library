import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorCard from './ErrorCard.js';
import SnackbarMessage from './SnackbarMessage.js';
import Loading from './Loading.js';

function FileUploader({
    helperText = 'Upload a File',
    title = 'File Uploader',
    initiallyExpanded = true,
    loading = false,
    result = null,
    snackbarVisible = false,
    setSnackbarVisible = null,
    initialFile = null,
    onFileSelect = () => {},
    doUpload
}) {
    const [file, setFile] = useState(initialFile);
    const [expanded, setExpanded] = useState(initiallyExpanded);

    const onDrop = useCallback(
        acceptedFile => {
            setFile(acceptedFile[0]);
            onFileSelect(acceptedFile[0]);
        },
        [onFileSelect]
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUploadClick = () => {
        const reader = new global.FileReader();
        reader.onload = () => {
            const binaryStr = reader.result;
            doUpload(binaryStr);
        };
        reader.readAsArrayBuffer(file);
        setFile(null);
    };

    return (
        <>
            {snackbarVisible && (
                <SnackbarMessage
                    visible={snackbarVisible && result?.success}
                    onClose={() => setSnackbarVisible(false)}
                    message={result?.message}
                />
            )}
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h5">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Typography variant="subtitle1">{helperText}</Typography>
                        </Grid>
                        {loading ? (
                            <Grid size={12}>
                                <Loading />
                            </Grid>
                        ) : (
                            <>
                                <Grid size={12}>
                                    <Box
                                        sx={{ border: '1px dashed grey', margin: '10px' }}
                                        style={{ cursor: 'pointer' }}
                                        {...getRootProps()}
                                    >
                                        <Typography
                                            style={{ paddingTop: '10px', paddingBottom: '20px' }}
                                            variant="subtitle2"
                                        >
                                            Drop the file here or click to browse...
                                        </Typography>
                                        <input {...getInputProps()} />

                                        {file && (
                                            <Chip
                                                label={file.name}
                                                color="primary"
                                                onDelete={() => setFile(null)}
                                                variant="outlined"
                                            />
                                        )}
                                    </Box>
                                </Grid>
                                <Grid size={11} />
                                <Grid size={1}>
                                    <Button
                                        id="save-button"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUploadClick}
                                        disabled={!file}
                                    >
                                        Upload
                                    </Button>
                                </Grid>
                                {result && !result.success && (
                                    <Grid size={12}>
                                        <ErrorCard
                                            errorMessage={result.message}
                                            detailLines={result?.errors}
                                        />
                                    </Grid>
                                )}
                            </>
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default FileUploader;
