import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Close from '@mui/icons-material/Close';
import SearchInputField from './SearchInputField';
import List from '@mui/material/List';

const styles = {
    paper: {
        backgroundColor: '#f5f5f5',
        position: 'fixed',
        zIndex: 1000,
        paddingTop: '80px',
        width: '100%',
        overflow: 'auto',
        height: '100vh'
    },
    searchInputField: {
        float: 'right'
    }
};

function SearchPanel({ menu, close }) {
    const [searchTerm, setSearchTerm] = useState();

    const menuEntries = menu
        .map(s => s.columns)
        .flat()
        .map(c => c.categories)
        .flat()
        .map(i => i.items)
        .flat();

    const uniqueEntries = Object.values(
        menuEntries.reduce((uniques, entry) => {
            if (!uniques[entry.href]) {
                return { ...uniques, [entry.href]: entry };
            }
            return uniques;
        }, {})
    );

    const handleFieldChange = (propertyName, newValue) => {
        setSearchTerm(newValue);
    };
    return (
        <Paper sx={styles.paper}>
            <Button
                onClick={close}
                color="secondary"
                sx={{
                    marginRight: '10px',
                    marginTop: '10px',
                    float: 'right',
                    top: 0,
                    right: 0
                }}
            >
                <Close />
            </Button>
            <Grid container>
                <Grid xs={12} sm={6} md={4} lg={3} xl={3} justify-content="flex-end">
                    <SearchInputField
                        value={searchTerm}
                        onChange={handleFieldChange}
                        textFieldProps={{
                            autoFocus: true
                        }}
                        placeholder="start typing..."
                    />
                    <List dense>
                        {searchTerm?.length > 1 &&
                            uniqueEntries
                                .filter(
                                    e =>
                                        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        e.href.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map(entry => (
                                    <React.Fragment key={entry.href}>
                                        <a href={entry.href} style={{ textDecoration: 'none' }}>
                                            <ListItem>
                                                <Typography variant="overline" color="primary">
                                                    {entry.title}
                                                </Typography>
                                            </ListItem>
                                        </a>
                                    </React.Fragment>
                                ))}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
}

SearchPanel.propTypes = {
    close: PropTypes.func.isRequired,
    menu: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default SearchPanel;
