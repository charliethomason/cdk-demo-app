import Table from '../components/Table.vue';
import Cards from '../components/Cards.vue';

export default [
    { path: '/', component: Table },
    { path: '/cards', component: Cards },
    { path: '*', redirect: '/' }
];
