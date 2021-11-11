// define function to generate plotly gauge based on washing frequency from metadata
function gaugeGen(metadataValues) {
    // pull out washing frequency from sample metadata
    var wFreq = metadataValues.wfreq;

    // define values for gauge
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wFreq,
            title: { text: "Scrubs Per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis:{range: [null, 9], tickwidth: 1},
                bgcolor: "white",
                bar: { color: "grey" },
                steps: [
                    {range: [0,1], color: "black"},
                    {range: [1,2], color: "red"},
                    {range: [2,3], color: "orange"},
                    {range: [3,4], color: "yellow"},
                    {range: [4,5], color: "green"}, 
                    {range: [5,6], color: "blue"},
                    {range: [6,7], color: "indigo"},
                    {range: [7,8], color: "violet"},
                    {range: [8,9], color: "white"}
                ]
            }
        }
    ];

    // define layout values for gauge
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);

}