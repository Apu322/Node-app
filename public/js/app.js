const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading'
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
                messageOne.textContent = ''
            } else {
                messageTwo.textContent = ''
                messageOne.textContent = 'location: ' + data.location + '  |||  ' +
                    'observation: ' + data.observation + '  |||  '
                    + 'temperature: ' + data.temperature
            }
        })
    })
})