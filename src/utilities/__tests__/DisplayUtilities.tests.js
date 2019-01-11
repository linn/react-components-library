import React from 'react';
import { shallow, mount } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import { formatHeading} from '../DisplayUtilities';
// const shallow = createShallow({ dive: true });
    let wrapper, props;

describe('formatHeading', () => {
    let titleWithDisplayString = { displayString: "title"};
                                                     
    beforeEach(() => {                                                                  
       
    });                                                  

    it('should return false when not show title ', () => {
        
        expect(formatHeading("hello", false)).toBe(false);
    });

    it('should return error if error', () =>{
        expect(formatHeading("hello", true, true, true)).toEqual(<strong>Error</strong>);
    });

    it('should return loading if loading', () => {
        expect(formatHeading("hello", true, true, false)).toEqual(<h5 className="loading-title">hello (loading)</h5>);   
    });

    it('should return titles display string if exists', () => {
        expect(formatHeading(titleWithDisplayString, true, false, false)).toEqual(<strong>title</strong>); 
    });
});

describe('setTextValueDrilldown', () => {
    let value = {
        drillDowns: [{href: '/url1'},{href: '/url2'},{href: '/url3'}]
}; 

    it('should return false when not show title ', () => {
        expect(formatHeading("hello", false)).toBe(false);
    });

    it('should return error if error', () =>{
        expect(formatHeading("hello", true, true, true)).toEqual(<strong>Error</strong>);
    });

    it('should return loading if loading', () => {
        expect(formatHeading("hello", true, true, false)).toEqual(<h5 className="loading-title">hello (loading)</h5>);   
    });

    it('should return titles display string if exists', () => {
        expect(formatHeading(titleWithDisplayString, true, false, false)).toEqual(<strong>title</strong>); 
    });
});