import React, { Component } from 'react';
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from '../services/fakeGenreService';
import _ from "lodash";

class Counter extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage:1,
    sortColumn: { path: "title", order: "asc" }

  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres});
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    // console.log(page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    // console.log(genre);
    console.log(this.state);
    this.setState({ selectedGenre: genre, currentPage: 1});
  };

  handleSort = sortColumn => {
    console.log(sortColumn);
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filtered =
      //only apply filter if selectedGenre has an ID else return all the movies
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
      //these are the movies displayed on the UI
      //paginate returns section of movie array ,depending on current array pointer
      const movies = paginate(sorted, currentPage, pageSize);

      return { totalCount: filtered.length, data: movies };
  }

    render() {
      const { length: count } = this.state.movies;
      const { pageSize, currentPage,sortColumn } = this.state;

      if (count === 0) return <p>There are no movies in the database.</p>;
       
      const { totalCount, data: movies } = this.getPagedData();
      return (
        <div className="row">
          <div className="col-3">
            <ListGroup
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
              items={this.state.genres}
            />
          </div>

          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>

            <p>Showing {totalCount} movies in the database.</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      );
    }

}
 
export default Counter;