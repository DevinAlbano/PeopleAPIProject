// Div for listing people
const peopleDiv = document.getElementById('people')

// GET request using fetch
const get = (url, f) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json()
      .then(f)
      .catch(reject)
    )
    .then(resolve)
    .catch(reject) 
  })
}

// POST request using fetch
const post = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resolve)
      .catch(reject)
  })
}

// Get people from API and list them in peopleDiv
const showPeople = () => get('https://litbug.net/people', ({people}) => listPeople(people))

// Clear peopleDiv html
const clearPeople = () => peopleDiv.innerHTML = ''

// Add a new person to the database
const addPerson = () => {
  const name = document.getElementById('name').value
  const age = document.getElementById('age').value
  
  post('https://litbug.net/people', {name, age}).then(showPeople)
}

// Clears the peopleDiv and then creates an ordered list
// and a list item for each person
const listPeople = people => {
  const orderedList = document.createElement("OL")

  clearPeople()
  
  people.map(person => document.createTextNode(`${person.name}: ${person.age}`))
    .map(textNode => document.createElement("LI").appendChild(textNode).parentNode)
    .map(listItem => orderedList.append(listItem))
  
  peopleDiv.appendChild(document.createElement("HR"))
  peopleDiv.appendChild(orderedList)
  peopleDiv.appendChild(document.createElement("HR"))
}

// Handle enter key on inputs to trigger addPerson()
const enterAddPerson = event => {
  if (event.keyCode === 13) {
    addPerson()
  }
}