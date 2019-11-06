import Vue from 'vue';
import Page from './components/Page.vue';

import '@uptake/cdk-vue/design-system.css';
import './styles/main.scss';

new Vue({
    el: '#app',
    render: c => c(Page)
});
