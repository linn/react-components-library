import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem, Typography } from '@material-ui/core';
import Title from './Title';

const getListItemtText = (entity, entityid, descriptionFieldName) =>
    descriptionFieldName
        ? `${entity[entityid]} - ${entity[descriptionFieldName]}`
        : entity[entityid];

const EntityList = ({ title, entityList, entityId, descriptionFieldName }) => (
    <Fragment>
        <Title text={title} />
        <List>
            {entityList.map(entity => (
                <ListItem key={entity[entityId]} component={Link} to={entity.href} button>
                    <Typography color="primary">
                        {getListItemtText(entity, entityId, descriptionFieldName)}
                    </Typography>
                </ListItem>
            ))}
        </List>
    </Fragment>
);

EntityList.propTypes = {
    title: PropTypes.string,
    entityId: PropTypes.string.isRequired,
    entityList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    descriptionFieldName: PropTypes.string
};

EntityList.defaultProps = {
    descriptionFieldName: null,
    title: ''
};

export default EntityList;
