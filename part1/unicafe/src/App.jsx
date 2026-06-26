import { useState } from 'react'

const Button = (props) =>{
	return (
		<button onClick={props.onClick}>{props.text}</button>
	)
}

const StatisticLine = ({text, value}) => {
	return (
		<tr>
			<td>{text} </td>
			<td>{value}</td>
		</tr>
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
		<table>
			<tbody>
				<StatisticLine text={'good'} value={good}/>
				<StatisticLine text={'neutral'} value={neutral}/>
				<StatisticLine text={'bad'} value={bad}/>
				<StatisticLine text={'all'} value={getTotal}/>
				<StatisticLine text={'average'} value={getAverage}/>
				<StatisticLine text={'positive'} value={[getPositivePercent, '%']}/>
			</tbody>
		</table>
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