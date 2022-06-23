import React, { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function Search() {
  const { setFiltredPlanetsList } = useContext(StarWarsContext);

  const onHandleFilter = ({ target }) => {
    setFiltredPlanetsList({ filterByName: { name: target.value.toLowerCase() } });
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Search for a planet"
        onChange={ onHandleFilter }
      />
    </div>
  );
}

export default Search;
