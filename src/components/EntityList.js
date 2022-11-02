import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Title from './Title';

const getListItemText = (entity, entityid, descriptionFieldName) =>
    descriptionFieldName
        ? `${entity[entityid]} - ${entity[descriptionFieldName]}`
        : entity[entityid];

function EntityList({ title, entityList, entityId, descriptionFieldName, hasExternalLinks }) {
    const Component = hasExternalLinks ? 'a' : Link;
    return (
        <>
            <Title text={title} />
            <List>
                {entityList.map(entity => (
                    <ListItem
                        key={entity[entityId]}
                        button
                        component={Component}
                        to={entity.href}
                        href={entity.href}
                    >
                        <Typography color="primary" variant="subtitle2">
                            {getListItemText(entity, entityId, descriptionFieldName)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    );
}

EntityList.propTypes = {
    title: PropTypes.string,
    entityId: PropTypes.string.isRequired,
    entityList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    descriptionFieldName: PropTypes.string,
    hasExternalLinks: PropTypes.bool
};

EntityList.defaultProps = {
    descriptionFieldName: null,
    title: '',
    hasExternalLinks: false
};

export default EntityList;
