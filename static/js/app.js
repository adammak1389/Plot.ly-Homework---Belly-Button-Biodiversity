var jsonData;

// Use D3 fetch to read the JSON file
d3.json("samples.json").then((bbdata) => {
    jsonData = bbdata
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

    subjectmetadata (names);
    changeoptions(names[0])
//test subject dropdown
    function subjectIDs (otu_ids) {
        var dropdown = d3.select("#selDataset");
        var option;
        for (var i = 0; i < 154; i++) {
            option = dropdown.append("option");
            option.append("option").text(otu_ids[i]);
  
        }
    }
//subject metadata
    function subjectmetadata(id) {
        var demographic_info = jsonData.metadata.filter(sample_object => sample_object.id == id)[0];
        var list = d3.select("#sample-metadata");
        list.html("")
        var textEntry = Object.entries(demographic_info).forEach(function ([key, value]) {
            list.append("p").text(`${key} : ${value}`)
        });
        for (let i = 0; i < id.length; i++) {
            person = list.append("p");
            person.append(textEntry)
        };
    };
    // //metadata extraction
    // var metadata = bbdata.metadata;
    // var resultarrayMD = metadata.filter(sample_object => sample_object.id == sample);
    // var resultMD = resultarrayMD[0];
    // var demographic_information = d3.select("#sample-metadata");
    // demographic_information.html("");
    // //push metadata to demographic information display
    // Object.entries(resultMD).forEach(([key, value]) => {
    //     demographic_information.append("h6").text(`${key}: ${value}`);
    //        });
    
    function bar_chart(id) {
        var demographic_info = jsonData.samples.filter(sample_object => sample_object.id == id)[0];
        console.log(demographic_info);
        var otu_ids = demographic_info.otu_ids.map(d => `otu_id ${d}`);
        console.log(otu_ids)
        var otu_labels = demographic_info.otu_labels;
        console.log(otu_labels);
        var sample_values = demographic_info.sample_values;
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
    }


    // bubble chart
function bubble_chart(id) {
  var demographic_info = jsonData.samples.filter(sample_object => sample_object.id == id)[0];
  test = demographic_info.otu_ids;
  console.log(demographic_info);
  var otu_ids = demographic_info.otu_ids;
  var otu_labels = demographic_info.otu_labels;
  var sample_values = demographic_info.sample_values;
  var bubbleLayout = {
    title: "Bacteria Microbes by Sample",
    margin: { t: 0 },
    xaxis: { title: "OTU ID" },
    margin: { t: 30 }
  };
  var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      colorscale: "Earth",
      size: sample_values
    }
  };

  var data = [trace1];

  var layout = {
    title: 'BB Sample Bubble Chart',
    showlegend: false,
  };

  Plotly.newPlot("bubble", data, layout);
    };

//run in html
function changeoptions(id) {
    subjectmetadata(id);
    bar_chart(id);
    bubble_chart(id);
  }
});