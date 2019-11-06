<template>
    <h1>{{ message }}</h1>
</template>

<script>
export default {
    name: 'Page',
    data() {
        return {
            message: 'CDK Demo App'
        };
    },
    methods: {
        getMovies() {
            fetch('../data/movies.json')
                .then(response => response.json())
                .then(movieData => {
                    this.$store.commit('setMovieData', movieData);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        this.getMovies();
    }
};
</script>
