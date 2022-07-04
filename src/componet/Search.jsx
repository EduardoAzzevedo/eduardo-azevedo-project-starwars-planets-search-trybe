import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/starWarsContext';

function Search() {
  const {
    setFiltredPlanetsList,
    numericFilter,
    setNumericFilter,
  } = useContext(StarWarsContext);
  const columnArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [columns, setColumns] = useState(columnArray);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const onHandleFilter = ({ target }) => {
    setFiltredPlanetsList({ filterByName: { name: target.value.toLowerCase() } });
  };

  const onHandleNumbFilter = () => {
    const clickSelectFilter = {
      column: columnFilter,
      comparison,
      value,
    };
    setNumericFilter({
      filterByNumericValues: [...numericFilter.filterByNumericValues, clickSelectFilter],
    });
    const removeColumnFilter = columns.filter((column) => column !== columnFilter);
    setColumns(removeColumnFilter);
  };

  const onHandleSelectDeleteFilter = (selectedFilter) => {
    const selectToDelete = numericFilter.filterByNumericValues
      .filter((_filter, index) => index !== selectedFilter);
    setNumericFilter({ filterByNumericValues: selectToDelete });
    const filtersArray = selectToDelete.map((filter) => filter.column);
    const newArrayColumn = columnArray.filter((column) => !filtersArray.includes(column));
    setColumns(newArrayColumn);
  };

  const onHandleDeleteAllFilter = () => {
    const filterBase = {
      filterByNumericValues: [{
        column: '',
        comparison: '',
        value: 0,
      }],
    };
    setNumericFilter(filterBase);
    setColumns(columnArray);
  };

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
        {columns.map((column) => <option key={ column }>{ column }</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
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
      <button
        type="button"
        onClick={ onHandleDeleteAllFilter }
        data-testid="button-remove-filters"
      >
        Remover todas filtragens
      </button>
      {numericFilter.filterByNumericValues.map((filter, ind) => (
        <div
          key={ `${filter.column} ${ind}` }
          data-testid="filter"
        >
          <p>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button
              type="button"
              onClick={ () => onHandleSelectDeleteFilter(ind) }
            >
              Deleta
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Search;
