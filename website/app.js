/* Global Variables */


let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// fetching weather data and capturing user input
async function fetchWeatherData(zipCode) {
    const apiKey = "8038ef29db69f6a784446913d9ff8106";
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const url = `${baseUrl}?zip=${zipCode},us&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Debugging: log the data to see its structure
        return data.main.temp; // Make sure this path matches the data structure
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle the error appropriately in your app
    }
}


// Function to post data to your server
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', async () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const temperature = await fetchWeatherData(zipCode);

    // Now post data to server
    await postData('/add', { temperature, date: newDate, userResponse: feelings });

    // Update UI here
    document.getElementById('date').innerHTML = `Date: ${newDate}`;
    document.getElementById('temp').innerHTML = `Temperature: ${temperature}`;
    document.getElementById('content').innerHTML = `I feel: ${feelings}`;
});

  
