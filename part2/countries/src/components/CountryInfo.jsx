
const LanguagesList = ({languages}) => {
		<ul>
			{Object.values(languages).map((lang,i) => <li key={i}>{lang}</li>)}
		</ul>
}


const CountryInfo = ({country}) => {
		
	return(
		<div>
			<h1>{country.name.common}</h1>
			<div>Capital {country.capital}</div>
			<div>Area {country.area}</div>
			<h2>Languages</h2>
			<LanguagesList languages={country.languages}/>
			<img src={country.flags.png}/>
		</div>
	)
}

export default CountryInfo