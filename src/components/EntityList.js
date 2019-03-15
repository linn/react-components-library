import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Typography } from '@material-ui/core';
import Title from './Title';
import SmartLink from './SmartLink';

const getListItemtText = (entity, entityid, descriptionFieldName) =>
    descriptionFieldName
        ? `${entity[entityid]} - ${entity[descriptionFieldName]}`
        : entity[entityid];

function Entity({ entity, entityId, descriptionFieldName }) {
    return (
        <ListItem key={entity[entityId]} button>
            <Typography color="primary" variant="subtitle2">
                {getListItemtText(entity, entityId, descriptionFieldName)}
            </Typography>
        </ListItem>
    );
}

const EntityLink = SmartLink(Entity);

function EntityList({ title, entityList, entityId, descriptionFieldName, appRoutes }) {
    return (
        <Fragment>
            <Title text={title} />
            <List>
                {entityList.map(entity => (
                    <EntityLink
                        entity={entity}
                        descriptionFieldName={descriptionFieldName}
                        entityId={entityId}
                        to={entity.href}
                        appRoutes={appRoutes}
                    />
                ))}
            </List>
        </Fragment>
    );
}

EntityList.propTypes = {
    appRoutes: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    entityId: PropTypes.string.isRequired,
    entityList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    descriptionFieldName: PropTypes.string
};

EntityList.defaultProps = {
    descriptionFieldName: null,
    title: '',
    appRoutes: []
};

Entity.propTypes = {
    entity: PropTypes.shape({}).isRequired,
    entityId: PropTypes.string.isRequired,
    descriptionFieldName: PropTypes.string
};

Entity.defaultProps = {
    descriptionFieldName: null
};

export default EntityList;
