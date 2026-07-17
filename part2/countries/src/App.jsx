import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'
import {CountriesList, CountryInfo} from './components/Countries' 

const SearchResults = (props) => {
	
	const countries = props.countries
	
	if (countries.length === 0){
		return null
	}

	if (countries.length > 10){
		return (
			<div>
				Too many matches, specify another filter.
			</div>
		)
	}

	if (countries.length === 1){
		//Show Single result
		return (
			<CountryInfo country={countries[0]}/>
		)
	}

	return (
		<CountriesList countries={countries}/>
	)
}

function App() {

	const [searchValue, setSearchValue] = useState('')
	const [countries, setCountries] = useState([])

	const [searched, setSearched] = useState([]) // Countries the search filters


	useEffect(() =>{
		console.log('Effect run with startup')

		countriesService.getAll()
			.then( data => {
				console.log(data)
				setCountries(data)
			})

	},[])

	const filterCountries = (search) =>{

		const trimmedSearch = search.trim().toLowerCase()

		if (trimmedSearch.length === 0){
			setSearched([])
			return
		}

		const newSearch = countries.filter(country => {
			const name = country.name.common
			return name.toLowerCase().includes(search)
		})

		console.log(newSearch)
		setSearched(newSearch)
	}

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value)

		filterCountries(event.target.value)
	}

	return (
		<div>
			<div>
				Find countries <input value={searchValue} onChange={handleSearchChange}></input>
			</div>
			<SearchResults countries={searched}/>
		</div>
	)
}

export default App
