<template>
    <main>
        <cdk-global-header v-bind="headerProps" />
        <div class="demo-wrapper">
            <cdk-side-nav v-bind="sideNavProps" />
            <div class="demo-content">
                <router-view />
            </div>
        </div>
    </main>
</template>

<script>
import cdkGlobalHeader from '@uptake/cdk-vue/cdkGlobalHeader';
import cdkSideNav from '@uptake/cdk-vue/cdkSideNav';

import { header, sideNav } from '../data/content.json';

export default {
    name: 'Page',
    components: {
        cdkGlobalHeader,
        cdkSideNav
    },
    data() {
        return {
            header,
            sideNav
        };
    },
    computed: {
        headerProps() {
            const {
                productName,
                appSwitcherHeader,
                appSwitcherItems
            } = this.header;
            return {
                productName,
                appSwitcherHeader,
                appSwitcherItems
            };
        },
        sideNavProps() {
            const {
                initialItems
            } = this.sideNav;
            return {
                currentPath: `/#${this.$route.path}`,
                initialItems
            };
        }
    },
    methods: {
        getMovies() {
            this.$store.dispatch('fetchData');
        }
    },
    mounted() {
        this.getMovies();
    }
};
</script>
