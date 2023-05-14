const url = "https://api.coincap.io/v2/assets";
const tableBody = document.getElementById("data");
const keysToExtract = ["symbol", "priceUsd", "changePercent24Hr", "volumeUsd24Hr", "explorer"];

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const firstTenElements = data.data.slice(0, 10);
    let out = "";

    firstTenElements.forEach(element => {
      out += `
        <tr>
          <td id = iddd title = ${element.name} >${element.symbol}</td>
          <td>${parseFloat(element.priceUsd).toFixed(4)}</td>
          <td>${parseFloat(element.changePercent24Hr).toFixed(3)}</td>
          <td>${parseFloat(element.volumeUsd24Hr).toFixed(3)}</td>
          <td>${parseFloat(element.supply).toFixed(3)}</td>
          <td><a href='${element.explorer}' target="_blank">More Information</a></td>
        </tr>
      `;

      tableBody.innerHTML = out;
    });
  })
  .catch(error => console.log(error));


// refresh page button's funciton and eventListener.
  function refreshPage() {
    location.reload();
  }
  document.getElementById("refresh").addEventListener("click", refreshPage);


// -------------------------------------------------------



// time and date function
function updateTimeAndDate() {
    const dateTimeElement = document.getElementById("datetime");
    const currentDate = new Date();
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
  
    dateTimeElement.textContent = formattedDate;
  }
// Update the time and date immediately
updateTimeAndDate();

// Update the time and date every second
setInterval(updateTimeAndDate, 1000);


//----------------------------------------------


// search form function

const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const symbolInput = document.getElementById("symbolInput");
  const symbol = symbolInput.value.trim().toUpperCase();

  // Make API request to CoinCap
  fetch(`${url}?search=${symbol}`)
    .then(response => response.json())
    .then(data => {
      if (data.data.length > 0) {
        const cryptocurrency = data.data[0];
        const value = cryptocurrency.priceUsd;
        const fullName = cryptocurrency.name;


        // Display alert with the cryptocurrency value
        alert(`The value of ${symbol} is $${parseFloat(value).toFixed(2)}  the name is ${fullName}`);
      } else {
        // Display alert if symbol is not found
        alert(`No cryptocurrency found with the symbol ${symbol}`);
      }
    })
    .catch(error => {
      console.log(error);
      alert("An error occurred while fetching data from the API");
    });

  // Clear the input field after submission
  symbolInput.value = "";
});