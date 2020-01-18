<template>
    <button
        type="button"
        class="up-ds-side-nav__burger"
        :class="{'up-ds-side-nav__burger--pinned': isPinned }"
        :aria-expanded="`${isPinned}`"
        @click="burgerHandler"
    >
        <svg width="32" height="32" viewBox="0 0 32 32" class="up-ds-icon up-ds-side-nav__burger-icon">
            <path d="M7.6,10.7 C7.6,10.3134007 7.9206008,10 8.30048624,10 L23.6995138,10 C24.0863816,
                10 24.4,10.3107054 24.4,10.7 C24.4,11.0865993 24.0793992,11.4 23.6995138,11.4 L8.30048624,
                11.4 C7.91361837,11.4 7.6,11.0892946 7.6,10.7 Z M7.6,21.3 C7.6,20.9134007 7.9206008,20.6 8.30048624,
                20.6 L23.6995138,20.6 C24.0863816,20.6 24.4,20.9107054 24.4,21.3 C24.4,21.6865993 24.0793992,
                22 23.6995138,22 L8.30048624,22 C7.91361837,22 7.6,21.6892946 7.6,21.3 Z M7.6,16 C7.6,15.6134007 7.9206008,
                15.3 8.30048624,15.3 L23.6995138,15.3 C24.0863816,15.3 24.4,15.6107054 24.4,16 C24.4,16.3865993 24.0793992,
                16.7 23.6995138,16.7 L8.30048624,16.7 C7.91361837,16.7 7.6,16.3892946 7.6,16 Z"
            />
        </svg>
        <span class="up-ds-sr-only">{{ toggleButton }}</span>
    </button>
</template>

<script>
export default {
    name: 'Hamburger',
    props: {
        toggleButton: {
            type: String,
            default: 'Toggle Menu'
        },
        isPinned: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        burgerHandler() {
            this.$emit('burger-click');
        }
    }
};
</script>
