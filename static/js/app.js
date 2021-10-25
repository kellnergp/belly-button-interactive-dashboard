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
    console.log(metadata, names);
    console.log(samples);
    
    var select = d3.select("select");
    for (var i = 0; i < names.length; ++i) {
        newOption = select.append("option").text(names[i]);
        newOption.attr('value', names[i]);
    }
    

  });
  



