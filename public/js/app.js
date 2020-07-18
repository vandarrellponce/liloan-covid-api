console.log('Client Loaded')

const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const lataban = document.querySelector('#lataban')
const mulao = document.querySelector('#mulao')
const tabla = document.querySelector('#tabla')
const cabadiangan = document.querySelector('#cabadiangan')

// Function 1
const setUpMessage = (data) => {
    if (data.error) return console.log(data.error)
    messageOne.textContent = `Location: ${data.geoData.place_name}`
    messageTwo.textContent = `Weather observation at ${data.weatherData.observation_time} is ${data.weatherData.weather_descriptions}`
    messageThree.textContent = `Temperature: ${data.weatherData.temperature}`
    messageFour.textContent = `Feels like: ${data.weatherData.feelslike}`
    messageFive.textContent = `Cloud Cover: ${data.weatherData.cloudcover}%`
}
// Function 2
const fetchData = (url) => {
    fetch(url).then(res => {
        res.json().then( data => {
            setUpMessage(data)
        })
    })
}
    
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = `http://127.0.0.1:5000/weather?address=${location}`
    fetchData(url)
})
lataban.addEventListener('click', (e) => {
    e.preventDefault()
    fetchData('http://127.0.0.1:5000/weather?address=lataban liloan')
})
tabla.addEventListener('click', (e) => {
    e.preventDefault()
    fetchData('http://127.0.0.1:5000/weather?address=tabla liloan')
})
mulao.addEventListener('click', (e) => {
    e.preventDefault()
    fetchData('http://127.0.0.1:5000/weather?address=mulao liloan')
})
cabadiangan.addEventListener('click', (e) => {
    e.preventDefault()
    fetchData('http://127.0.0.1:5000/weather?address=cabadiangan liloan')
})





