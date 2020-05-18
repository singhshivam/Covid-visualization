import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const MultiLine = React.lazy(() => import('./Dashboard/MultiLine'));
const Maps = React.lazy(() => import('./Dashboard/Maps'));
const TSne = React.lazy(() => import('./Dashboard/TSne'));
const RaceChart = React.lazy(() => import('./Dashboard/RaceChart'));

const routes = [
    { path: '/multi-lines', exact: true, name: 'Multi-lines Visualization', component: MultiLine },
    { path: '/maps', exact: true, name: 'Map Visualization', component: Maps },
    { path: '/t-sne', exact: true, name: 'T-SNE Visualization', component: TSne },
    { path: '/race-chart', exact: true, name: 'Race Charts', component: RaceChart },
];

export default routes;