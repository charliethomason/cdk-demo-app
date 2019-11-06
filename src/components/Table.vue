<template>
    <div class="demo-table-wrapper" ref="tableWrap">
        <cdk-data-table
            v-bind="tableProps"
            @header-container-click="headerClick"
        />
    </div>
</template>

<script>
import cdkDataTable from '@uptake/cdk-vue/cdkDataTable';
import { table } from '../data/content.json';

export default {
    name: 'Table',
    components: {
        cdkDataTable
    },
    data() {
        return {
            scrollElement: null,
            table
        };
    },
    computed: {
        tableProps() {
            const { headers } = this.$store.state.movies;
            const { movieRows: rows } = this.$store.getters;
            const { scrollElement } = this;
            return {
                headers,
                rows,
                scrollElement,
                ...this.table
            };
        }
    },
    methods: {
        headerClick(sortMethods) {
            this.$store.commit('updateMovieSort', sortMethods);
        }
    },
    mounted() {
        this.scrollElement = this.$refs.tableWrap;
    }
};
</script>