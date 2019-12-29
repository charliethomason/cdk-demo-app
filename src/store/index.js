import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isPinned: true,
        movies: {
            rows: [],
            headers: [
                { label: 'Title', field: 'title', sortOrder: 'asc' },
                { label: 'Year', field: 'year' },
                { label: 'Genres', field: 'genres' },
                { label: 'Cast', field: 'cast' }
            ],
            sortMethods: [
                {
                    field: 'title',
                    label: 'Title',
                    sortOrder: 'asc'
                }
            ],
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
            rowSize: 25,
            page: {
                label: 1,
                index: 0
            }
        }
    },
    getters,
    mutations,
    actions
});
