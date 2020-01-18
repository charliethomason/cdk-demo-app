<template>
    <span :class="classList">{{ nameInitials }}</span>
</template>

<script>
export default {
    name: 'DefaultIcon',
    props: {
        name: {
            type: String,
            default: null
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            baseClass: 'up-ds-initials-icon'
        };
    },
    computed: {
        nameInitials() {
            const splitName = this.name
                .trim()
                .replace(/(\W|_)+/g, ' ') // Remove any non-alphanumeric characters
                .split(' ');

            if (splitName.length >= 2) {
                // If name is 2 or more words, return the first letter of first 2 words
                return splitName[0].slice(0, 1) + splitName[1].slice(0, 1);
            }

            // Else return first 2 letters of name
            return this.name.trim().slice(0, 2);
        },
        classList() {
            return {
                [this.baseClass]: true,
                [`${this.baseClass}--selected`]: this.selected
            };
        }
    }
};
</script>

<style lang="scss">
$default-color: #a9bcd4;
$hover-color: #fff;
$selected-bg-color: #fff;
$selected-text-color: #165ffb;

.up-ds-initials-icon {
    align-items: center;
    background-color: transparent;
    border-color: $default-color;
    border-style: solid;
    border-width: 1px;
    border-radius: 100%;
    color: $default-color;
    display: inline-flex;
    flex-shrink: 0;
    font-size: 9px;
    font-weight: bold;
    height: 24px;
    justify-content: center;
    line-height: 1;
    margin: 0 19px 0 4px;
    text-transform: uppercase;
    width: 24px;

    &--selected {
        background-color: $selected-bg-color;
        border-color: $selected-bg-color;
        color: $selected-text-color;
    }
}

.up-ds-side-nav__button:hover,
.up-ds-side-nav__button:focus {
    .up-ds-initials-icon {
        border-color: $hover-color;
        color: $hover-color;

        &--selected {
            background-color: $selected-bg-color;
            border-color: $selected-bg-color;
            color: $selected-text-color;
        }
    }
}
</style>
