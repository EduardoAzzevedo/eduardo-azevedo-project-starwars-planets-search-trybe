import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import StarWarsContext from './starWarsContext';
import StarWarsAPI from '../helper/starWarsAPI';

function StarWarsProvider({ children }) {
  const starWarsPlanetsAPI = StarWarsAPI();
  const [planets, setPlanets] = useState([]);
  const [filtredPlanets, setFiltredPlanets] = useState([]);
  const [filtredPlanetsList, setFiltredPlanetsList] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    setPlanets(starWarsPlanetsAPI);
    setFiltredPlanets(starWarsPlanetsAPI);
  }, [starWarsPlanetsAPI]);

  useEffect(() => {
    const filtredPlanet = planets.filter(({ name }) => name.toLowerCase()
      .includes(filtredPlanetsList.filterByName.name));
    setFiltredPlanets(filtredPlanet);
  }, [filtredPlanetsList]);

  const context = {
    filtredPlanets,
    setFiltredPlanetsList,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: Proptypes.node.isRequired,
};

export default StarWarsProvider;
