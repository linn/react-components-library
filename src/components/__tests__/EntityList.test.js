import React from 'react';
import EntityList from '../EntityList';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<EntityList />', () => {
    const entityList = [
        { id: 'one', description: 'The first item in the list', href: '/entity/1' },
        { id: 'two', description: 'The second item in the list', href: '/entity/2' },
        { id: 'three', description: 'The third item in the list', href: '/entity/3' }
    ];

    beforeEach(() => {
        const props = {
            entityList,
            entityId: 'id',
            descriptionFieldName: null
        };
        render(<EntityList {...props} />);
    });

    it('should render list items', () => {
        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
        expect(screen.getByText('three')).toBeInTheDocument();
    });
});
