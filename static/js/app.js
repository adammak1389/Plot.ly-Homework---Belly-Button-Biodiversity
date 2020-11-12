

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((bbdata) => {

    // array
//    var labels = Object.values(bbdata.names);
//    var sampleSelect = d3.select("#selDataset");
//    d3.selectAll("#selDataset").on("change", getData);

    // test subject dropdown
// function ids (labels) {
//    let dropdown = d3.select("#selDataset");
//    let option;
//    for (let i = 0; i < 154; i++) {
//      option = dropdown.append("option");
//      option.append("option").text(labels[i]);
  
//    });

    //extract relevant data sets
    var samples = bbdata.samples;
    console.log(samples);
    var names = bbdata.names;
    console.log(names)
    var sample = names[0]
    var resultArray = samples.filter(sample_object => sample_object.id == sample);
    console.log(resultArray);
    var sampleresult = resultArray;
    console.log(sampleresult);   
    var ids = samples.map(d => d.id);
    console.log(ids)
    var demographic_info = jsonData.metadata;
    console.log(demographic_info);

    subjectIDs (names);
//test subject dropdown
    function subjectIDs (otu_ids) {
        let dropdown = d3.select("#selDataset");
        let option;
        for (let i = 0; i < 154; i++) {
            option = dropdown.append("option");
            option.append("option").text(otu_ids[i]);
  
        }
    }
    //metadata extraction
    var metadata = bbdata.metadata;
    var resultarrayMD = metadata.filter(sample_object => sample_object.id == sample);
    var resultMD = resultarrayMD[0];
    var demographic_information = d3.select("#sample-metadata");
    demographic_information.html("");
    //push metadata to demographic information display
    Object.entries(resultMD).forEach(([key, value]) => {
        demographic_information.append("h6").text(`${key}: ${value}`);
           });
    
    function bar_chart(id) {
        var demoInfo = jsonData.samples.filter(sample_object => sample_object.id == id)[0];
        console.log(demoInfo);
        var otu_ids = demoInfo.otu_ids.map(d => `otu_id ${d}`);
        console.log(otu_ids)
        var otu_labels = demoInfo.otu_labels;
        console.log(otu_labels);
        var sample_values = demoInfo.sample_values;
        console.log(sample_values);


    //slice data for bar chart
    var sample_values_slice = sample_values.slice(0, 10).reverse();
    var otu_ids_slice = otu_ids.slice(0, 10).reverse();
    var otu_labels_slice = otu_labels.slice(0, 10).reverse();

    // bar chart
    var trace1 = {
        x: sample_values_slice,
        y: `OTU ${otu_ids_slice}`,
        text: otu_labels_slice,
        type: "bar",
        orientation: "h"
      };
    
      var bar_chart_data = [trace1];

      var bar_chart_layout = {
        title: "Top 10 OTUs"
      };
    
      Plotly.newPlot("bar", bar_chart_data, bar_chart_layout);

    // bubble chart
    var trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          text: otu_labels 
        }
      };
      
      var bubble_chart_data = [trace2];

      var bubble_chart_layout = {
        
        margin: {
          l: 50,
          r: 50,
          t: 50,
          b: 50
        }
      };
    
      Plotly.newPlot("bubble", bubble_chart_data, bubble_chart_layout);
});