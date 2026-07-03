import { useState } from 'react'

const PersonData = (props) => {
	const person = props.person
	return (
		<div>
			{person.name} {person.number}
		</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([{
		name: 'Arto Hellas',
		number: '600123456',
		id: 1
	}]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
	event.preventDefault()
	
	//Check if newName is already in persons

	if (persons.some(person => person.name === newName)){
		console.log('Person already added!')
		alert(`${newName} is already added to phonebook`)
		return
	}

	const personObject = {
		name: newName,
		number: newNumber,
		id : persons.length() + 1
	}
	setPersons(persons.concat(personObject))

	console.log(`${newName} added with number ${newNumber}`)

	setNewName('')
	setNewNumber('')

  }

  const handleNameChange = (event) => {
	//console.log(event.target.value)
	setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
	setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
		  <input value={newName} onChange={handleNameChange}/>
        </div>
		<div>
		  number: 
		  <input value={newNumber} onChange={handleNumberChange}/>
		</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <PersonData key={person.id} person={person}/>)}
    </div>
  )
}

export default App