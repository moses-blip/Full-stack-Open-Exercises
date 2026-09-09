import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName.trim() || !newNumber.trim()) {
      alert('Please fill in both name and number fields')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {  
      alert(`${newName} is already in the phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  ) 

  return (
    <div>
      <h2>Phonebook</h2>
      
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
      <Persons persons={personsToShow} /> 
    </div>
  )
}

export default App