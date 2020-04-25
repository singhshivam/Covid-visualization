# Covid-visualization


## Quick Start

``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Graphs to add
G1:
```
name: "Total confirmed deaths: how rapidly have they increased compared to other countries?"
type: multi-line plots
data: https://drive.google.com/open?id=174YFWu2pdnY2_fkqqcRa_TUXOyJakYxR
data-source: https://ourworldindata.org/coronavirus 
implementation-reference: https://ourworldindata.org/coronavirus#total-confirmed-deaths-how-rapidly-have-they-increased-compared-to-other-countries
```

G2:
```
name: "Daily confirmed deaths: are we bending the curve?"
type: multi-line plots
data: https://drive.google.com/open?id=1OIk4NunCIBn3zbmwCqRY24LdUiocC9aC
data-source: https://drive.google.com/open?id=1OIk4NunCIBn3zbmwCqRY24LdUiocC9aC
implementation-reference: https://ourworldindata.org/coronavirus#daily-confirmed-deaths-are-we-bending-the-curve
```

G3:
```
name: "World maps: Confirmed cases relative to the size of the population"
type: map
data: https://drive.google.com/open?id=1W4bo5pXq-DyL7h6G0Op-Dq5V8Odb1zSz
data-source: https://ourworldindata.org/coronavirus#world-maps-confirmed-cases-relative-to-the-size-of-the-population
implementation-reference: https://ourworldindata.org/coronavirus#world-maps-confirmed-cases-relative-to-the-size-of-the-population
```

G4:
```
name: "What is the total number of confirmed deaths?"
type: map
data: https://drive.google.com/open?id=1Sm5fqHT4WfkMW5kUkNrVKZRAUGNflPfF
data-source: https://ourworldindata.org/coronavirus#what-is-the-total-number-of-confirmed-deaths
implementation-reference: https://ourworldindata.org/coronavirus#what-is-the-total-number-of-confirmed-deaths
```

G6:
```
	name: "Epidemic Span"
	type: gantt-chart
	data:
	data-source:
	implementation-reference: ['https://www.kaggle.com/imdevskp/covid-19-analysis-visualization-comparisons', 'http://bl.ocks.org/lorenzopub/d5e7389adc5abba111d849e357df2d00']
```

G7:
```
	name: "Litrature Clustering"
	type: k-mean clustering
	data:
	data-source:
	implementation-reference: 'https://maksimekin.github.io/COVID19-Literature-Clustering/plots/t-sne_covid-19_interactive.html'
```
