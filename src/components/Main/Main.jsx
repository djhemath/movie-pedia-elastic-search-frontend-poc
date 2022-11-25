import React from "react";
import Logo from "./Logo";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";

export function Main(props) {
    return (
        <main className="main-container">
            <Logo />
            <SearchBar />
            <MovieList />
        </main>
    );
}