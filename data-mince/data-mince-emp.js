filepath = "https://www.nomisweb.co.uk/api/v01/dataset/NM_141_1.data.csv?geography=1820328235...1820328238,1820328230,1820328239,1820328240,1820328233,1820328241,1820328242&date=latest&industry=37748736&employment_sizeband=0&legal_status=1...3,7,4...6&measures=20100"

// BUILD THE CHART -------------------------------------------------------------
Plotly.d3.csv(filepath, function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var allDistrictNames = unpack(rows, 'GEOGRAPHY_NAME'),
        allSizeBands = unpack(rows, 'LEGAL_STATUS_NAME'),
        allVals = unpack(rows, 'OBS_VALUE'),
        listofDistricts = [],
        currentDistrict,
        currentSizeBand = [],
        currentValue = [];

    for (var i = 0; i < allDistrictNames.length; i++ ){
        if (listofDistricts.indexOf(allDistrictNames[i]) === -1 ){
            listofDistricts.push(allDistrictNames[i]);
        }
    }

    function getDistrictData(chosenDistrict) {
        currentValue = [];
        currentSizeBand = [];
        for (var i = 0 ; i < allDistrictNames.length ; i++){
            if ( allDistrictNames[i] === chosenDistrict ) {
                currentValue.push(allVals[i]);
                currentSizeBand.push(allSizeBands[i]);
            }
        }
    };

    // Default Country Data
    setBubblePlot('East Devon');

    function setBubblePlot(chosenDistrict) {
        getDistrictData(chosenDistrict);

        var trace1 = {
            y: currentSizeBand,
            x: currentValue,
            text: currentValue.map(String),
            textposition: 'auto',
            type: 'bar',
            orientation: 'h',
            transforms: [{
              type: 'sort',
              target: 'x',
              order: 'ascending'
            }],
            marker: {
                size: 12,
                opacity: 0.9,
                color: 'coral'
            }
        };

        var data = [trace1];

        //console.log(data);

        var layout = {
            bargap: 0.05,
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            title:'Businesses by legal status',
            //height: 600,
            //width: 1100,
            margin: {
              l: 300,
              r: 50,
              b: 50,
              t: 100,
              pad: 4
            },
            yaxis: {
              ticktext : ['Company', 'Sole proprietor', 'Partnership', 'Non-profit', 'Public corp', 'Central Gov', 'Local Gov'],
              showticklabels: true,
              tickangle: 0,
              tickfont: {
                size: 12,
                color: 'black'
              },
            },
            xaxis: {
              showticklabels: false
            },
            hovermode: 'closest'
        };

        Plotly.newPlot('empDiv', data, layout, {displayModeBar: false});
    };

    var innerContainer = document.querySelector('[data-num="2"'),
        plotEl = innerContainer.querySelector('.plot'),
        districtSelector = innerContainer.querySelector('.districtdata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofDistricts, districtSelector);

    function updateDistrict(){
        setBubblePlot(districtSelector.value);
    }

    districtSelector.addEventListener('change', updateDistrict, false);
});
