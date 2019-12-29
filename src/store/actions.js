export default {
    fetchData({ commit }) {
        fetch('../data/movies.json')
            .then(response => response.json())
            .then(movieData => {
                commit('setMovieRows', movieData);
            })
            .catch(error => {
                console.error(error);
            });
    }
};