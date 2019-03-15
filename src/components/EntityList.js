import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem, Typography } from '@material-ui/core';
import Title from './Title';

const getListItemtText = (entity, entityid, descriptionFieldName) =>
    descriptionFieldName
        ? `${entity[entityid]} - ${entity[descriptionFieldName]}`
        : entity[entityid];

function EntityList({ title, entityList, entityId, descriptionFieldName, hasExternalLinks }) {
    const Component = hasExternalLinks ? 'a' : Link;
    return (
        <Fragment>
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
                            {getListItemtText(entity, entityId, descriptionFieldName)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Fragment>
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
