import { useContext } from "react";
import { MoviesContext } from "../../contexts/movies.context";
import ApiService from "../../services/api.service";
import FilterService from "../../services/filter.service";
import MovieCard from "./MovieCard";

export default function MovieList(props) {
    const moviesContext = useContext(MoviesContext);

    const onLoadMore = () => {
        FilterService.loadMore();
        ApiService.search()
        .then(data => {
            data.data.movies = [...moviesContext.value.movies, ...data.data.movies]
            moviesContext.setMovies(data);
        });
    }

    return (
        <div className="movie-list-container">
            <div className="result-stats">
                <div>
                    {FilterService.limit} results in <b>{moviesContext.value.lastResultTook}ms</b>
                </div>

                <div>Viewing <b>{moviesContext.value.movies.length}</b> movies</div>
            </div>

            <div className="movie-list">
                {
                    moviesContext.value.movies.map(movie => {
                        return (
                            <MovieCard
                                {...movie}
                                key={movie.id}
                            />
                        );
                    })
                }
            </div>

            <div className="load-more-container">
                <button onClick={onLoadMore}>Load more</button>
            </div>
        </div>
    );
}