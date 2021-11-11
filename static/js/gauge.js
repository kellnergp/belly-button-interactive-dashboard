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
            mode: "gauge+number"
        }
    ];

    // define layout values for gauge
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);

}