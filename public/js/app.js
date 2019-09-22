const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const searchButtton = document.querySelector('#searchButton') 
const currentLocationButton = document.querySelector('#currentLocationButton') 
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

searchButtton.addEventListener('click', (e) => {
     e.preventDefault()
     
     const location = search.value

     messageOne.textContent = 'Loading...'
     messageTwo.textContent = ''

     fetch('/weather?address='+location).then((response => {
          response.json().then((data) => {
               if(data.error){
                    messageOne.textContent = data.error
               }else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
               }
               
          })
     }))
})

currentLocationButton.addEventListener('click', (e) => {
     e.preventDefault()
     
     if(!navigator.geolocation){
          return alert('Geolocation is not supported by your beowser.')
      }
  
      messageOne.textContent = 'Loading...'
      messageTwo.textContent = ''

      currentLocationButton.setAttribute('disabled', 'disabled')
  
      navigator.geolocation.getCurrentPosition((position) => {
              fetch('/weatherbygeocode?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((response => {
               response.json().then((data) => {
                    if(data.error){
                         messageOne.textContent = data.error
                    }else{
                         messageOne.textContent = 'Your current location weather details'
                         messageTwo.textContent = data.forecast
                    }
                    currentLocationButton.removeAttribute('disabled')
               }).catch((e) => {
                    messageOne.textContent = 'Unable to fetch your current location weather information!'
               })
          }))
          
      })
})