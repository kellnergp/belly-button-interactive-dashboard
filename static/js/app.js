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
        // pull inital sample values into separate variable
        initSample = samples[0];
        console.log(initSample);

        // set paramenters for bubble chart
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
          // define layout for chart
          var bubbleLayout = { 
            xaxis: {title: {text: 'OTU ID'}},
            showlegend: false,
            height: 500,
            width: 1000
          };
          // push bubble chart to designated div tag
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    }
    
    var select = d3.select("select");
    for (var i = 0; i < names.length; ++i) {
        newOption = select.append("option").text(names[i]);
        newOption.attr('value', names[i]);
    }
    
    init();
  });


  



