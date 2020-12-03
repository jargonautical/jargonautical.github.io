// WHERE"S THE DATA?
var filepath = "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/845345/File_7_-_All_IoD2019_Scores__Ranks__Deciles_and_Population_Denominators_3.csv"

// READ IN THE DATA
d3.csv(filepath).then(function(data) {
  // filter out unneeded districts
  districts = ["East Devon", "Exeter", "Mid Devon", "North Devon", "South Hams", "Teignbridge", "Torridge", "West Devon", "Torbay", "Plymouth"];
  var isDevon = data.filter(function(row, i){
    return districts.indexOf(row['Local Authority District name (2019)']) >= 0
  });
  // unpack the data
  function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }
    var district = unpack(isDevon, 'Local Authority District name (2019)'),
        decile = unpack(isDevon, 'Index of Multiple Deprivation (IMD) Decile (where 1 is most deprived 10% of LSOAs)'),
        listofDistricts = [],
        listofDeciles = [];
    for (var i = 0; i < district.length; i++ ){
        if (listofDistricts.indexOf(district[i]) === -1 ){
            listofDistricts.push(district[i]);
        }
    }
    for (var i = 0; i < decile.length; i++ ){
        if (listofDeciles.indexOf(decile[i]) === -1 ){
            listofDeciles.push(decile[i]);
        }
    }
    groupBy = ['Local Authority District name (2019)', 'Index of Multiple Deprivation (IMD) Decile (where 1 is most deprived 10% of LSOAs)'],
    grouped = [];
    isDevon.forEach(function (a) {
      var key = groupBy.map(function (k) { return a[k]; }).join('|');
      if (!this[key]) {
        this[key] = { dis: a['Local Authority District name (2019)'], num: 0, dec: a['Index of Multiple Deprivation (IMD) Decile (where 1 is most deprived 10% of LSOAs)'] };
        grouped.push(this[key]);
      }
      this[key].num += 1;
    }, Object.create(null));
    var district = unpack(grouped, 'dis'),
    decile = unpack(grouped, 'dec'),
    count = unpack(grouped, 'num');
    // define chart data
    var imddata = [{
      type: 'scatter',
      showlegend: false,
      x: district,
      y: decile,
      hoverinfo: 'skip',
      mode: 'markers',
      text: decile,
      marker: {
        color: '#42DBB7',
        opacity: 0.4,
        size: count,
        sizemode: 'area',
        sizeref: 0.03,
        sizemax: 100,
      },
      /*
      hovertemplate:
      "<i>District</i>: %{x}</br>" +
      "<i>Decile</i>: %{text}<br>" +
      "<i>Count of LSOAs</i>: %{marker.size:.0}<br>" +
      "<extra></extra>",
      */
      transforms: [{
        type: 'groupby',
        groups: district
      }]
    }]
    var layout = [{
      autosize: false,
      width: 500,
      height: 500
    }]
    // draw the chart
    Plotly.newPlot('imdDiv', imddata, layout, {displayModeBar: false})
  });
