const urlApi = 'https://swapi-trybe.herokuapp.com/api/planets/';

const starWarsFetch = async () => {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export default starWarsFetch;
