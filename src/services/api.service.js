import { MoviesContext } from "../contexts/movies.context";
import FilterService from "./filter.service";

const BASE_URL = 'http://localhost:7000';
const MOVIES_URL = BASE_URL + '/movies';

class Api {

    search() {
        const queryParams = FilterService.toRequest();

        const modifiedQueryParams = {...queryParams};
        delete modifiedQueryParams.genre;

        const urlQueryParams = new URLSearchParams(modifiedQueryParams);

        queryParams?.genre?.forEach(g => {
            urlQueryParams.append('genre[]', g);
        })

        return new Promise((resolve, reject) => {
            fetch(MOVIES_URL + "?" + urlQueryParams)
            .then(res => res.json())
            .then(data => {
                if(!(data.data.movies) || data.data.movies?.length === 0) {
                    console.log("empty");
                    FilterService.page = FilterService.page - 1;
                }
                resolve(data)
            })
            .catch(err => reject(err));
        });
    }
}

const ApiService = new Api();
export default ApiService;