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
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [value, setValue] = useState(0);
  const [numericFilter, setNumericFilter] = useState({
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: 0,
      },
    ],
  });

  useEffect(() => {
    setPlanets(starWarsPlanetsAPI);
    setFiltredPlanets(starWarsPlanetsAPI);
  }, [starWarsPlanetsAPI]);

  useEffect(() => {
    const filtredPlanet = planets.filter(({ name }) => name.toLowerCase()
      .includes(filtredPlanetsList.filterByName.name));
    setFiltredPlanets(filtredPlanet);
    // Mentoria Luá;
    const filtredValue = numericFilter.filterByNumericValues
      .reduce((acc, filter) => acc.filter((planet) => {
        switch (filter.comparisonFilter) {
        case 'maior que':
          return planet[filter.column] > Number(filter.value);
        case 'menor que':
          return planet[filter.column] < Number(filter.value);
        case 'igual a':
          return planet[filter.column] === filter.value;
        default:
          return true;
        }
      }), filtredPlanet);
    setFiltredPlanets(filtredValue);
  }, [filtredPlanetsList, numericFilter]);

  const context = {
    filtredPlanets,
    setFiltredPlanetsList,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    value,
    setValue,
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
