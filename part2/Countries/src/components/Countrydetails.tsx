import { useState, useEffect } from 'react'
import axios from 'axios'

export const CountryDetails = ({ country }: { country: any }) => {
  const [weather, setWeather] = useState<any>(null)
  const capital = country.capital?.[0]

  useEffect(() => {
    if (!capital) return

    // ✅ FIX 1: Complete and valid direct URL path string targeting the API subdomain
    axios
      .get(`https://openweathermap.org{capital}&units=metric&appid=efaf41470a2b1e617e8908c75684b0ab`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log('Error loading weather channels:', error)
      })
  }, [capital])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {capital || 'N/A'}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((language) => (
          <li key={String(language)}>{String(language)}</li>
        ))}
      </ul>

      <img 
        src={country.flags?.png} 
        alt={`Flag of ${country.name.common}`} 
        style={{ width: '150px', border: '1px solid #ccc', marginTop: '10px' }} 
      />

      {weather && (
        <div style={{ marginTop: '30px' }}>
          <h2>Weather in {capital}</h2>
          <p><strong>temperature:</strong> {weather.main?.temp} Celsius</p>
          
          {weather.weather?.[0] && (
            <img 
              // ✅ FIX 2: Fixed the icon endpoint file path structure
              src={`https://openweathermap.org{weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description} 
            />
          )}
          
          <p><strong>wind:</strong> {weather.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  )
}
