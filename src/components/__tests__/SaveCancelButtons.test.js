import React from 'react';
import { shallow, mount } from 'enzyme';
import SaveCancelButtons from '../SaveCancelButtons';
import Button from '@material-ui/core/Button';

describe('SaveCancelButtons', () => {

 it('should render without throwing an error', () => {
   expect(shallow(<SaveCancelButtons />).dive().find(Button).length).toBe(2);
 })
})
