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
  const [numericFilter, setNumericFilter] = useState({
    filterByNumericValues: [],
  });

  useEffect(() => {
    setPlanets(starWarsPlanetsAPI);
    setFiltredPlanets(starWarsPlanetsAPI);
  }, [starWarsPlanetsAPI]);

  useEffect(() => {
    const planetFiltred = planets.filter((planet) => planet.name.toLowerCase()
      .includes(filtredPlanetsList.filterByName.name));
    // Mentoria Luá;
    const filtredValue = numericFilter.filterByNumericValues
      .reduce((acc, filter) => acc.filter((planet) => {
        switch (filter.comparison) {
        case 'maior que':
          return planet[filter.column] > Number(filter.value);
        case 'menor que':
          return planet[filter.column] < Number(filter.value);
        case 'igual a':
          return planet[filter.column] === filter.value;
        default:
          return true;
        }
      }), planetFiltred);
    setFiltredPlanets(filtredValue);
  }, [filtredPlanetsList, numericFilter]);

  const context = {
    filtredPlanets,
    setFiltredPlanetsList,
    numericFilter,
    setNumericFilter,
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
