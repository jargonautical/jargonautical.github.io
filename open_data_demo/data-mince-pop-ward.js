// number and % of people self-employed
se_data = "https://www.nomisweb.co.uk/api/v01/dataset/NM_17_5.data.csv?geography=1811939644&date=latestMINUS1&variable=249&measures=21001&select=date_name,geography_name,geography_code,variable_name,measures_name,obs_value"

// IMD number of LSOAs by deprivation decile
imd_data = "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/845345/File_7_-_All_IoD2019_Scores__Ranks__Deciles_and_Population_Denominators_3.csv"
//imd.columns = ['lsoa_code','lsoa_name','geography_code','geography_name','imd_score','imd_rank','imd_decile','income_score','income_rank','income_decile','employment_score','employment_rank','employment_decile','skills_score','skills_rank','skills_decile','health_score','health_rank','health_decile','crime_score','crime_rank','crime_decile','housing_score','housing_rank','housing_decile','living_env_score','living_env_rank','living_env_decile','idaci_score','idaci_rank','idaci_decile','idaopi_score','idaopi_rank','idaopi_decile','cyp_score','cyp_rank','cyp_decile','adult_skills_score','adult_skills_rank','adult_skills_decile','geobarriers_score','geobarriers_rank','geobarriers_decile','wider_barriers_score','wider_barriers_rank','wider_barriers_decile','indoors_score','indoors_rank','indoors_decile','outdoors_score','outdoors_rank','outdoors_decile','total_pop','pop0to15','pop16to59','pop60+','working_age']
districts = ['East Devon','Exeter','Mid Devon','North Devon','Plymouth','South Hams','Teignbridge','Torbay','Torridge','West Devon']
Wards = ['Budshead','Compton','Devonport','Drake','Efford and Lipson','Eggbuckland','Ham','Honicknowle','Moor View','Peverell','Plympton Chaddlewood','Plympton Erle','Plympton St Mary','Plymstock Dunstone','Plymstock Radford','Southway','St Budeaux','St Peter and the Waterfront','Stoke','Sutton and Mount Gould']
//agg = imdDevon.groupby(['geography_name']).median().reset_index()

// BUILD THE CHART -------------------------------------------------------------
Plotly.d3.csv("https://www.nomisweb.co.uk/api/v01/dataset/NM_2010_1.data.csv?geography=1656751313...1656751327,1656751330,1656751328,1656751329,1656751331,1656751332&date=latest&gender=0&c_age=1,3...18,210&measures=20100&select=date_name,geography_name,geography_code,gender_name,c_age_name,measures_name,obs_value,obs_status_name", function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var allWardNames = unpack(rows, 'GEOGRAPHY_NAME'), //was allCountryNames
        allAges = unpack(rows, 'C_AGE_NAME'), //was allYear
        allValue = unpack(rows, 'OBS_VALUE'), //was gdpPercap
        listofWards = [], //was listofCountries
        currentWard, //was currentCountry
        currentValue = [], //was currentGdp
        currentAge = []; //was currentYear

    for (var i = 0; i < allWardNames.length; i++ ){
        if (listofWards.indexOf(allWardNames[i]) === -1 ){
            listofWards.push(allWardNames[i]);
        }
    }

    function getWardData(chosenWard) {
        currentValue = [];
        currentAge = [];
        for (var i = 0 ; i < allWardNames.length ; i++){
            if ( allWardNames[i] === chosenWard ) {
                currentValue.push(allValue[i]);
                currentAge.push(allAges[i]);
            }
        }
    };

    // Default Ward Data
    setBubblePlot('Stoke');

    function setBubblePlot(chosenWard) {
        getWardData(chosenWard);

        var trace1 = {
            x: currentAge,
            y: currentValue,
            type: 'bar',
            marker: {
                size: 12,
                opacity: 0.7,
                color: 'lightseagreen'
            }
        };

        var data = [trace1];
        //console.log(data);

        var layout = {
            title:'Population estimates 2019 (ONS)',
            //height: 400,
            //width: 1100,
            hovermode: 'closest',
            yaxis: {
              showticklabels: false
            }
        };

        Plotly.newPlot('popDiv', data, layout, {displayModeBar: false});
    };

    var innerContainer = document.querySelector('[data-num="1"'),
        plotEl = innerContainer.querySelector('.plot1'),
        WardSelector = innerContainer.querySelector('.warddata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofWards, WardSelector);

    function updateWard(){
        setBubblePlot(WardSelector.value);
    }

    WardSelector.addEventListener('change', updateWard, false);
});
