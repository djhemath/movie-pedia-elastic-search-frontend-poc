import { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/movies.context";
import ApiService from "../../services/api.service";
import FilterService from "../../services/filter.service";

export default function SearchBar(props) {
    const [ searchText, setSearchText ] = useState('');
    const moviesContext = useContext(MoviesContext);

    const onSearch = (e) => {
        e.preventDefault();

        FilterService.page = 0;
        FilterService.searchText = searchText;
        ApiService.search()
        .then(data => {
            moviesContext.setMovies(data);
        });
    }

    return (
        <form className="searchbar-container" onSubmit={onSearch}>
            <input placeholder="Search by movie name, crew" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
            <button type="submit">Search</button>
        </form>
    );
}