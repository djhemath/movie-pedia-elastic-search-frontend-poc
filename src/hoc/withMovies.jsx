import { useContext } from "react";
import { MoviesContext } from "../contexts/movies.context";

export default function withMovies(Component) {
    return (props) => (
        <MoviesContext.Consumer>
            {
                (context) => <Component {...props} moviesCtx={context} />
            }
        </MoviesContext.Consumer>
    );
}