import React, { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function Table() {
  const { filtredPlanets } = useContext(StarWarsContext);
  if (!filtredPlanets) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Filmes</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filtredPlanets ? (
            filtredPlanets.map(({
              name,
              rotation_period: rotataionPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr key={ name }>
                <td data-testid="planet-name">{ name }</td>
                <td>{ rotataionPeriod }</td>
                <td>{ orbitalPeriod }</td>
                <td>{ diameter }</td>
                <td>{ climate }</td>
                <td>{ gravity }</td>
                <td>{ terrain }</td>
                <td>{ surfaceWater }</td>
                <td>{ population }</td>
                <td>{ films }</td>
                <td>{ created }</td>
                <td>{ edited }</td>
                <td>{ url }</td>
              </tr>
            )))
            : (<p>Carregando...</p>)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
