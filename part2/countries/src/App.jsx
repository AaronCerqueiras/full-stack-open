import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'
import CountryInfo from './components/CountryInfo' 

const CountriesList = ({countries, onCountrySelected}) => {
	
	return(
		<li>
			{countries.map( (country, i) => 
				<div key={i}>
					{country.name.common}
					<button onClick={event => onCountrySelected(i)}>Show</button>
				</div>
			)}
		</li>
	)
}

const SearchResults = (props) => {
	
	const countries = props.countries
	const selectedCountry = props.selectedCountry
	
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

	if (selectedCountry >= 0){
		//Country selected
		return (
			<CountryInfo country={countries[selectedCountry]}/>
		)
	}

	if (countries.length === 1){
		//Show Single result
		console.log(countries)
		return (
			<CountryInfo country={countries[0]}/>
		)
	}

	return (
		<CountriesList countries={countries} onCountrySelected={props.onCountrySelected}/>
	)
}

function App() {

	const [searchValue, setSearchValue] = useState('')
	const [countries, setCountries] = useState([])

	const [searched, setSearched] = useState([]) // Countries the search filters

	const [selectedCountry, setSelectedCountry] = useState(-1)

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

		setSelectedCountry(-1) //Reset the selected country
	}

	const handleSelectCountry = (countrySelected) =>{
		console.log("Country number ", countrySelected," selected")
		setSelectedCountry(countrySelected)
	}

	return (
		<div>
			<div>
				Find countries <input value={searchValue} onChange={handleSearchChange}></input>
			</div>
			<SearchResults countries={searched} selectedCountry={selectedCountry} onCountrySelected={handleSelectCountry}/>
		</div>
	)
}

export default App
