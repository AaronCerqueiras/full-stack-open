import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons' 

const Filter = (props) => (
	<div>filter shown with 
		<input value={props.value} onChange={props.onChange}/>
	</div>)

const PersonData = (props) => (
		<div>
			{props.person.name} {props.person.number} <button onClick={props.onDeletePerson}>delete</button>
		</div>
	)

const Persons = (props) => {
	const personList = props.persons
	const filterFunc = props.filter

	//Custom event
	const deletePerson = (person) => {
		console.log('Deleting person', person)
		props.onDeletePerson(person)
	}

	return(
		<div>
			{personList.filter(filterFunc).map(person => <PersonData key={person.id} person={person} onDeletePerson={()=> deletePerson(person)}/>)}
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
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //Search state
  const [newSearch, setNewSearch] = useState('')

  const addName = (event) => {
	event.preventDefault()
	
	//Check if newName is already in persons

	/*if (persons.some(person => person.name === newName)){
		console.log('Person already added!')
		alert(`${newName} is already added to phonebook`)
		return
	}

	/*const personObject = {
		name: newName,
		number: newNumber,
		id : persons.length + 1
	}*/

	const personObject = {
		name: newName,
		number: newNumber
	}

	if (persons.some(p => p.name === personObject.name)){
		//Edit person
		
		if(window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)){
			const person = persons.find(p => p.name === personObject.name)
			const updatedPerson = {...person, number:newNumber}
			console.log('Updating person', updatedPerson)
			
			personService.update(updatedPerson)
				.then(updatedPerson => {
					setPersons(persons.map(p => p.id === updatedPerson.id ?
						updatedPerson : p
					))

					console.log(`${updatedPerson.name} updated with number ${updatedPerson.number}, id ${updatedPerson.id}`)

					setNewName('')
					setNewNumber('')
				})
				.catch( error => {
					
					alert(`The person ${updatedPerson.name} was deleted from the server.`)
					setPersons(persons.filter(p => p.id !== updatedPerson.id))
				})
		}
	}else{
		//Add new person

		personService.create(personObject)
			.then(person => {
				setPersons(persons.concat(person))

				console.log(`${person.name} added with number ${person.number}, id ${person.id}`)

				setNewName('')
				setNewNumber('')
		})
	}
	
	
  }
  const deletePerson = (person) => {

	console.log("Deleting from app the person:", person.id)
	
	if (window.confirm(`Delete ${person.name} ?`)){
		
		personService.deletePerson(person.id)
		.then(deletedPerson => {
			console.log(`${deletedPerson.name} with id ${deletedPerson.id} deleted.`)

			setPersons(persons.filter(p => p.id !== deletedPerson.id))

		}).catch(error => {
					
			alert(`The person ${person.name} was already deleted from the server.`)
			setPersons(persons.filter(p => p.id !== person.id))
		})

	}else{
		console.log("Deletion aborted.")
	}
	
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

  useEffect(() =>{
	personService.getAll()
		.then( persons => {
			console.log('Data retrieved ',persons)
			setPersons(persons)
		})
  },[])

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
	  <Persons filter={filterNames} persons={persons} onDeletePerson={deletePerson}/>
    </div>
  )
}

export default App