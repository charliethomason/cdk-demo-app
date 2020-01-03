<template>
    <div class="demo-table-wrapper">
        <div class="demo-table-menu">
            <cdk-filters
                :filters="filters"
                @updated="updateFilters"
            />
            <cdk-pagination
                v-bind="pagination"
                @page="updatePagination"
            />
        </div>
        <div class="demo-table-scroll" ref="tableWrap">
            <cdk-data-table
                v-bind="tableProps"
                @header-container-click="headerClick"
                @no-results-click="refreshTable"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cdkDataTable from '@uptake/cdk-vue/cdkDataTable';
import cdkFilters from '@uptake/cdk-vue/cdkFilters';
import cdkPagination from '@uptake/cdk-vue/cdkPagination';
import { table } from '../data/content.json';

export default {
    name: 'Table',
    components: {
        cdkDataTable,
        cdkFilters,
        cdkPagination
    },
    data() {
        return {
            scrollElement: null,
            table
        };
    },
    computed: {
        ...mapGetters([
            'filters',
            'totalRows',
            'rowSize',
            'page'
        ]),
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
        },
        pagination() {
            const {
                totalRows,
                rowSize,
                page
            } = this;
            return {
                zeroIndex: true,
                total: totalRows,
                limit: rowSize,
                page
            };
        }
    },
    methods: {
        headerClick(sortMethods) {
            this.$store.commit('updateMovieSort', sortMethods);
        },
        updateFilters(filters) {
            this.$store.commit('updatePagination', {
                limit: this.rowSize,
                page: {
                    index: 0,
                    label: 1
                }
            });
            this.$store.commit('updateFilters', filters);
        },
        updatePagination(page) {
            this.$store.commit('updatePagination', page);
        },
        refreshTable() {
            window.location.reload(false);
        }
    },
    mounted() {
        this.scrollElement = this.$refs.tableWrap;
    }
};
</script>