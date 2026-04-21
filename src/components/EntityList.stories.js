import { MemoryRouter } from 'react-router-dom';
import { fn } from 'storybook/test';
import EntityList from './EntityList';

const sampleEntities = [
    { id: 1, name: 'Widget A', href: '/products/1' },
    { id: 2, name: 'Widget B', href: '/products/2' },
    { id: 3, name: 'Gadget Pro', href: '/products/3' }
];

const entitiesWithDescription = [
    { id: 'WA', description: 'Widest widget', href: '/products/WA' },
    { id: 'WB', description: 'Mid-range widget', href: '/products/WB' },
    { id: 'GP', description: 'Professional gadget', href: '/products/GP' }
];

export default {
    title: 'Components/EntityList',
    component: EntityList,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        title: 'Products',
        entityList: sampleEntities,
        entityId: 'id',
        descriptionFieldName: null,
        hasExternalLinks: false
    }
};

export const Default = {};

export const WithDescriptions = {
    name: 'With description field',
    args: {
        entityList: entitiesWithDescription,
        entityId: 'id',
        descriptionFieldName: 'description'
    }
};

export const ExternalLinks = {
    name: 'External links',
    args: {
        hasExternalLinks: true
    }
};

export const NoTitle = {
    name: 'No title',
    args: {
        title: ''
    }
};
