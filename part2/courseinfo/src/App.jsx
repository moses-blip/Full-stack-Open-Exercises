import { useState, useEffect } from 'react' // imported userEffect
import personService from './services/person'                  // imported axios
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
     // An Empty array is passed, for the data lives on the server.
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const [successMessage, setSuccessMessage] = useState(null)

  const[notificationMessage, setNotificationMessage] = useState(null)
  const[notificationType, setNotificationType] = useState(null)

 // fetching effected completed here with an Effect hook
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName.trim() || !newNumber.trim()) {
      alert('Please fill in both name and number fields')
      return
    }
  const existingPerson = persons.find(person =>
    person && person.name && person.name.toLowerCase() === newName.toLowerCase()
  )
  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already in the phonebook. Do you want to update the number?`
    )
    if (confirmUpdate) {
      const changedPerson = { ...existingPerson, number: newNumber }

      personService 
        .update(existingPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))

          setNotificationMessage(`updated number for ${returnedPerson.name}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 3000)

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotificationType('error')
          setNotificationMessage(`Information of ${existingPerson.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        })
    }
    return
  }
    const personObject = {
      name: newName,
      number: newNumber
    }


personService
  .create(personObject)
  .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson ))

    setNotificationMessage(`Added ${returnedPerson.name}`)
    setNotificationType('success')
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 3000)  

    setNewName('')
    setNewNumber('')
  })
}
  const personsToShow = persons.filter(person =>{
   if (!person || !person.name) return false; // Skip if person or name is undefined
   if (!searchFilter) return true
   return person.name.toLowerCase().includes(searchFilter.toLowerCase())
  })
const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
      }
    }    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />

      
      <div>
        filter show with: <input value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} /> 
      </div>

      <h3>Add a new contact</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        numberValue={newNumber} 
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} - {person.number}{''}
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App