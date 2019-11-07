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
                    defaultReset: [],
                    props: {
                        label: 'Genre',
                        name: 'genre',
                        singleSelect: true,
                        value: [],
                        picklistOptions: []
                    }
                }
            ]
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
    mutations
});
