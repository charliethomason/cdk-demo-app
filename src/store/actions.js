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
    },
    getOmdbData({ commit }, topThree) {
        let omdbData = [];
        let filmsFetched = 0;
        commit('updateOmdbLoading', true);
        topThree.forEach(film => {
            fetch(`http://www.omdbapi.com/?apikey=d1723d1b&t=${film.t}&y=${film.y}`)
                .then(response => response.json())
                .then(filmData => {
                    filmsFetched++;
                    if (!filmData['Error']) {
                        omdbData.push(filmData);
                    }
                    if (filmsFetched === topThree.length) {
                        commit('updateOmdbLoading', false);
                        commit('updateOmdbFilms', omdbData);
                    }
                })
                .catch(error => {
                    filmFetched++;
                    console.log(error);
                    if (filmsFetched === topThree.length) {
                        commit('updateOmdbLoading', false);
                        commit('updateOmdbFilms', omdbData);
                    }
                });
        });
    }
};