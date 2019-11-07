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
    return allGenres.sort().map((value, id) => ({
        label: value,
        value,
        id
    }));
};

const setMovieRows = (state, movieData) => {
    state.movies.rows = movieRowReducer(movieData, state.movies.headers);
    const movieOptions = movieFilterReducer(movieData);
    state.movies.filters[0].props.picklistOptions = movieOptions;
    state.movies.filters[0].props.value = [movieOptions[0]];
    state.movies.filters[0].defaultReset = [movieOptions[0]];
};
const updateMovieSort = (state, sortMethods) => {
    state.movies.sortMethods = sortMethods;
};
const updateFilters = (state, filters) => {
    state.movies.filters = filters;
};

export default {
    setMovieRows,
    updateMovieSort,
    updateFilters
};