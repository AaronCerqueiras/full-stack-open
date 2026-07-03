import { useState } from 'react'

const Filter = (props) => (
	<div>filter shown with 
		<input value={props.value} onChange={props.onChange}/>
	</div>)

const PersonData = (props) => (
		<div>
			{props.person.name} {props.person.number}
		</div>
	)

const Persons = (props) => {
	const personList = props.persons
	const filterFunc = props.filter

	return(
		<div>
			{personList.filter(filterFunc).map(person => <PersonData key={person.id} person={person}/>)}
		</div>
	)
}

const PersonForm = (props) => (
	<form onSubmit={props.onSubmit}>
        <div>
          name: 
		  <input value={props.nameValue} onChange={props.onChangeName}/>
        </div>
		<div>
		  number: 
		  <input value={props.numberValue} onChange={props.onChangeNumber}/>
		</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const App = () => {
  //const [persons, setPersons] = useState([{
	//	name: 'Arto Hellas',
	//	number: '600123456',
	//	id: 1
	//}]) 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //Search state
  const [newSearch, setNewSearch] = useState('')

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
		id : persons.length + 1
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

  //Search

  const handleSearchChange = (event) =>{
	setNewSearch(event.target.value)
  }

  const filterNames = (person) =>{
	const trimmedSearch = newSearch.trim()

	//Empty search
	if(trimmedSearch.length === 0)
		return true
	
	return person.name.toLowerCase().includes(trimmedSearch.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter value={newSearch} onChange={handleSearchChange}/>
	  <h3>add a new</h3>
	  <PersonForm
	  	onSubmit={addName}
		nameValue={newName} onChangeName={handleNameChange}
		numberValue={newNumber} onChangeNumber={handleNumberChange}
	  />
      <h3>Numbers</h3>
	  <Persons filter={filterNames} persons={persons}/>
    </div>
  )
}

export default App