// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + " / " + d.getDate() + " / " + d.getFullYear();

/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "92991289e00c211f867d4567efbaf169";

const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", performAction); 


// ----------


async function performAction() {
  
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  
  
  try{

    if (zip) {
      const mainURL = `${baseUrl}${zip},&appid=${apiKey}&units=metric`;

      getWeather(mainURL)
        .then((data = {}) => {
          postData('/weatherData', 
            {
              date: newDate,
              temp: data.main.temp,
              content: feelings 
            }
          )
          .then(updateUI(feelings));
        });
        
    } else {
      window.alert('Enter ZipCode !');
    }

  } catch (err) {
    console.error(err);
  }
}


async function getWeather (url) {
  
  try {

    const response = await fetch(url);
    const data = await response.json();
    
    console.table(data);
    
    return data;
    
  } catch (err) {
    console.error(err);
  }
};


async function postData (url = '', data = {}) {

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};


//Function 

async function updateUI (feel) {

  const request = await fetch('/weather')
  
  try {
    const projectData = await request.json()

    
    // Updating UI Elements
    document.getElementById("date").innerHTML = projectData.date;
    document.getElementById("temp").innerHTML = projectData.temprature+'°C';
    document.getElementById("content").innerHTML = 'And I\'m ' + feel;
    // Just did "feeling thing" like that beacuase for some reason it didn't work proberly.
    
    // Checking stuff
    console.log('projectData');
    console.table(projectData);
    //--------------

  } catch (err) {
    console.error(err);
  }

}