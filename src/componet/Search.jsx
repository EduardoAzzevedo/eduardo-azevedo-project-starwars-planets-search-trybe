import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/starWarsContext';

function Search() {
  const {
    setFiltredPlanetsList,
    numericFilter,
    setNumericFilter,
    order,
    setOrder,
    onHandleOrder,
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
  const onHandleChangeOrder = ({ target }) => {
    setOrder({
      ...order,
      [target.name]: target.value,
    });
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
      <label htmlFor="column_order">
        Ordenar:
        <select
          id="column_order"
          name="column"
          value={ order.column }
          onChange={ onHandleChangeOrder }
          data-testid="column-sort"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="order-ASC">
        <input
          type="radio"
          id="order-ASC"
          name="order"
          value="ASC"
          checked={ order.order === 'ASC' }
          onChange={ onHandleChangeOrder }
          data-testid="column-sort-input-asc"
        />
        Ascendente
      </label>

      <label htmlFor="order-DESC">
        <input
          type="radio"
          id="order-DESC"
          name="order"
          value="DESC"
          checked={ order.order === 'DESC' }
          onChange={ onHandleChangeOrder }
          data-testid="column-sort-input-desc"
        />
        Descendente
      </label>

      <button
        type="button"
        onClick={ onHandleOrder }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>

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
