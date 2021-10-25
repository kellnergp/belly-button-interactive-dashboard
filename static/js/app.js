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
        var mdPanel = d3.select('div.panel-body');
        
        var mdValues = metadata[0];
        for (let [key, value] of Object.entries(mdValues)) {
            mdEntry = mdPanel.append("p").text(`${key}: ${value}`);
        } 

        console.log(mdPanel);
        console.log(mdValues);
    }
    
    var select = d3.select("select");
    for (var i = 0; i < names.length; ++i) {
        newOption = select.append("option").text(names[i]);
        newOption.attr('value', names[i]);
    }
    
    init();
  });


  



