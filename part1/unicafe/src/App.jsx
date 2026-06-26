import { useState } from 'react'

const Button = (props) =>{
	return (
		<button onClick={props.onClick}>{props.text}</button>
	)
}

const Statistic = ({name, total}) => {
	return (
		<div>{name} {total}</div>
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

  const getTotal = good + neutral + bad
  const getAverage = (good-bad)/getTotal
  const getPositivePercent = (good/getTotal)*100
  
  return (
    <div>
      <h1>give feedback </h1>
	  <Button onClick={handleIncreaseGood} text={'good'}/>
	  <Button onClick={handleIncreaseNeutral} text={'neutral'}/>
	  <Button onClick={handleIncreaseBad} text={'bad'}/>
	  <h1>statistics</h1>
	  <Statistic name={'good'} total={good}/>
	  <Statistic name={'neutral'} total={neutral}/>
	  <Statistic name={'bad'} total={bad}/>
	  <Statistic name={'all'} total={getTotal}/>
	  <Statistic name={'average'} total={getAverage}/>
	  <Statistic name={'positive'} total={[getPositivePercent, '%']}/>
    </div>
  )
}

export default App