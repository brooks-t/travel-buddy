var tableBody = document.getElementById('results');
var fetchButton = document.getElementById('search-button'); // changed id to match with html -bt
var searchForm = document.querySelector('#search-form'); // added this global variable to listen for search-form submission -bt

function getApi(event){
  event.preventDefault(); // added these two lines to prevent unwanted form/button behavior -bt
  event.stopPropagation();
    var searchField = document.getElementById('search'); // changed id to match with html -bt

    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?city='+searchField.value+'&apikey=Enbe7EvmaJcFDISS11Qk5cMImrLCPkBI';

    fetch(requestUrl)
      .then(function(response){
          return response.json();
      })
      .then(function(data){
          console.log(data)
          console.log(data._embedded.events[0].name)

          //loop over data for our needs
          for (var i =0; i < data._embedded.events.length; i++){

            //creating elements
            var createTableRow = document.createElement('tr');
            var tableData = document.createElement('td');
            var eventName = document.createElement('p');
            var eventDates = document.createElement('p');
            var eventUrl = document.createElement('a');
            var eventImg = document.createElement('img');
            var eventLocation = document.createElement('p');
            
            //setting text in page
            eventName.textContent = "Event: " + data._embedded.events[i].name;
            eventDates.textContent = "Start Date:" + data._embedded.events[i].dates.start.localDate;
            eventUrl.href = data._embedded.events[i].url;
            eventUrl.textContent = ">Event Link<  ";
            eventImg.src = data._embedded.events[i].images[0].url;
            eventLocation.textContent = data._embedded.events[i]._embedded.venues[0].name;
            
            
            //changing colors& styles
            createTableRow.style.backgroundColor = '#FEFDDE';
            tableData.style.border = 'medium solid #F9E4C4';
            tableData.style.borderRadius = '10px';
            createTableRow.style.margin = '8px';
            eventImg.style.width = '300px';
            eventImg.style.height= 'auto';
            //changing spacing
            eventName.style.textAlign = 'center';
            eventDates.style.textAlign = 'center';
            eventLocation.style.textAlign = 'center';

            //appending the table
            tableData.appendChild(eventName);
            tableData.appendChild(eventDates);
            tableData.appendChild(eventLocation);
            tableData.appendChild(eventUrl);
            tableData.appendChild(eventImg);
            createTableRow.appendChild(tableData);
            tableBody.appendChild(createTableRow);
            
          }
      })
}

fetchButton.addEventListener('click', getApi);
searchForm.addEventListener('submit', getApi); // added to listen for enter button on search field -bt