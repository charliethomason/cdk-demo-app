<template>
    <div
        class="up-ds-side-nav"
        :class="{ 'up-ds-side-nav--collapsed': !pinnedState, 'up-ds-side-nav--shown': hovered }"
        @mouseover="mouseHandler(true)"
        @mouseleave="mouseHandler(false)"
    >
        <div class="up-ds-side-nav__header">
            <hamburger :toggle-button="toggleButton" :is-pinned="pinnedState" @burger-click="burgerClick" />
        </div>
        <div class="up-ds-side-nav__menu-wrapper">
            <menu-list :menus="menus" @button-click="buttonClick" />
        </div>
    </div>
</template>


<script>
import Hamburger from './components/Hamburger.vue';
import MenuList from './components/MenuList.vue';

export default {
    name: 'CdkSideNav',
    components: {
        Hamburger,
        MenuList
    },
    props: {
        initialItems: {
            type: Array,
            default: null,
            required: true
        },
        isPinned: {
            type: Boolean,
            default: true
        },
        currentPath: {
            type: String,
            default: ''
        },
        toggleButton: {
            type: String,
            default: 'Toggle Menu'
        }
    },
    data() {
        return {
            menus: [],
            pinnedState: true,
            hovered: false
        };
    },
    created() {
        this.pinnedState = this.isPinned;
    },
    methods: {
        buttonClick(menu) {
            menu.isOpen = !menu.isOpen;
            this.$emit('button-click', menu);
        },
        burgerClick() {
            this.pinnedState = !this.pinnedState;
            this.hovered = false;
            this.$emit('update-pinned', this.pinnedState);
        },
        mouseHandler(hovered) {
            if (!this.pinnedState) {
                this.hovered = hovered;
            }
        },
        highlightCurrentPath() {
            const findCurrentPath = (items, parent = null, primaryParent = null) => {
                items.forEach(item => {
                    const primaryItem = !primaryParent ? item : primaryParent;
                    if (item.url) {
                        this.setLinkSelected(item, parent, primaryItem);
                    } else if (item.children) {
                        if (item.isOpen === undefined) {
                            this.$set(item, 'isOpen', false);
                        }
                        findCurrentPath(item.children, item, primaryItem);
                    }
                });
            };
            findCurrentPath(this.menus);
        },
        setLinkSelected(item, parent = null, primaryItem = null) {
            if (item.children) {
                throw new Error(
                    'Nav item cannot be a link and have children'
                );
            } else if (this.checkPath(item.url)) {
                this.$set(item, 'selected', true);
                if (parent) {
                    this.$set(parent, 'isOpen', true);
                }
                if (primaryItem) {
                    this.updateSelectedPrimary(primaryItem);
                }
            } else if (item.selected) {
                this.$delete(item, 'selected');
                if (parent) {
                    this.$delete(parent, 'isOpen');
                }
            }
        },
        updateSelectedPrimary(primary) {
            this.menus.forEach(item => {
                if (item.children) {
                    if (item.name === primary.name) {
                        this.$set(item, 'selected', true);
                        this.$set(item, 'isOpen', true);
                    } else if (item.selected || item.isOpen) {
                        this.$delete(item, 'selected');
                        this.$delete(item, 'isOpen');
                    }
                }
            });
        },
        checkPath(href = '/href') {
            const decodedPath = decodeURIComponent(this.currentPath);
            const decodedHref = decodeURIComponent(href);
            const pathParams = decodedPath.split('/');
            const hrefParams = decodedHref.split('/');

            const hasMatch = hrefParams
                .reduce(
                    (isMatch, param, index) => isMatch && pathParams[index] === hrefParams[index], true
                );

            return hasMatch;
        }
    },
    mounted() {
        this.menus = this.initialItems;
        this.highlightCurrentPath();
    },
    watch: {
        initialItems(newVal) {
            this.menus = newVal;
            this.highlightCurrentPath();
        },
        isPinned(newVal) {
            this.pinnedState = newVal;
        },
        currentPath() {
            this.highlightCurrentPath();
        }
    }
};
</script>
