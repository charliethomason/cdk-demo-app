import orderBy from 'lodash/orderBy';

export default {
    filters: ({ movies }) => {
        const { filters } = movies;
        return filters;
    },
    rowSize: ({ movies }) => {
        return movies.rowSize;
    },
    page: ({ movies }) => {
        return movies.page.index;
    },
    filteredMovies: ({ movies }) => {
        const selectedGenre = movies.filters[0].props.value.map(({ value }) => value);
        const selectedYear = movies.filters[1].props.value.map(({ value }) => value);
        let filteredMovies = movies.rows;
        if (selectedGenre.length) {
            filteredMovies = filteredMovies.filter( ({ data }) => data.genres.value.indexOf(selectedGenre[0]) !== -1);
        }
        if (selectedYear.length) {
            filteredMovies = filteredMovies.filter( ({ data }) => data.year.value.toString() === selectedYear[0] );
        }
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
    },
    tilesConfig: ({ tilesConfig }) => {
        return tilesConfig;
    },
    selectedTile: ({ selectedTile }) => {
        return selectedTile;
    }
};