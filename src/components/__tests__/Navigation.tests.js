import React from 'react';
import Navigation from '../Navigation';
import { createShallow } from '@material-ui/core/test-utils';
import ListItem from "@material-ui/core/ListItem";
import MenuPage from "../MenuPage";
import MenuList from '../MenuList';

// using the real menu file to test...
// if we host this on npm as part of the shared components package then these tests won't break every time someone changes the menu
const sections = require('../../../public/menu.json').sections;
let headersCount = sections.length;

// programatically get some data from the menu for test comparisons.
const section = sections[0];

let columns = section.columns;
let categoriesListArray = [];

columns.forEach(function (column) {
    categoriesListArray.push(column.categories);
});

let lists = [];
categoriesListArray.forEach(function(categoriesList) {
    lists.push(categoriesList);
});

// I'm not using the column layout of the old menu (and don't understand why this was hardcoded into the json)
// So need to count the total number of column nested list entries here for test comparison.
let subHeadersCount = (lists) => {
    let count =0;
    lists.forEach(function (list) {
        list.forEach(function(entry){
            count += 1;
        });
    });
    return count;
}

describe('Navigation', () => {
    const shallow = createShallow({ dive: true });
    let wrapper, props;
    
    beforeEach(() => {
        props = {};
        wrapper = shallow(<Navigation {...props} />);
    });
    
    it('should render top level list', () => {
        expect(wrapper.find(ListItem).length).toBe(headersCount);
    });

    it('should render a menu page', () => {
        expect(wrapper.find(MenuPage).length).toBe(1);
    });
})

describe('Menu Page', () => {

    const shallow = createShallow({ dive: true });
    let wrapper, props;
    
    beforeEach(() => {
        props = {lists};
        wrapper = shallow(<MenuPage {...props} />);
    });

    it('should render correct number of lists', () => {
        expect(wrapper.find(MenuList).length).toBe(subHeadersCount(lists));
    });
});
