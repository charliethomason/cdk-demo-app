<template>
    <a
        v-if="isExternalLink"
        :href="menu.url"
        :class="buttonClass"
        target="_blank"
        @click="clickHandler"
    >
        <img
            v-if="menu.iconPath && isPrimary"
            :src="menu.iconPath"
            class="up-ds-icon up-ds-side-nav__button-icon"
        >
        <default-icon
            v-else-if="isPrimary"
            :name="menu.name"
            :selected="menu.selected"
        />
        <span v-if="menu.name" class="up-ds-side-nav__button-text up-ds-link--external">{{ menu.name }}</span>
    </a>
    <router-link
        v-else-if="menu.url"
        :to="menu.url"
        :class="buttonClass"
        @click="clickHandler"
    >
        <img
            v-if="menu.iconPath && isPrimary"
            :src="menu.iconPath"
            class="up-ds-icon up-ds-side-nav__button-icon"
        >
        <default-icon
            v-else-if="isPrimary"
            :name="menu.name"
            :selected="menu.selected"
        />
        <span v-if="menu.name" class="up-ds-side-nav__button-text">{{ menu.name }}</span>
    </router-link>
    <button
        v-else
        type="button"
        :class="buttonClass"
        :aria-expanded="`${isOpen(menu)}`"
        @click="clickHandler"
    >
        <img
            v-if="menu.iconPath && isPrimary"
            :src="menu.iconPath"
            class="up-ds-icon up-ds-side-nav__button-icon"
        >
        <default-icon
            v-else-if="isPrimary"
            :name="menu.name"
            :selected="menu.selected"
        />
        <span v-if="menu.name" class="up-ds-side-nav__button-text">{{ menu.name }}</span>
        <caret-icon v-if="menu.children && menu.children.length > 0" />
    </button>
</template>

<script>
import CaretIcon from '../assets/caret.vue';
import DefaultIcon from './DefaultIcon.vue';

export default {
    name: 'MenuButton',
    components: {
        CaretIcon,
        DefaultIcon
    },
    props: {
        menu: {
            type: Object,
            default: null
        },
        level: {
            type: String,
            default: 'primary'
        }
    },
    computed: {
        buttonClass() {
            const baseClass = 'up-ds-side-nav__button';

            return {
                [baseClass]: true,
                [`${baseClass}--${this.level}`]: true,
                [`${baseClass}--selected`]: !!this.menu.selected
            };
        },
        isExternalLink() {
            return (/https?:\/\/.*/).test(this.menu.url);
        },
        isPrimary() {
            return this.level === 'primary';
        }
    },
    methods: {
        clickHandler() {
            this.$emit('button-click', this.menu);
        },
        isOpen(menu) {
            if (menu.isOpen === undefined) {
                return false;
            }

            return menu.isOpen;
        }
    }
};
</script>

<style lang="scss">
.up-ds-side-nav__button {
    &:hover,
    &:focus,
    &.up-ds-side-nav__button--selected {
        .up-ds-side-nav__button-icon {
            filter: brightness(100);
        }
    }
}
</style>
