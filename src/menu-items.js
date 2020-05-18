export default {
    items: [
        {
            id: 'graphs',
            title: 'Graphs',
            type: 'group',
            icon: 'icon-navigation',
            children: [
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
                    id: 'tsne',
                    title: 'T-SNE',
                    type: 'item',
                    url: '/t-sne',
                    icon: 'feather icon-layers',
                }
            ]
        }
    ]
}