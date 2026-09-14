import { useState, useEffect } from 'react'
import axios from 'axios'
import { CountryDetails } from './components/CountryDetails' 

const App = () => {
  const [countries, setCountries] = useState<any[]>([])       
  const [searchQuery, setSearchQuery] = useState('')   

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all ')
      .then(response => {
        setCountries(response.data) 
      })
      .catch(error => {
        console.log('Error fetching country data:', error)
      })
  }, [])

  const countriesToShow = Array.isArray(countries) ? countries.filter(country => {
    if (!country || !country.name || !country.name.common) return false
    return country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  })
   : [] 

  return (
    <div style={{ padding: '20px' }}>
      <h2>Country Information Finder</h2>
      <div>
        find countries:{' '}
        <input 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      
      <div style={{ marginTop: '20px' }}>
        {searchQuery === '' && <p>Type a country name to begin searching...</p>}

        {searchQuery !== '' && countriesToShow.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {/* Scenario C: Between 2 and 10 matches */}
        {searchQuery !== '' && countriesToShow.length <= 10 && countriesToShow.length > 1 && (
          <ul>
            {countriesToShow.map(country => (
              <li key={country.cca3} style={{ marginBottom: '5px' }}>
                {country.name.common}{' '}
                <button onClick={() => setSearchQuery(country.name.common)}>
                  show
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Scenario D: Exactly 1 Match -> Cleanly rendered by our weather sub-component */}
        {searchQuery !== '' && countriesToShow.length === 1 && (
          <CountryDetails country={countriesToShow[0]} />
        )}
      </div>
    </div>
  )
}

export default App
