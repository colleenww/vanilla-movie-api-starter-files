import { genres } from "./genre";
import { DOMSelectors } from "./DOM";
//button selectors
//variable for page?
//function for changed page?
//next.addeventlistener
//update page variable
//re-run query()
//variable for page?
let pageNumber = 1;
//function for changed page?

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    const nextPage = function () {
      //next.addeventlistener
      DOMSelectors.btnNext.addEventListener("click", function () {
        //update page variable
        pageNumber++;
        //re-run query()
        searchQuery(pageNumber);
      });
    };
    const previousPage = function () {
      //next.addeventlistener
      DOMSelectors.btnPrev.addEventListener("click", function () {
        //update page variable
        pageNumber--;
        //re-run query()
        searchQuery(pageNumber);
      });
    };
    previousPage();
    nextPage();
    e.preventDefault();

    const searchParams = DOMSelectors.searchArea.value;
    const searchQuery = async function (pageNumber) {
      console.log(pageNumber);
      DOMSelectors.grid.innerHTML = "";
      const key = `1fd276ec57b4baedacae00246e5cf4b7`;
      const query = `https://api.themoviedb.org/3/search/movie?api_key=1fd276ec57b4baedacae00246e5cf4b7&language=en-US&query=${searchParams}&page=${pageNumber}&include_adult=false`;
      try {
        const response = await fetch(query);
        const data = await response.json();

        data.results.forEach((movie) => {
          let genreArr = [];
          const addGenre = function () {
            genres.forEach((element) => {
              if (movie.genre_ids.includes(element.id)) {
                genreArr.push(element.name);
                return genreArr;
              }
            });
          };
          addGenre();
          DOMSelectors.grid.insertAdjacentHTML(
            "beforeend",
            `<div class="movie-card">
          <div class="movie-card-front">
            <img
              src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
              alt=""
              class="poster"
            />
          </div>
          <div class="movie-card-back">
            <h3 class="movie-card-header">${movie.original_title}</h3>
            <div class="score-box">
              <p class="user-score">Community Score</p>
              <p class="user-score">${movie.vote_average}</p>
            </div>
    
            <div class="release-box">
              <p class="release-date">Released</p>
              <p class="release-date">${movie.release_date}</p>
            </div>
    
            <div class="movie-genres">
              <div>${genreArr}</div>
            </div>
          </div>
        </div>`
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    //async function
    searchQuery();
  });
};
listen();
