<template>
    <div class="omdb-card">
        <h2 class="up-ds-type up-ds-type--light-heading-xxs">
            <span class="up-ds-type up-ds-type--bold-heading-xxs">
                {{ film['Title'] }}
            </span>
            &mdash; {{ film['Year'] }}
        </h2>
        <div class="film-info">
            <div class="film-poster">
                <img :src="film['Poster']" :alt="film['Title']" />
            </div>
            <ul>
                <li class="up-ds-type up-ds-type--regular-text-m">
                    <strong>Director:</strong>
                    {{ film['Director'] }}
                </li>
                <li class="up-ds-type up-ds-type--regular-text-m">
                    <strong>Writer:</strong>
                    {{ film['Writer'] }}
                </li>
                <li class="up-ds-type up-ds-type--regular-text-m">
                    <strong>Actors:</strong>
                    {{ film['Actors'] }}
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'FilmCard',
    props: {
        film: {
            type: Object
        }
    }
};
</script>