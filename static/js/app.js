const url = "https://kellnergp.github.io/interactive-web-visualizations-challenge/samples.json"

var dataset;
var metadata;
var names;
var samples;

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
        // select the demographic info panel
        var mdPanel = d3.select('div.panel-body');
        //store first set of metadata separately
        var mdValues = metadata[0];
        // create counter for panel entries
        let valNum = 0;
        // iterate through metadata object and append paragraph tags with each k:v pair displayed
        for (let [key, value] of Object.entries(mdValues)) {
            mdEntry = mdPanel.append("p").text(`${key}: ${value}`);
            mdEntry.attr('valNum', valNum);
            valNum +=1;
        } 
        let mdZero = d3.selectAll("p[valNum='0']");
        console.log(mdZero);
        // pull initial sample values into separate variable
        initSample = samples[0];
        console.log(initSample);

        // set paramenters for initial bubble chart
        var trace1 = {
            x: initSample.otu_ids,
            y: initSample.sample_values,
            text: initSample.otu_labels,
            mode: 'markers',
            marker: {
              color: initSample.otu_ids,  
              size: initSample.sample_values,
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
          // push bubble chart to designated div tag
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // generate axis labels for bar plot
        var initSampleOIDS = initSample.otu_ids;
        var initSampleAxisLabels =[];

        for (var k=0; k<initSampleOIDS.length; k++) {
          initSampleAxisLabels.push(`OTU ${initSampleOIDS[k]}`);
        }
        console.log(initSampleAxisLabels);
        // set parameters for inital bar chart
        var barData = [{
          type: 'bar',
          y: initSampleAxisLabels.slice(0,10),
          x: initSample.sample_values.slice(0,10),
          text: initSample.otu_labels.slice(0,10),
          orientation: 'h',
          transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending'
          
          }]
        }];
        
        Plotly.newPlot('bar', barData);
    }
    
    
    
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

  // update the metadata panel
  let counter = 0;
  // remove previous metadata entries
  d3.selectAll("p").remove();
  // select the metadata panel
  var mdPanel = d3.select('div.panel-body');
  // add new metadata entries in a loop 
  for (let [key, value] of Object.entries(newMetadata)) {
    mdEntry = mdPanel.append("p").text(`${key}: ${value}`);
    mdEntry.attr('valNum', counter);
    counter +=1;
  }

  // set new parameters for bubble chart
  var trace1 = {
    x: newSampleData.otu_ids,
    y: newSampleData.sample_values,
    text: newSampleData.otu_labels,
    mode: 'markers',
    marker: {
      color: newSampleData.otu_ids,  
      size: newSampleData.sample_values,
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
  
  // restyle bubble chart with new values
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  // set parameters for new bar chart
  // generate axis labels for bar plot
  var newSampleOIDS = newSampleData.otu_ids;
  var newSampleAxisLabels =[];

  for (var k=0; k<newSampleOIDS.length; k++) {
    newSampleAxisLabels.push(`OTU ${newSampleOIDS[k]}`);
  }
  console.log(newSampleAxisLabels);
  // set parameters for inital bar chart
  var barData = [{
    type: 'bar',
    y: newSampleAxisLabels.slice(0,10),
    x: newSampleData.sample_values.slice(0,10),
    text: newSampleData.otu_labels.slice(0,10),
    orientation: 'h',
    transforms: [{
      type: 'sort',
      target: 'x',
      order: 'ascending'
    
    }]
  }];
  
  Plotly.newPlot('bar', barData);
}

  



