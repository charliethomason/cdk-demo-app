<template>
    <div class="demo-cards-wrapper">
        <cdk-tiles
            v-bind="tilesProps"
            @tile-click="updateSelectedTile"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cdkTiles from '@uptake/cdk-vue/cdkTiles';

export default {
    name: 'Cards',
    components: {
        cdkTiles
    },
    data() {
        return {
            tilesKey: 0
        };
    },
    computed: {
        ...mapGetters([
            'tilesConfig',
            'selectedTile'
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
        }
    },
    methods: {
        updateSelectedTile(tile) {
            this.$store.commit('updateSelectedTile', tile.id);
        }
    },
    mounted() {
        setTimeout(() => {
            this.tilesKey++;
        }, 250);
    }
};
</script>
