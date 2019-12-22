<template>
    <div class="demo-table-wrapper">
        <div class="demo-table-menu">
            <cdk-filters
                :filters="filters"
                @updated="updateFilters"
            />
            <cdk-picklist-field
                v-bind="picklist"
                @input="updateRows"
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
import cdkPicklistField from '@uptake/cdk-vue/cdkPicklistField';
import { table } from '../data/content.json';

export default {
    name: 'Table',
    components: {
        cdkDataTable,
        cdkFilters,
        cdkPicklistField
    },
    data() {
        return {
            picklistLabel: "Rows",
            picklistOptions: [
                { id: 20, label: '20', value: 20 },
                { id: 50, label: '50', value: 50 },
                { id: 100, label: '100', value: 100 },
                { id: 200, label: 'All', value: null }
            ],
            picklistValue: [{ id: 20, label: '20', value: 20 }],
            scrollElement: null,
            table
        };
    },
    computed: {
        filters() {
            return this.$store.state.movies.filters;
        },
        picklist() {
            const {
                picklistLabel: label,
                picklistValue: value,
                picklistOptions
            } = this;
            return {
                micro: true,
                singleSelect: true,
                horizontal: true,
                label,
                picklistOptions,
                value
            };
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
        },
        updateRows(rows) {
            this.$store.commit('updateRows', rows[0].value);
        }
    },
    mounted() {
        this.scrollElement = this.$refs.tableWrap;
    }
};
</script>