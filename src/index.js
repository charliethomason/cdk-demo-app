import Vue from 'vue';
import store from './store';
import Page from './components/Page.vue';

import '@uptake/cdk-vue/design-system.css';
import './styles/main.scss';

new Vue({
    el: '#app',
    store,
    render: c => c(Page)
});
