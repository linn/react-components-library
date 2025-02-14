import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

const getListItemText = (entity, entityid, descriptionFieldName) =>
    descriptionFieldName
        ? `${entity[entityid]} - ${entity[descriptionFieldName]}`
        : entity[entityid];

function EntityList({
    title = '',
    entityList,
    entityId,
    descriptionFieldName = null,
    hasExternalLinks = false
}) {
    const Component = hasExternalLinks ? 'a' : Link;
    return (
        <>
            <Typography variant="h4">{title}</Typography>
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

export default EntityList;
