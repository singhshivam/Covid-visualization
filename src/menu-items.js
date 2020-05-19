export default {
    items: [
        {
            id: 'graphs',
            title: 'Graphs',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'intro',
                    title: 'Introduction',
                    type: 'item',
                    url: '/intro',
                    icon: 'feather icon-book',
                },
                {
                    id: 'histogram',
                    title: 'Bar Charts',
                    type: 'item',
                    url: '/hist',
                    icon: 'feather icon-bar-chart-2',

                },
                {
                    id: 'pie',
                    title: 'Pie Charts',
                    type: 'item',
                    url: '/pie',
                    icon: 'feather icon-pie-chart',

                },
                {
                    id: 'race-bar',
                    title: 'Race Bar',
                    type: 'item',
                    url: '/race-chart',
                    icon: 'feather icon-bar-chart',
                },
                {
                    id: 'multi-line',
                    title: 'Multi-lines',
                    type: 'item',
                    url: '/multi-lines',
                    icon: 'feather icon-trending-up',
                },
                {
                    id: 'maps',
                    title: 'Maps',
                    type: 'item',
                    url: '/maps',
                    icon: 'feather icon-map',
                },
                {
                    id: 'gantt',
                    title: 'Gantt Chart',
                    type: 'item',
                    url: '/gantt',
                    icon: 'feather icon-list',
                },
                {
                    id: 'cluster',
                    title: 'Country-wise Cluster',
                    type: 'item',
                    url: '/cluster',
                    icon: 'feather icon-map-pin',

                },
                {
                    id: 'tsne',
                    title: 'T-SNE',
                    type: 'item',
                    url: '/t-sne',
                    icon: 'feather icon-layers',
                },
            ]
        }
    ]
}