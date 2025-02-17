import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom';
import SaveBackCancelButtons from '../SaveBackCancelButtons';

describe('<SaveBackCancelButtons />', () => {
    const cancelClick = jest.fn();
    const backClick = jest.fn();
    const saveClick = jest.fn();

    beforeEach(() => {
        render(
            <SaveBackCancelButtons
                cancelClick={cancelClick}
                backClick={backClick}
                saveClick={saveClick}
            />
        );
    });

    it('should render buttons without throwing an error', () => {
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
});
