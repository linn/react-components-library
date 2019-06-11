import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import SnackbarMessage from '../SnackbarMessage';

describe('<SnackbarMessage />', () => {
    let wrapper;
    let props;
    const getSnackbar = () => wrapper.find('WithStyles(ForwardRef(Snackbar))');
    const shallow = createShallow({ dive: true });

    beforeEach(() => {
        props = {
            message: 'Snackbar message',
            onClose: jest.fn()
        };
        wrapper = shallow(<SnackbarMessage {...props} />);
    });

    it('should render snackbar', () => {
        expect(getSnackbar()).toHaveLength(1);
    });
});
