import React,{ useState } from 'react'

// App component
const App = () =>{
  const [good,setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

        {/*passing state down as props*/ }
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
 
//Button Component
const Button =({onClick, text}) => (
  <button onClick = {onClick}>{text}</button>
)
 //StatisticLine component
 const StatisticLine = ({ text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
 )
//Statistics component
const Statistics = ({good, neutral, bad }) =>{
  const total = good + neutral + bad
  const average = total ===0 ? 0 : (good * 1 + neutral * 0 + bad * -1 ) / total
  const positive = total ===0 ? 0 : (good / total) * 100

  if (total===0) {
    return <p>No Feedback Given</p>
  }
  return (
    <div>   
      <h2>Statistics:</h2>
      <table>
        <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="All" value={total} />
      <StatisticLine text="average" value={average.toFixed(1)} />
      <StatisticLine text="positive" value={positive.toFixed(1) + "%"} />
       </tbody>
      </table>
    </div>
  );
}


export default App 