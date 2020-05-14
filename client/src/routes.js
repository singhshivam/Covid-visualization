import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Dashboard/Default'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Covid-19 Home', component: DashboardDefault },
];

export default routes;