import Vue from 'vue';
import Vuex from 'vuex';
import orderBy from 'lodash/orderBy';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: {
            rows: [],
            headers: [
                { label: 'Title', field: 'title', sortOrder: 'asc' },
                { label: 'Year', field: 'year' },
                { label: 'Genres', field: 'genres' },
                { label: 'Cast', field: 'cast' }
            ],
            sortMethods: []
        }
    },
    getters: {
        movieSample: state => {
            return state.movies.rows.slice(0, 20);
        },
        movieRows: (state, getters) => {
            const fields = state.movies.sortMethods.map(method => `data.${method.field}.value`);
            const orders = state.movies.sortMethods.map(method => method.sortOrder);
            return orderBy(getters.movieSample, fields, orders);
        }
    },
    mutations: {
        setMovieRows(state, movieData) {
            state.movies.rows = movieData.map(movie => {
                const data = state.movies.headers.reduce((dataObj, { field }) => {
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
        },
        updateMovieSort(state, sortMethods) {
            state.movies.sortMethods = sortMethods;
        }
    }
});
