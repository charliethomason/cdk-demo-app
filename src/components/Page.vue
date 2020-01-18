<template>
    <main>
        <cdk-global-header class="demo-header" v-bind="headerProps" />
        <div class="demo-wrapper">
            <cdk-side-nav
                v-bind="sideNavProps"
                @update-pinned="updatePinned"
            />
            <div :class="contentClass">
                <router-view />
            </div>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex';
import cdkGlobalHeader from '@uptake/cdk-vue/cdkGlobalHeader';

import CdkSideNav from './SideNav/CdkSideNav.vue';

import { header, sideNav } from '../data/content.json';

export default {
    name: 'Page',
    components: {
        cdkGlobalHeader,
        CdkSideNav
    },
    data() {
        return {
            header,
            sideNav
        };
    },
    computed: {
        ...mapState([ 'isPinned' ]),
        headerProps() {
            const {
                productName,
                appSwitcherHeader,
                appSwitcherItems
            } = this.header;
            return {
                headerLink: '#/',
                productName,
                appSwitcherHeader,
                appSwitcherItems
            };
        },
        sideNavProps() {
            const {
                initialItems
            } = this.sideNav;
            const {
                isPinned
            } = this;
            return {
                currentPath: this.$route.path,
                initialItems,
                isPinned
            };
        },
        contentClass() {
            return {
                'demo-content': true,
                'demo-content--pinned': this.isPinned
            }
        }
    },
    methods: {
        getMovies() {
            this.$store.dispatch('fetchData');
        },
        updatePinned(isPinned) {
            this.$store.commit('updatePinned', isPinned);
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 250);
        }
    },
    mounted() {
        this.getMovies();
    }
};
</script>
