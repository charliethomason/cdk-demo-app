<template>
    <div class="demo-table-wrapper">
        <div class="demo-table-menu">
            <cdk-filters
                :filters="filters"
                @updated="updateFilters"
            />
        </div>
        <div class="demo-table-scroll" ref="tableWrap">
            <cdk-data-table
                v-bind="tableProps"
                @header-container-click="headerClick"
            />
        </div>
    </div>
</template>

<script>
import cdkDataTable from '@uptake/cdk-vue/cdkDataTable';
import cdkFilters from '@uptake/cdk-vue/cdkFilters';
import { table } from '../data/content.json';

export default {
    name: 'Table',
    components: {
        cdkDataTable,
        cdkFilters
    },
    data() {
        return {
            scrollElement: null,
            table
        };
    },
    computed: {
        filters() {
            return this.$store.state.movies.filters;
        },
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
        },
        updateFilters(filters) {
            this.$store.commit('updateFilters', filters);
        }
    },
    mounted() {
        this.scrollElement = this.$refs.tableWrap;
    }
};
</script>