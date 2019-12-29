import orderBy from 'lodash/orderBy';

export default {
    filters: ({movies }) => {
        return movies.filters;
    },
    rowSize: ({ movies }) => {
        return movies.rowSize;
    },
    page: ({ movies }) => {
        return movies.page.index;
    },
    filteredMovies: ({ movies }) => {
        const selectedFilter = movies.filters[0].props.value.map(({ value }) => value);
        const filteredMovies = selectedFilter.length
            ? movies.rows.filter(({ data }) => data.genres.value.indexOf(selectedFilter[0]) !== -1)
            : movies.rows;
        return filteredMovies;
    },
    totalRows: ({ movies }, getters) => {
        return getters.filteredMovies.length;
    },
    movieRows: ({ movies }, { filteredMovies }) => {
        const { page, rowSize } = movies;
        const sliceStart = rowSize * page.index;
        const sliceEnd = sliceStart + rowSize;
        const sortFields = movies.sortMethods.map(method => `data.${method.field}.value`);
        const sortOrders = movies.sortMethods.map(method => method.sortOrder);
        const sortedFilteredMovies = orderBy(filteredMovies, sortFields, sortOrders);
        return sortedFilteredMovies.slice(sliceStart, sliceEnd);
    }
};