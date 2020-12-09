console.log('Client side Js!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo =document.querySelector('#messageErr')
const messageThree = document.querySelector('#message3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading.."
    messageTwo.textContent=""
    messageThree.textContent=""

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent =  data.forecast
               
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})