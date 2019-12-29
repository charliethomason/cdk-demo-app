import orderBy from 'lodash/orderBy';

const filterMovies = (moviesArr, filterType, filterVal) => {
    if (filterType === 'genre') {
        return moviesArr.filter(({ data }) => data.genres.value.indexOf(filterVal) !== -1);
    } else if (filterType === 'year') {
        return moviesArr.filter(({ data }) => data.year.value.toString() === filterVal);
    }
};

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
            filteredMovies = filterMovies(filteredMovies, 'genre', selectedGenre[0]);
        }
        if (selectedYear.length) {
            filteredMovies = filterMovies(filteredMovies, 'year', selectedYear[0]);
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
        return selectedTile.id;
    },
    totalFilmsForTile: state => {
        const selectedTile = state.selectedTile.titleText;
        const tileType = state.selectedTile.id
            ? state.selectedTile.id.split('-')[0]
            : 'genre';
        return filterMovies(state.movies.rows, tileType, selectedTile);
    }
};