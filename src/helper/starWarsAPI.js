import { useEffect, useState } from 'react';

function StarWarsAPI() {
  const [data, setData] = useState('');

  useEffect(() => {
    const responseAPI = async () => {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((planetDataAPI) => setData(planetDataAPI.results));
    };
    responseAPI();
  }, []);
  return data;
}

export default StarWarsAPI;
