import { useState } from 'react'

const Button = (props) =>{
	return (
		<button onClick={props.onClick}>{props.text}</button>
	)
}

const Statistics = ({good, neutral, bad}) => {
	
	const getTotal = good + neutral + bad
	const getAverage = (good-bad)/getTotal
	const getPositivePercent = (good/getTotal)*100

	if (getTotal === 0){
		return(
			<div>No feedback given</div>
		)
	}

	return (
		<div>
			<div>good {good}</div>
			<div>neutral {neutral}</div>
			<div>bad {bad}</div>
			<div>all {getTotal}</div>
			<div>average {getAverage}</div>
			<div>positive {getPositivePercent}%</div>
		</div>
	)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleIncreaseGood = () => {setGood(good + 1)}
  const handleIncreaseNeutral = () => {setNeutral(neutral + 1)}
  const handleIncreaseBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h1>give feedback </h1>
	  <Button onClick={handleIncreaseGood} text={'good'}/>
	  <Button onClick={handleIncreaseNeutral} text={'neutral'}/>
	  <Button onClick={handleIncreaseBad} text={'bad'}/>
	  <h1>statistics</h1>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App