<template>
    <ul class="up-ds-side-nav__menu" :class="levelClass">
        <li
            v-for="(menu, i) in menus"
            :key="`${level}-${i}`"
            :class="getListClasses(menu)"
        >
            <menu-button
                :menu="menu"
                :level="levelName"
                @button-click="buttonClick"
            />
            <menu-list
                v-if="hasChildren(menu)"
                :menus="menu.children"
                :level="level+1"
                @button-click="buttonClick"
            />
        </li>
    </ul>
</template>

<script>
import MenuButton from './MenuButton.vue';

const menuLevels = [
    'primary',
    'secondary',
    'tertiary'
];

export default {
    name: 'MenuList',
    components: {
        MenuButton
    },
    props: {
        menus: {
            type: Array,
            default: null
        },
        level: {
            type: Number,
            default: 0
        }
    },
    computed: {
        levelName() {
            return menuLevels[this.level];
        },
        levelClass() {
            return `up-ds-side-nav__menu--${this.levelName}`;
        }
    },
    methods: {
        hasChildren(menu) {
            return menu.children && menu.children.length > 0;
        },
        getListClasses(menu) {
            const baseClass = 'up-ds-side-nav__menu-item';

            return {
                [baseClass]: true,
                [`${baseClass}--has-expand`]: this.hasChildren(menu),
                [`${baseClass}--open`]: !!menu.isOpen
            };
        },
        buttonClick(menu) {
            this.$emit('button-click', menu);
        }
    }
};
</script>
