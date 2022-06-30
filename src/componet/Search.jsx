import React, { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function Search() {
  const {
    setFiltredPlanetsList,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    value,
    setValue,
    numericFilter,
    setNumericFilter,
  } = useContext(StarWarsContext);

  const onHandleFilter = ({ target }) => {
    setFiltredPlanetsList({ filterByName: { name: target.value.toLowerCase() } });
  };

  const onHandleNumbFilter = () => {
    const clickSelectFilter = {
      column: columnFilter,
      comparisonFilter,
      value,
    };
    setNumericFilter({
      filterByNumericValues: [...numericFilter.filterByNumericValues, clickSelectFilter],
    });
  };
  const columnArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Search for a planet"
        onChange={ onHandleFilter }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumnFilter(target.value) }
      >
        {columnArray.map((column) => <option key={ column }>{ column }</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparisonFilter(target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        onChange={ ({ target }) => setValue(target.value) }
        data-testid="value-filter"
        value={ value }
        type="number"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onHandleNumbFilter }
      >
        Filter
      </button>
      {numericFilter.filterByNumericValues.map((filter, ind) => (
        <p key={ `${filter.column} ${ind}` }>
          {`${filter.column} ${filter.comparisonFilter} ${filter.value}`}
        </p>
      ))}
    </div>
  );
}

export default Search;
