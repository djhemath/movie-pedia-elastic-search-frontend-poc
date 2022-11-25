import React from "react";

const InitialValue = {
    lastResultTook: null,
    movies: [],
    total: 0
};

const MoviesContext = React.createContext(InitialValue);

export { MoviesContext, InitialValue };
