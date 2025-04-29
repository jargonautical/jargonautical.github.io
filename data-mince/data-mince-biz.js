//filepath = "https://www.nomisweb.co.uk/api/v01/dataset/NM_141_1.data.csv?geography=1820328235...1820328238,1820328230,1820328239,1820328240,1820328233,1820328241,1820328242&date=latest&industry=37748736&employment_sizeband=0&legal_status=1...3,7,4...6&measures=20100"

filepath = "https://www.nomisweb.co.uk/api/v01/dataset/NM_141_1.data.csv?geography=1820328235...1820328238,1820328230,1820328239,1820328240,1820328233,1820328241,1820328242&date=latest&industry=37748736&employment_sizeband=1...9&legal_status=0&measures=20100"
// BUILD THE CHART -------------------------------------------------------------
Plotly.d3.csv(filepath, function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var allDistrictNames = unpack(rows, 'GEOGRAPHY_NAME'),
        allSizeBands = unpack(rows, 'EMPLOYMENT_SIZEBAND_NAME'),
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
            x: currentSizeBand,
            y: currentValue,
            type: 'bar',
            marker: {
                size: 12,
                opacity: 0.7,
                color: 'darkturquoise'
            }
        };

        var data = [trace1];

        //console.log(data);

        var layout = {
            title:'Business units by number of employees',
            //height: 600,
            //width: 1100,
            margin: {
              l: 50,
              r: 50,
              b: 50,
              t: 100,
              pad: 4
            },
            xaxis: {
              //tickangle: 0,
              tickfont: {
                size: 12,
                color: 'black'
              },
            },
            hovermode: 'closest'
        };

        Plotly.newPlot('bizDiv', data, layout, {displayModeBar: false});
    };

    var innerContainer = document.querySelector('[data-num="4"'),
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
