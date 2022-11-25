import React from "react";
import { FiltersContext } from "../../contexts/filters.context";
import withMovies from "../../hoc/withMovies";
import ApiService from "../../services/api.service";
import FilterService from "../../services/filter.service";

class Filter extends React.Component {

    ratingOptions = (new Array(10)).fill('*').map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>);
    durationOptions = (new Array(10)).fill('*').map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>);
    yearOptions = (new Array(2022-1900)).fill('*').map((_, i) => <option key={i+1900} value={i+1900}>{i+1900}</option>).reverse();

    static contextType = FiltersContext;

    constructor(props) {
        super(props);

        this.state = {
            ratingMin: null,
            ratingMax: null,
            country: null,
            language: null,
            year: null,
            genre: [],
            durationMin: null,
            durationMax: null
        };

        this.ratingOptions.unshift(<option key={null} value={null}>Select a rating</option>);
        this.durationOptions.unshift(<option key={null} value={null}>Select a duration</option>);
        this.yearOptions.unshift(<option key={null} value={null}>Select an year</option>);
    }

    onFilterChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.updateFilterService();
        })
    }

    onGenreChange = (e) => {
        let genres = this.state.genre;
        const selectedGenre = e.target.value;

        if(genres.includes(selectedGenre)) {
            genres = genres.filter(g => g !== selectedGenre);
        } else {
            genres.push(selectedGenre);
        }

        this.setState({
            genre: genres
        }, () => {
            this.updateFilterService();
        });
    }

    updateFilterService = () => {
        if(this.state.ratingMin) {
            FilterService.ratingMin = Number(this.state.ratingMin);
        }

        if(this.state.ratingMax) {
            FilterService.ratingMax = Number(this.state.ratingMax);
        }

        if(this.state.country) {
            FilterService.country = this.state.country;
        }

        if(this.state.language) {
            FilterService.language = this.state.language;
        }

        if(this.state.year) {
            FilterService.year = Number(this.state.year);
        }

        if(this.state.genre) {
            FilterService.genre = this.state.genre;
        }

        if(this.state.durationMin) {
            FilterService.durationMin = Number(this.state.durationMin);
        }

        if(this.state.durationMax) {
            FilterService.durationMax = Number(this.state.durationMax);
        }
    }

    onFilter = (e) => {
        e.preventDefault();
        FilterService.page = 0;
        ApiService.search()
        .then(data => {
            console.log(data);
            this.props.moviesCtx.setMovies(data);
        })
    }

    render() {
        let value = this.context.value;

        console.log(value)

        return (
            <form className="filter-container" onSubmit={this.onFilter}>
                <div className="filters">

                    {
                        value.rating
                        ?
                            <div className="filter">
                                <div className="filter-title">Rating</div>
                                <div className="filter-body">
                                    <div className="range-filter">
                                        <select name="ratingMin" value={this.state.ratingMin} onChange={this.onFilterChange}>
                                            { this.ratingOptions }
                                        </select>

                                        <span>-</span>

                                        <select name="ratingMax" value={this.state.ratingMax} onChange={this.onFilterChange}>
                                            { this.ratingOptions }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        :
                            null
                    }

                    {
                        value.country
                        ?
                            <div className="filter">
                                <div className="filter-title">Country</div>
                                <div className="filter-body">
                                    <div className="single-filter">
                                        <select name="country" value={this.state.country} onChange={this.onFilterChange}>
                                        <option key={null} value={null}>Select a country</option>
                                            {
                                                value.country.map(c => {
                                                    return (<option key={c.key} value={c.key}>{c.key}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        :
                            null
                    }

                    {
                        value.language
                        ?
                            <div className="filter">
                                <div className="filter-title">Language</div>
                                <div className="filter-body">
                                    <div className="single-filter">
                                        <select name="language" value={this.state.language} onChange={this.onFilterChange}>
                                            <option key={null} value={null}>Select a language</option>
                                            {
                                                value.language.map(c => {
                                                    return (<option key={c.key} value={c.key}>{c.key}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        :
                            null
                    }

                    {
                        value.year
                        ?
                            <div className="filter">
                                <div className="filter-title">Year</div>
                                <div className="filter-body">
                                    <div className="single-filter">
                                        <select name="year" onChange={this.onFilterChange}>
                                            { this.yearOptions }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        :
                            null
                    }

                    {
                        value.genre
                        ?
                            <div className="filter" style={{height: 300, overflowY: 'auto'}}>
                                <div className="filter-title">Genre</div>
                                <div className="filter-body">
                                    <div className="checkbox-filter">

                                        {
                                            value.genre.map(g => {
                                                return(
                                                    <div className="filter-checkbox">
                                                        <input type="checkbox" name="genre" id={g.key} value={g.key} onChange={this.onGenreChange} checked={this.state.genre.includes(g.key)} />
                                                        <label for={g.key}>{g.key}</label>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        :
                            null
                    }

                    {
                        value.duration
                        ?
                            <div className="filter">
                                <div className="filter-title">Duration</div>
                                <div className="filter-body">
                                    <div className="range-filter">
                                        <select name="durationMin" value={this.state.durationMin} onChange={this.onFilterChange}>
                                            { this.durationOptions }
                                        </select>

                                        <span>-</span>

                                        <select name="durationMax" value={this.state.durationMax} onChange={this.onFilterChange}>
                                            { this.durationOptions }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        :
                            null
                    }
                </div>

                <div className="filter-btn-container">
                    <button type="submit">Filter</button>
                </div>
            </form>
        );
    }
}

const FilterComponent = withMovies(Filter);

export default FilterComponent;