import Vue from 'vue';
import store from './store';
import router from './router';
import Page from './components/Page.vue';

import '@uptake/cdk-vue/design-system.css';
import './styles/main.scss';

new Vue({
    el: '#app',
    store,
    router,
    render: c => c(Page)
});
