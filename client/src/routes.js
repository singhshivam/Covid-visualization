import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const MultiLine = React.lazy(() => import('./Dashboard/MultiLine'));
const Maps = React.lazy(() => import('./Dashboard/Maps'));

const routes = [
    { path: '/multi-lines', exact: true, name: 'Multi-lines Visualization', component: MultiLine },
    { path: '/maps', exact: true, name: 'Map Visualization', component: Maps },
];

export default routes;