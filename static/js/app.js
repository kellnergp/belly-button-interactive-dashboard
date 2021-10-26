// directly reference json location on gh pages so that d3 wont freak out about local files
const url = "https://kellnergp.github.io/interactive-web-visualizations-challenge/samples.json"

// establish variables for storing data later
var dataset;
var metadata;
var names;
var samples;

// make d3 call to JSON file then run inital setup in a subsequent function to avoid errors due to asynchronous functions
d3.json(url).then(function(data) {
    dataset = data;
    metadata = data.metadata;
    names = data.names;
    samples = data.samples;
    console.log(metadata[0]);
    console.log(samples);

    // set initial values for all panes
    function init() {
      // add options to dropdown
      var select = d3.select("select");
      for (var i = 0; i < names.length; ++i) {
          newOption = select.append("option").text(names[i]);
          newOption.attr('value', names[i]);
      }

      // since dropdown options start with the first object in the dataset, set initial values on page to match

      // store initial metadata set separately
      var initMetadata = metadata[0];

      // run metadataPanelGen function with initial data
      metadataPanelGen(initMetadata);

      // pull initial sample values into separate variable
      initSampleData = samples[0];
      console.log(initSampleData);

      // run chartGen function with initial data
      chartGen(initSampleData);
      
    }
    
    // run init function to generate initial page setup
    init();
  });

function optionChanged(newSample) {
  console.log(newSample);

  // find location of new sample within the object arrays
  var newIndex;
  for (var l=0; l<names.length; l++) {
    if (names[l] == newSample) {
      newIndex = l;
    }
  }
  console.log(newIndex);
  console.log(names[newIndex]);

  // pull the data for the new sample
  var newMetadata = metadata[newIndex];
  var newSampleData = samples[newIndex];

  console.log("Hey!", newSampleData);
  // run metadataPanelGen function with new data
  metadataPanelGen(newMetadata);

  // run chartGen function with new data
  chartGen(newSampleData);

}
// define metadata panel generation function
function metadataPanelGen(metadata) {
  // update the metadata panel
  let counter = 0;
  // remove previous metadata entries
  d3.selectAll("p").remove();
  // select the metadata panel
  var mdPanel = d3.select('div.panel-body');
  // add new metadata entries in a loop 
  for (let [key, value] of Object.entries(metadata)) {
    mdEntry = mdPanel.append("p").text(`${key}: ${value}`);
    mdEntry.attr('valNum', counter);
    counter +=1;
  }
}
  
function chartGen(sampleData) {
  // generate axis labels for bar plot
  var sampleOIDS = sampleData.otu_ids;
  var sampleAxisLabels =[];

  for (var k=0; k<sampleOIDS.length; k++) {
    sampleAxisLabels.push(`OTU ${sampleOIDS[k]}`);
  }
  console.log(sampleAxisLabels);
  // set parameters for bar chart
  var barData = [{
    type: 'bar',
    y: sampleAxisLabels.slice(0,10),
    x: sampleData.sample_values.slice(0,10),
    text: sampleData.otu_labels.slice(0,10),
    orientation: 'h',
    transforms: [{
      type: 'sort',
      target: 'x',
      order: 'ascending'
    
    }]
  }];
  // generate plot at proper location
  Plotly.newPlot('bar', barData);

  // set parameters for bubble chart
  var trace1 = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: 'markers',
    marker: {
      color: sampleData.otu_ids,  
      size: sampleData.sample_values,
      sizeref: 1.5,
      sizemode: 'diameter'
    }
  };

  var bubbleData = [trace1];
  
  // define layout for bubble chart
  var bubbleLayout = { 
    xaxis: {title: {text: 'OTU ID'}},
    showlegend: false,
    height: 500,
    width: 1000
  };
  
  // generate bubble chart at proper location
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}


