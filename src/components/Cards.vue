<template>
    <div class="demo-cards-wrapper">
        <cdk-tiles
            v-bind="tilesProps"
            @tile-click="updateSelectedTile"
        />
        <div class="demo-cards-content">
            <cdk-card v-bind="totalCard.heading">
                <div class="up-ds-type up-ds-type--light-display-m">
                    {{ totalCard.films }}
                    <span class="up-ds-type up-ds-type--light-heading-xs">titles</span>
                </div>
                <template v-slot:header-icon>{{ totalCard.films }}</template>
            </cdk-card>
            <cdk-card v-bind="sampleCard.heading">
                <div v-if="omdbLoading" class="up-ds-type up-ds-type--light-heading-xxs">Loading....</div>
                <div v-else>
                    <film-card v-for="(film, i) in omdbFilms" :key="i" :film="film" />
                </div>
            </cdk-card>
            <cdk-card v-bind="allFilmsCard.heading">
                <cdk-label-value v-bind="allFilmsCard.labelValue" />
            </cdk-card>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cdkTiles from '@uptake/cdk-vue/cdkTiles';
import cdkCard from '@uptake/cdk-vue/cdkCard';
import cdkLabelValue from '@uptake/cdk-vue/cdkLabelValue';
import FilmCard from './FilmCard.vue';

export default {
    name: 'Cards',
    components: {
        cdkTiles,
        cdkCard,
        cdkLabelValue,
        FilmCard
    },
    data() {
        return {
            tilesKey: 0
        };
    },
    computed: {
        ...mapGetters([
            'tilesConfig',
            'selectedTile',
            'totalFilmsForTile',
            'tileType',
            'omdbLoading',
            'omdbFilms'
        ]),
        tilesProps() {
            const { id: selectedId } = this.selectedTile;
            const {
                tilesConfig: config,
                tilesKey: key
            } = this;
            return {
                accordion: true,
                disableRounded: true,
                config,
                selectedId,
                key
            }
        },
        badgeColor() {
            const { titleText } = this.selectedTile;
            return isNaN(titleText) ? '#0ACD72' : '#c079ff';
        },
        totalCard() {
            const { totalFilmsForTile, badgeColor, selectedTile } = this;
            return {
                heading: {
                    headerText: selectedTile.titleText,
                    headerBadge: 'icon',
                    headerBadgeColor: badgeColor,
                    subtitleText: 'Total Films'
                },
                films: totalFilmsForTile.length
            }
        },
        allFilmsCard() {
            const { totalFilmsForTile, badgeColor } = this;
            return {
                heading: {
                    headerText: 'All Films',
                    headerBadge: 'symbol',
                    headerBadgeColor: badgeColor
                },
                labelValue: {
                    label: 'Titles',
                    value: totalFilmsForTile.map(({data}) => data.title.value).join(', '),
                    truncateValue: 2
                }
            }
        },
        sampleCard() {
            const { badgeColor } = this;
            return {
                heading: {
                    headerText: 'Random Films',
                    headerBadge: 'symbol',
                    headerBadgeColor: badgeColor
                }
            };
        }
    },
    methods: {
        getTopThreeFilms() {
            const { totalFilmsForTile } = this;
            const len = totalFilmsForTile.length;
            const arrSize = len > 3 ? 3 : len;
            const randoms = Array.from({ length: arrSize }, (e, i) => {
                const index = len > 3
                    ? Math.floor(Math.random() * len)
                    : i;
                return totalFilmsForTile[index];
            });
            const topThree = randoms.map(({ data }) => ({
                t: data.title.value.replace(/(\s)/g, '+'),
                y: data.year.value
            }));
            this.$store.dispatch('getOmdbData', topThree);
        },
        updateSelectedTile(tile) {
            this.$store.commit('updateSelectedTile', tile);
            window.dispatchEvent(new Event('resize'));
            this.getTopThreeFilms();
            
        }
    },
    mounted() {
        setTimeout(() => {
            this.tilesKey++;
            this.getTopThreeFilms();
        }, 250);
    }
};
</script>
