// will need to make sure these have correct ID NAMES after merging
var searchButton = document.querySelector('#search-button');
var search = document.querySelector('#search');
var searchForm = document.querySelector('#search-form');


function getApi (event) {
    event.preventDefault();
    event.stopPropagation();

    // store value from input field and convert it to all lowercase
    var search = document.querySelector('#search');
    var city = search.value.toLowerCase();
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

                    /* GET IMAGE INFO ======================================
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
                    })*/

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
                    art.textContent = artScore + '%';
                    if (artScore > 74) {
                        art.setAttribute('style', 'background-color: green; color: white');
                    } else if (artScore < 75 && artScore > 49) {
                        art.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (artScore < 50 && artScore > 24) {
                        art.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        art.setAttribute('style', 'background-color: red; color: white');
                    }

                    var cinema = document.getElementById('cinema');
                    var cinemaScore = parseInt(data.categories[4].data[2].float_value * 100);
                    cinema.textContent = cinemaScore + '%';
                    if (cinemaScore > 74) {
                        cinema.setAttribute('style', 'background-color: green; color: white');
                    } else if (cinemaScore < 75 && cinemaScore > 49) {
                        cinema.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (cinemaScore < 50 && cinemaScore > 24) {
                        cinema.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        cinema.setAttribute('style', 'background-color: red; color: white');
                    }

                    var comedy = document.getElementById('comedy');
                    var comedyScore = parseInt(data.categories[4].data[4].float_value * 100);
                    comedy.textContent = comedyScore + '%';
                    if (comedyScore > 74) {
                        comedy.setAttribute('style', 'background-color: green; color: white');
                    } else if (comedyScore < 75 && comedyScore > 49) {
                        comedy.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (comedyScore < 50 && comedyScore > 24) {
                        comedy.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        comedy.setAttribute('style', 'background-color: red; color: white');
                    }

                    var concerts = document.getElementById('concerts');
                    var concertsScore = parseInt(data.categories[4].data[6].float_value * 100);
                    concerts.textContent = concertsScore + '%';
                    if (concertsScore > 74) {
                        concerts.setAttribute('style', 'background-color: green; color: white');
                    } else if (concertsScore < 75 && concertsScore > 49) {
                        concerts.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (concertsScore < 50 && concertsScore > 24) {
                        concerts.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        concerts.setAttribute('style', 'background-color: red; color: white');
                    }

                    var history = document.getElementById('history');
                    var historyScore = parseInt(data.categories[4].data[8].float_value * 100);
                    history.textContent = historyScore + '%';
                    if (historyScore > 74) {
                        history.setAttribute('style', 'background-color: green; color: white');
                    } else if (historyScore < 75 && historyScore > 49) {
                        history.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (historyScore < 50 && historyScore > 24) {
                        history.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        history.setAttribute('style', 'background-color: red; color: white');
                    }

                    var museums = document.getElementById('museums');
                    var museumsScore = parseInt(data.categories[4].data[10].float_value * 100);
                    museums.textContent = museumsScore + '%';
                    if ( museumsScore > 74) {
                        museums.setAttribute('style', 'background-color: green; color: white');
                    } else if (museumsScore < 75 && museumsScore > 49) {
                        museums.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (museumsScore < 50 && museumsScore > 24) {
                        museums.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        museums.setAttribute('style', 'background-color: red; color: white');
                    }

                    var performance = document.getElementById('performance');
                    var performanceScore = parseInt(data.categories[4].data[12].float_value * 100);
                    performance.textContent = performanceScore + '%';
                    if ( performanceScore > 74) {
                        performance.setAttribute('style', 'background-color: green; color: white');
                    } else if (performanceScore < 75 && performanceScore > 49) {
                        performance.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (performanceScore < 50 && performanceScore > 24) {
                        performance.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        performance.setAttribute('style', 'background-color: red; color: white');
                    }

                    var sports = document.getElementById('sports');
                    var sportsScore = parseInt(data.categories[4].data[14].float_value * 100);
                    sports.textContent = sportsScore + '%';
                    if ( sportsScore > 74) {
                        sports.setAttribute('style', 'background-color: green; color: white');
                    } else if (sportsScore < 75 && sportsScore > 49) {
                        sports.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (sportsScore < 50 && sportsScore > 24) {
                        sports.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        sports.setAttribute('style', 'background-color: red; color: white');
                    }

                    var zoos = document.getElementById('zoos');
                    var zoosScore = parseInt(data.categories[4].data[16].float_value * 100);
                    zoos.textContent = zoosScore + '%';
                    if ( zoosScore > 74) {
                        zoos.setAttribute('style', 'background-color: green; color: white');
                    } else if (zoosScore < 75 && zoosScore > 49) {
                        zoos.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (zoosScore < 50 && zoosScore > 24) {
                        zoos.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        zoos.setAttribute('style', 'background-color: red; color: white');
                    }

                    var culture = document.getElementById('culture');
                    cultureAverage = parseInt((artScore + cinemaScore + comedyScore + concertsScore + historyScore + museumsScore + performanceScore + sportsScore + zoosScore)/9);
                    culture.textContent = 'Overall Culture: ' + cultureAverage;
                    if ( cultureAverage > 74) {
                        culture.setAttribute('style', 'background-color: green; color: white');
                    } else if (cultureAverage < 75 && cultureAverage > 49) {
                        culture.setAttribute('style', 'background-color: yellow; color: black');
                    } else if (cultureAverage < 50 && cultureAverage > 24) {
                        culture.setAttribute('style', 'background-color: orange; color: black');
                    } else {
                        culture.setAttribute('style', 'background-color: red; color: white');
                    }


 
                    })
                })
            })
        })
    })
}

searchButton.addEventListener('click', getApi);
searchForm.addEventListener('submit', getApi);

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