import Vue from 'vue';
import Vuex from 'vuex';
import orderBy from 'lodash/orderBy';
import mutations from './mutations';

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
            sortMethods: [],
            filters: [
                {
                    component: 'cdkPicklistField',
                    props: {
                        label: 'Genre',
                        name: 'genre',
                        singleSelect: true,
                        value: [],
                        picklistOptions: []
                    }
                }
            ],
            rowSize: 20
        }
    },
    getters: {
        movieSample: ({movies}) => {
            const selectedFilter = movies.filters[0].props.value.map(({value}) => value);
            const filteredMovies = selectedFilter.length
                ? movies.rows.filter(({data}) => data.genres.value.indexOf(selectedFilter[0]) !== -1)
                : movies.rows;
            return movies.rowSize
                ? filteredMovies.slice(0, movies.rowSize)
                : filteredMovies;
        },
        movieRows: (state, getters) => {
            const fields = state.movies.sortMethods.map(method => `data.${method.field}.value`);
            const orders = state.movies.sortMethods.map(method => method.sortOrder);
            return orderBy(getters.movieSample, fields, orders);
        }
    },
    mutations
});
