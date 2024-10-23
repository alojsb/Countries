const { writeFileSync } = require('fs');
const { join } = require('path');

// List the fields you want to save here
const getCountries = async () => {
  const fetch = (await import('node-fetch')).default; // Use dynamic import for node-fetch
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();

  // Format the country data
  const formattedCountries = countries.map(country => ({
    name: country.name.common,
    threeLetterISOCountryCode: country.cca3,
    population: country.population,
    area: country.area,
    continent: country.continents.join(', '),
    capital: country.capital ? country.capital[0] : 'N/A',
    landlocked: country.landlocked,
    borders: country.borders || [],
  }));

  // Save the data to src/countries.json
  const filePath = join(__dirname, '../src/countries.json');
  writeFileSync(filePath, JSON.stringify(formattedCountries, null, 2));

  console.log('Data saved to src/countries.json');
};

getCountries();