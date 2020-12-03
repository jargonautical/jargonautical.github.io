// DEFINE DATASETS

// Population - 5 year bands
pop_data = "https://www.nomisweb.co.uk/api/v01/dataset/NM_2002_1.data.csv?geography=1820328235...1820328238,1820328230,1820328239,1820328240,1820328233,1820328241,1820328242&date=latest&gender=0&c_age=1,3...18,210&measures=20100&select=date_name,geography_name,geography_code,c_age_name,measures_name,obs_value,obs_status_name"
//pop = pd.read_csv(pop_url)
//pop['C_AGE_NAME'] = pop['C_AGE_NAME'].replace(['Aged 5-9'], 'Aged 05-09') # tidies up display order in charts

// number and % of people self-employed
se_data = "https://www.nomisweb.co.uk/api/v01/dataset/NM_17_5.data.csv?geography=1811939640...1811939643,1811939634,1811939644,1811939645,1811939638,1811939646,1811939647&date=latestMINUS1&variable=249&measures=21001&select=date_name,geography_name,geography_code,variable_name,measures_name,obs_value"

// IMD number of LSOAs by deprivation decile
imd_data = "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/845345/File_7_-_All_IoD2019_Scores__Ranks__Deciles_and_Population_Denominators_3.csv"
//imd.columns = ['lsoa_code','lsoa_name','geography_code','geography_name','imd_score','imd_rank','imd_decile','income_score','income_rank','income_decile','employment_score','employment_rank','employment_decile','skills_score','skills_rank','skills_decile','health_score','health_rank','health_decile','crime_score','crime_rank','crime_decile','housing_score','housing_rank','housing_decile','living_env_score','living_env_rank','living_env_decile','idaci_score','idaci_rank','idaci_decile','idaopi_score','idaopi_rank','idaopi_decile','cyp_score','cyp_rank','cyp_decile','adult_skills_score','adult_skills_rank','adult_skills_decile','geobarriers_score','geobarriers_rank','geobarriers_decile','wider_barriers_score','wider_barriers_rank','wider_barriers_decile','indoors_score','indoors_rank','indoors_decile','outdoors_score','outdoors_rank','outdoors_decile','total_pop','pop0to15','pop16to59','pop60+','working_age']
districts = ['East Devon','Exeter','Mid Devon','North Devon','Plymouth','South Hams','Teignbridge','Torbay','Torridge','West Devon']
//agg = imdDevon.groupby(['geography_name']).median().reset_index()

// BUILD THE CHART -------------------------------------------------------------
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var allCountryNames = unpack(rows, 'country'),
        allYear = unpack(rows, 'year'),
        allGdp = unpack(rows, 'gdpPercap'),
        listofCountries = [],
        currentCountry,
        currentGdp = [],
        currentYear = [];

    for (var i = 0; i < allCountryNames.length; i++ ){
        if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
            listofCountries.push(allCountryNames[i]);
        }
    }

    function getCountryData(chosenCountry) {
        currentGdp = [];
        currentYear = [];
        for (var i = 0 ; i < allCountryNames.length ; i++){
            if ( allCountryNames[i] === chosenCountry ) {
                currentGdp.push(allGdp[i]);
                currentYear.push(allYear[i]);
            }
        }
    };

    // Default Country Data
    setBubblePlot('Afghanistan');

    function setBubblePlot(chosenCountry) {
        getCountryData(chosenCountry);

        var trace1 = {
            x: currentYear,
            y: currentGdp,
            mode: 'lines+markers',
            marker: {
                size: 12,
                opacity: 0.5
            }
        };

        var data = [trace1];

        var layout = {
            title:'Line and Scatter Plot',
            height: 400,
            width: 480
        };

        Plotly.newPlot('gmDiv', data, layout, {displayModeBar: false});
    };

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        countrySelector = innerContainer.querySelector('.countrydata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofCountries, countrySelector);

    function updateCountry(){
        setBubblePlot(countrySelector.value);
    }

    countrySelector.addEventListener('change', updateCountry, false);
});
