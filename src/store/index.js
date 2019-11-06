import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: []
    },
    mutations: {
        setMovieData(state, movieData) {
            state.movies = movieData;
        }
    }
});
