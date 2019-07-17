import { useEffect, useState } from 'react';

export default function useTablePagination(pageLoad, pageSortedLoad) {
    const [pageOptions, setPageOptions] = useState({
        orderBy: '',
        orderAscending: false,
        currentPage: 0,
        rowsPerPage: 10
    });

    useEffect(() => {
        // page number must be incremented because the starting index on the server is 1
        if (pageOptions.orderBy && pageSortedLoad) {
            pageSortedLoad(
                pageOptions.currentPage + 1,
                pageOptions.rowsPerPage,
                pageOptions.orderBy,
                pageOptions.orderAscending
            );
        } else {
            pageLoad(pageOptions.currentPage + 1, pageOptions.rowsPerPage);
        }
    }, [
        pageOptions.currentPage,
        pageOptions.rowsPerPage,
        pageOptions.orderBy,
        pageOptions.orderAscending,
        pageLoad,
        pageSortedLoad
    ]);

    return [pageOptions, setPageOptions];
}
