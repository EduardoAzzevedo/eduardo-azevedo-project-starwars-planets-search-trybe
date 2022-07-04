import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import StarWarsContext from './starWarsContext';
import starWarsFetch from '../helper/starWarsAPI';

function StarWarsProvider({ children }) {
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

  const initialOrder = {
    column: 'population',
    order: 'ASC',
  };
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    const fetchApi = async () => {
      const dataApi = await starWarsFetch();
      const returnSort = -1;
      const initOrder = dataApi
        .sort((a, b) => (a.name > b.name ? 1 : returnSort));
      setPlanets([...initOrder]);
      setFiltredPlanets(initOrder);
    };
    fetchApi();
  }, []);

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

  const onHandleOrder = () => {
    const unknown = filtredPlanets
      .filter((planet) => planet[order.column] === 'unknown');
    const known = filtredPlanets
      .filter((planet) => planet[order.column] !== 'unknown');
    const filterToSort = [...known, ...unknown];

    const planetByOrder = filterToSort.sort((a, b) => {
      const column1 = a[order.column];
      const column2 = b[order.column];
      if (order.order === 'ASC') {
        return column1 - column2;
      }
      return column2 - column1;
    });
    setFiltredPlanets([...planetByOrder]);
  };

  const context = {
    filtredPlanets,
    setFiltredPlanetsList,
    numericFilter,
    setNumericFilter,
    order,
    setOrder,
    onHandleOrder,
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
