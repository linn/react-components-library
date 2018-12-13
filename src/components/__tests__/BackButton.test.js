import React from 'react';
import { shallow, mount } from 'enzyme';
import BackButton from '../BackButton';
import Button from '@material-ui/core/Button';


describe('Back Button', () => {

 it('should render without throwing an error', () => {
   expect(shallow(<BackButton />).dive().find(Button).length).toBe(1);
 })
})
