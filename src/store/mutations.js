const movieRowReducer = (data, headers) => {
    return data.map(movie => {
        const data = headers.reduce((dataObj, { field }) => {
            const valueStr = Array.isArray(movie[field])
                ? movie[field].join(', ')
                : movie[field];
            dataObj[field] = {
                value: valueStr ? valueStr : '—'
            };
            return dataObj;
        }, {});
        return { data };
    });
};
const movieFilterReducer = (data) => {
    const allGenres = data.reduce((genres, movie) => {
        movie.genres.forEach(genre => {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        });
        return genres;
    }, []);
    const allYears = data.reduce((years, movie) => {
        if (!years.includes(movie.year)) {
            years.push(movie.year);
        }
        return years;
    }, []);
    const sortedGenres = allGenres.sort().map((value, id) => ({
        label: value,
        value,
        id
    }));
    const sortedYears = allYears.sort().map((value, id) => ({
        label: value.toString(),
        value: value.toString(),
        id
    }));
    return {
        genres: sortedGenres,
        years: sortedYears
    }
};

const setMovieRows = (state, movieData) => {
    state.movies.rows = movieRowReducer(movieData, state.movies.headers);
    const { genres, years } = movieFilterReducer(movieData);
    state.movies.filters[0].props.picklistOptions = genres;
    state.movies.filters[1].props.picklistOptions = years;
    state.tilesConfig[0].header.groupNumber = genres.length;
    state.tilesConfig[0].tiles = genres.map(genre => ({
        titleText: genre.label,
        id: `genre-${genre.id}`
    }));
    state.tilesConfig[1].tiles = years.map(year => ({
        titleText: year.label,
        id: `year-${year.id}`
    }));
    state.selectedTile = {
        id: `genre-${genres[0].id}`,
        titleText: genres[0].label
    };
};
const updateMovieSort = (state, sortMethods) => {
    state.movies.sortMethods = sortMethods;
};
const updateFilters = (state, filters) => {
    state.movies.filters = filters;
};
const updatePagination = (state, value) => {
    state.movies.rowSize = value.limit;
    state.movies.page = value.page;
};
const updatePinned = (state, isPinned) => {
    state.isPinned = isPinned;
};
const updateSelectedTile = (state, selectedTile) => {
    state.selectedTile = selectedTile;
};

export default {
    setMovieRows,
    updateMovieSort,
    updateFilters,
    updatePagination,
    updatePinned,
    updateSelectedTile
};
