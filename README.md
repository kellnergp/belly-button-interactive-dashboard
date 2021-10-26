# interactive-web-visualizations-challenge

Dashboard Link: https://kellnergp.github.io/interactive-web-visualizations-challenge/

Constructing an interactive dashboard to display information from the Belly Button Biodiversity dataset involves three major components; an HTML template page governing the arrangement of charts and information, a Javascript detailing how to access data and design charts and other information displays, and a JSON file containing all of the data.

## JSON Data file

JSON raw link: https://github.com/kellnergp/interactive-web-visualizations-challenge/blob/main/samples.json

The JSON file contains three array objects: 'names', consisting of a list of all relevant sample IDs, 'metadata', containing an array of key-value pairs for each sample containing background information of every person sampled in the dataset, and 'samples', which contains a list of arrays for every sample with the corresponding ID, the otu_ids of every bacteria observed, otu_labels with the designations of each observed bacteria, and the sample_values of each bacteria in the sample.

## HTML Template index.html

HTML raw link: https://github.com/kellnergp/interactive-web-visualizations-challenge/blob/main/index.html

In the \<head> section, give the page an appropriate title and link to the Bootstrap stylesheet.

In the \<body> section, use Bootstrap containers to designate locations on the page for: a dropdown menu of sample options, a panel for displaying sample metadata, a Plotly horizontal bar chart, and a Plotly bubble chart.

At the end of the \<body> section include script tags with links to d3, Plotly, and the page's Javascript file, 'app.js'.

## Javascript app.js

Javascript raw link: https://github.com/kellnergp/interactive-web-visualizations-challenge/blob/main/static/js/app.js

The JS script starts by establishing the url for the 'samples.json' file mounted on Github Pages.

This url is used throughout development to avoid issues of d3.json() not allowing direct use of local JSON files in the current build of d3.  

Establish variables for the whole 'dataset', the array of 'metadata' objects, the array of 'names' objects, and the array of 'samples' objects.

Use a d3.json() function to read in the JSON file from the 'url' variable.

Using a .then(function(data) function, generate a series of operations to run only after the asynchronous d3 function has finished loading the data.

Within the .then(), first store the 'data' into the 'dataset' variable and the 'data.metadata', 'data.names', and 'data. 

