import { useState } from 'react'

const Button = (props) =>{
	return (
		<button onClick={props.onClick}>{props.text}</button>
	)
}

const StatAmount = ({statName, total}) => {
	return (
		<div>{statName} {total}</div>
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
	  <StatAmount statName={'good'} total={good}/>
	  <StatAmount statName={'neutral'} total={neutral}/>
	  <StatAmount statName={'bad'} total={bad}/>
    </div>
  )
}

export default App