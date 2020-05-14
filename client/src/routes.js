import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const MultiLine = React.lazy(() => import('./Dashboard/MultiLine'));

const routes = [
    { path: '/multi-lines', exact: true, name: 'Covid-19 Home', component: MultiLine },
];

export default routes;