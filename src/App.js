import React from 'react';
import Search from './componet/Search';
import Table from './componet/Table';
import StarWarsProvider from './context/starWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Search />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
