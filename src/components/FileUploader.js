/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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
import ErrorCard from './ErrorCard';
import SnackbarMessage from './SnackbarMessage';
import Loading from './Loading';

function FileUploader({
    title,
    helperText,
    doUpload,
    loading,
    result,
    snackbarVisible,
    setSnackbarVisible,
    initiallyExpanded,
    initialFile,
    onFileSelect
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
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">{helperText}</Typography>
                        </Grid>
                        {loading ? (
                            <Grid item xs={12}>
                                <Loading />
                            </Grid>
                        ) : (
                            <>
                                <Grid item xs={12}>
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
                                <Grid item xs={11} />
                                <Grid item xs={1}>
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
                                    <Grid item xs={12}>
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

FileUploader.propTypes = {
    helperText: PropTypes.string,
    title: PropTypes.string,
    doUpload: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    result: PropTypes.shape({
        success: PropTypes.bool,
        message: PropTypes.string,
        errors: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    snackbarVisible: PropTypes.bool,
    setSnackbarVisible: PropTypes.func,
    initiallyExpanded: PropTypes.bool,
    initialFile: PropTypes.shape({}),
    onFileSelect: PropTypes.func
};

FileUploader.defaultProps = {
    helperText: 'Upload a File',
    title: 'File Uploader',
    initiallyExpanded: true,
    loading: false,
    result: null,
    snackbarVisible: false,
    setSnackbarVisible: null,
    initialFile: null,
    onFileSelect: () => {}
};

export default FileUploader;
