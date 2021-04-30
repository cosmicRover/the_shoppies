import "./App.css";
import SearchBox from "./components/search_box";
import NominationsBar from "./components/nominations_bar";
import MoviesBar from "./components/movies_bar";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "./keys"

const App = () => {
  //simple alert display with custom message
  const notify = (message) => toast(`${message}`);

  //fetches data from the database
  function onValueChange(value) {
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=${config.key.omdb}`).then(
      function (response) {
        if (response.status === 200) {
          response.json().then(function (data) {
            const isAvailable = data["Response"];

            if (isAvailable === "True") {
              const items = data["Search"];
              items.forEach((ele, _) => {
                console.log(ele);

                const newMovie = {
                  name: ele["Title"],
                  id: ele["imdbID"],
                  isNominated: false,
                  year: ele["Year"],
                };
                updateMovies((oldList) => [...oldList, newMovie]);
              });
            } else {
              console.log("movie not avaialble");
              updateMovies([]);
            }
          });
        }
      }
    );
  }

  //nominations DS and hooks
  var nominationsData = [];
  const [nominations, updateNominations] = useState(nominationsData);

  const handleRemoveItem = (e) => {
    const movie = nominations[e];
    movie.isNominated = false;
    console.log("handle remove gets called on " + movie);
    updateNominations(nominations.filter((item) => item.id !== movie.id));
  };

  //movies DS and hooks
  var moviesData = [];
  const [movies, updateMovies] = useState(moviesData);

  const handleNominate = (e) => {
    const item = movies[e];
    item.isNominated = true;
    console.log("handle add nominations gets called on " + item);
    updateNominations((oldList) => [...oldList, item]);
    console.log(nominations.length);
    if (nominations.length === 4) {
      notify("You have nominated 5 movies!");
    }
  };

  return (
    <div class="center">
      <Container>
        <ToastContainer />
        <SearchBox onValueChange={(e) => onValueChange(e.target.value)} />
        <Row>
          <Col>
            <h4>Your results</h4>
            <MoviesBar
              values={movies}
              handleNominate={(e) => handleNominate(e)}
            />
          </Col>
          <Col>
            <h4>Nominations</h4>
            <NominationsBar
              values={nominations}
              handleRemove={(e) => handleRemoveItem(e)}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
