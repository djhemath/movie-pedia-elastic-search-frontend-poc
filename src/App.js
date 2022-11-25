import { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter/Filter';
import { Main } from './components/Main/Main';
import { FiltersContext } from './contexts/filters.context';
import { InitialValue, MoviesContext } from './contexts/movies.context';
import ApiService from './services/api.service';

function App() {

  const [ moviesData, setMoviesData ] = useState(InitialValue);

  const [ filters, setFilters ] = useState([]);

  function setMovies(data) {
    setMoviesData({
      lastResultTook: data.data.searchDuration,
      total: data.data.total,
      movies: data.data.movies
    });
  }

  useEffect(() => {
    ApiService.search()
    .then(data => {
      console.log(data);
      setMovies(data);
      setFilters(data.data.facets);
    })
  },[]);

  return (
    <MoviesContext.Provider value={{value: moviesData, setMovies}}>
      <FiltersContext.Provider value={{value: filters, setFilters}}>
        <div className="App">
          <Filter />
          <Main />
        </div>
      </FiltersContext.Provider>
    </MoviesContext.Provider>
  );
}

export default App;
