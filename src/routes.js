import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const MultiLine = React.lazy(() => import('./Dashboard/MultiLine'));
const Maps = React.lazy(() => import('./Dashboard/Maps'));
const TSne = React.lazy(() => import('./Dashboard/TSne'));
const RaceChart = React.lazy(() => import('./Dashboard/RaceChart'));
const Gantt = React.lazy(() => import('./Dashboard/Gantt'));
const Intro = React.lazy(() => import('./Dashboard/Intro'));
const Histogram = React.lazy(() => import('./Dashboard/Histogram'));
const PieChart = React.lazy(() => import('./Dashboard/PieChart'));
const CountryCluster = React.lazy(() => import('./Dashboard/CountryCluster'));

const routes = [
    { path: '/intro', exact: true, name: 'Introduction', component: Intro },
    { path: '/hist', exact: true, name: 'Histogram', component: Histogram },
    { path: '/multi-lines', exact: true, name: 'Multi-lines Visualization', component: MultiLine },
    { path: '/maps', exact: true, name: 'Map Visualization', component: Maps },
    { path: '/t-sne', exact: true, name: 'T-SNE Visualization', component: TSne },
    { path: '/race-chart', exact: true, name: 'Race Charts', component: RaceChart },
    { path: '/gantt', exact: true, name: 'Gantt Charts', component: Gantt },
    { path: '/pie', exact: true, name: 'Pie Charts', component: PieChart },
    { path: '/cluster', exact: true, name: 'Country-wise Clusters', component: CountryCluster },
];

export default routes;