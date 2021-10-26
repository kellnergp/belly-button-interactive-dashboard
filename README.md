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

Define the \<select> element of the dropdown such that when the option changes, the new value is sent to the optionChanged() function in the 'app.js' script.

At the end of the \<body> section include script tags with links to d3, Plotly, and the page's Javascript file, 'app.js'.

## Javascript app.js

Javascript raw link: https://github.com/kellnergp/interactive-web-visualizations-challenge/blob/main/static/js/app.js

### App Functions

#### metadataPanelGen(metadata) Function

This function accepts the metadata object for one sample and renders the metadata key-value pairs in the metadata panel on the dashboard.

It first sets a variable 'counter' to 0 so that it can be used later.

Next, it calls a d3.selectAll() function to find all \<p> elements in the HTML and remove them.

Then it uses d3.select('div.panel-body') to store the location of the metadata panel body.

A for loop iterating through every \[key, value] pair in the 'metadata' input, appends a \<p> child element to the 'panel-body' \<div> with a text of the key-value pair.  

It also gives the \<p> a 'valNum' attribute with a value of counter, then adds one to the counter value.

#### chartGen(sampleData) Function

This function accepts the sample data object for one sample and generates the bar chart and bubble chart for the dashboard.

The first section of the function concerns generating the horizontal bar chart of the top 10 otu_ids for the sample.

#### init() Function

This function sets the initial version of the dashboard with the data from the first sample in the lists, sample 940.

The JS script starts by establishing the url for the 'samples.json' file mounted on Github Pages.

This url is used throughout development to avoid issues of d3.json() not allowing direct use of local JSON files in the current build of d3.  

Establish variables for the whole 'dataset', the array of 'metadata' objects, the array of 'names' objects, and the array of 'samples' objects.

Use a d3.json() function to read in the JSON file from the 'url' variable.

Using a .then(function(data) function, generate a series of operations to run only after the asynchronous d3 function has finished loading the data.

Within the .then(), first store the 'data' into the 'dataset' variable and the 'data.metadata', 'data.names', and 'data.samples' into the corresponding variables. 

Next, 
