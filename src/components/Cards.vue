<template>
    <div class="demo-cards-wrapper">
        <cdk-tiles
            v-bind="tilesProps"
            @tile-click="updateSelectedTile"
        />
        <div class="demo-cards-content">
            <cdk-card v-bind="totalCard.heading">
                <div class="up-ds-type up-ds-type--light-display-m">
                    {{ totalCard.films.length }}
                    <span class="up-ds-type up-ds-type--light-heading-xs">films</span>
                </div>
                <template v-slot:header-icon>{{ totalCard.films.length }}</template>
            </cdk-card>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cdkTiles from '@uptake/cdk-vue/cdkTiles';
import cdkCard from '@uptake/cdk-vue/cdkCard';

export default {
    name: 'Cards',
    components: {
        cdkTiles,
        cdkCard
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
            'totalFilmsForTile'
        ]),
        tilesProps() {
            const {
                tilesConfig: config,
                selectedTile: selectedId,
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
        totalCard() {
            const { totalFilmsForTile } = this;
            const { selectedTile } = this.$store.state;
            return {
                heading: {
                    headerText: selectedTile.titleText,
                    headerBadge: 'icon',
                    headerBadgeColor: isNaN(selectedTile.titleText)
                        ? '#0ACD72'
                        : '#c079ff',
                    subtitleText: 'Total Films'
                },
                films: totalFilmsForTile
            }
        }
    },
    methods: {
        updateSelectedTile(tile) {
            this.$store.commit('updateSelectedTile', tile);
        }
    },
    mounted() {
        setTimeout(() => {
            this.tilesKey++;
        }, 250);
    }
};
</script>
