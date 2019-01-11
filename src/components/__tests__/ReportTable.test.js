import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import ReportTable from '../ReportTable';

describe('<ReportTable />', () => {
    const getPlaceholder = () => wrapper.find('Placeholder');
    const getTableDataRows = () => wrapper.find('WithStyles(TableRow).report-data-row');
    const getTitle = () => wrapper.find('h5.main-title');
    const getError= () => wrapper.find('h5.error-message');
    const getTotals = () => wrapper.find('WithStyles(TableRow).report-totals.success');
    const getRowTitles= () => wrapper.find('WithStyles(TableCell).row-titles');
    const shallow = createShallow({ dive: true });
    let wrapper, props;

    // some sample report data with 2 results
    let reportData =  require('../../../public/sampleReportData.json');

    describe('When no report data', () => {
        
        beforeEach(() => {
            props = {}
            wrapper = shallow(<ReportTable {...props} />);
        }); 
        
        it('should render the placeholder table', () => {
            expect(getPlaceholder()).toHaveLength(1);
        });
    })

    describe('When report data', () => {  
        beforeEach(() => {
            props = {reportData: reportData, title: reportData.title};
            wrapper = shallow(<ReportTable {...props} />);
        }); 
        
        it('should render the table with correct number of data rows', () => {
            expect(getTableDataRows()).toHaveLength(2); // two results in reportData
        });

        it('should render title by default', () => {
            expect(getTitle().text()).toBe(reportData.title.displayString);
        })

        it('should render totals by default', () => {
            expect(getTotals()).toHaveLength(1);
        });

        it('should render row titiles by default', () => {
            expect(getRowTitles()).toHaveLength(1);
        });

        describe('When not showTitle', () => {
            it('should not show title', () => {
                wrapper.setProps({reportData: reportData, title: null});
                expect(getTitle()).toHaveLength(0);  
            }); 
        });

        describe('When not showRowTitle', () => {
            it('should not show row titles', () => {
                wrapper.setProps({reportData: reportData, showRowTitles: false});
                expect(getRowTitles()).toHaveLength(0);  
            }); 
        });

        describe('When not showTotals', () => {
            it('should not show totals', () => {
                wrapper.setProps({reportData: reportData, showTotals: false});
                expect(getTotals()).toHaveLength(0);  
            }); 
        });

        describe('When error', () => {
            beforeEach(() => {
                reportData = {...reportData, error: "some error", message: "error message"}
                wrapper.setProps( {
                    reportData: reportData,
                });
            });
            
            it('should render error message', () => {
                expect(getError()).toHaveLength(1);
            });
        });
    })
});