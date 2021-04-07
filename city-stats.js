var inputButton = document.querySelector('#input-button');

function getApi (event) {
    event.preventDefault();

    // store value from input field and convert it to all lowercase
    var inputField = document.querySelector('#input-field');
    var city = inputField.value.toLowerCase();
    console.log('Lowercase: ' + city);

    // GET ROOT API ======================================================
    fetch('https://api.teleport.org/api/')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('ROOT API------------------');
        console.log(data);
        
        // GET CITY SUMMARY INFO ==========================================
        fetch('https://api.teleport.org/api/cities/?search=' + city)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('CITY DATA------------------');
            console.log(data)

            // display city name, region, country
            var cityName = document.getElementById('city-name');
            cityName.textContent = data._embedded['city:search-results'][0].matching_full_name;
            console.log('>> City name now displayed');

            // TODO: Can possibly add 'alternate names' what the locals might call it

            // store geonameid
            geoNameId = data._embedded['city:search-results'][0]._links['city:item'].href;
            console.log('>> Geoname ID stored: ' + geoNameId);

            // GET CITY CEO INFO ===========================================
            fetch(geoNameId)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('GEONAME DATA------------------');
                console.log(data)
                
                // display population info
                var population = document.getElementById('population');
                population.textContent = data.population;
                console.log('>> Population now displayed');
                
                // store urban area info link
                urbanArea = data._links['city:urban_area'].href;
                console.log('>> Urban Area Stored' + urbanArea);

                // GET URBAN AREA INFO ================================
                fetch(urbanArea)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('URBAN AREA DATA------------------');
                    console.log(data)

                // store image link
                var uaImages = data._links['ua:images'].href;
                console.log('>> Stored UA Image link: ' + uaImages);

                    // GET IMAGE INFO ======================================
                    fetch(uaImages)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log('IMAGE DATA------------------');
                        console.log(data)

                        // display image to page
                        var cityImage = data.photos[0].image.web;
                        document.getElementById('city-image').src = cityImage;
                        console.log('>> Displayed Image on page');  
                    })

                    // display city bio link
                    var cityBio = document.getElementById('city-bio-link');
                    var bioLink = data.teleport_city_url;
                    cityBio.setAttribute('href', bioLink);
                    console.log('>> Displayed City Bio Link to page');

                    // store city details link
                    var cityDetails = data._links['ua:details'].href;
                    console.log('Stored city details link: ' + cityDetails);

                    // GET CITY DETAILS ======================================
                    fetch(cityDetails)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log('CITY DETAILS------------------');
                        console.log(data)
                    
                    // retrieve and display the city climate
                    var climate = document.getElementById('climate');
                    climate.textContent = 'Climate: ' + data.categories[2].data[8].string_value;
                    console.log('>> Displayed climate to the page');

                    // retrieve and display the city language
                    var climate = document.getElementById('language');
                    language.textContent = 'Language: ' + data.categories[11].data[2].string_value;
                    console.log('>> Displayed language to the page');

                    // retrieve scores for 9 cultural data points and display them


                    var art = document.getElementById('art-galleries');
                    var artScore = parseInt(data.categories[4].data[0].float_value * 100);
                    art.textContent = 'Art Galleries: ' + artScore;

                    var cinema = document.getElementById('cinema');
                    var cinemaScore = parseInt(data.categories[4].data[2].float_value * 100);
                    cinema.textContent = 'Cinema Venues: ' + cinemaScore;

                    var comedy = document.getElementById('comedy');
                    var comedyScore = parseInt(data.categories[4].data[4].float_value * 100);
                    comedy.textContent = 'Comedy Clubs: ' + comedyScore;

                    var concerts = document.getElementById('concerts');
                    var concertsScore = parseInt(data.categories[4].data[6].float_value * 100);
                    concerts.textContent = 'Concert Venues: ' + concertsScore;

                    var history = document.getElementById('history');
                    var historyScore = parseInt(data.categories[4].data[8].float_value * 100);
                    history.textContent = 'Historical Sites: ' + historyScore;

                    var museums = document.getElementById('museums');
                    var museumsScore = parseInt(data.categories[4].data[10].float_value * 100);
                    museums.textContent = 'Museums: ' + museumsScore;

                    var performance = document.getElementById('performance');
                    var performanceScore = parseInt(data.categories[4].data[12].float_value * 100);
                    performance.textContent = 'Performing Arts: ' + performanceScore;

                    var sports = document.getElementById('sports');
                    var sportsScore = parseInt(data.categories[4].data[14].float_value * 100);
                    sports.textContent = 'Sports Venues: ' + sportsScore;

                    var zoos = document.getElementById('zoos');
                    var zoosScore = parseInt(data.categories[4].data[16].float_value * 100);
                    zoos.textContent = 'Zoos: ' + zoosScore;

                    var culture = document.getElementById('culture');
                    cultureAverage = parseInt((artScore + cinemaScore + comedyScore + concertsScore + historyScore + museumsScore + performanceScore + sportsScore + zoosScore)/9);
                    culture.textContent = 'Culture Score: ' + cultureAverage;
                    
                    
                    
                    console.log('Art Score: ' + art);
                    console.log(typeof art); 


 
                    })
                })
            })
        })
    })
}

inputButton.addEventListener('click', getApi);

/* TEMPLATE
fetch('https://api.teleport.org/api/urban_areas/slug:' + city + '/details/')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('DETAILS------------------');
        console.log(data);              
    })
*/