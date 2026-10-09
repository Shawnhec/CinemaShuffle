import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { MOVIE_GENRES, TV_GENRES, LANGUAGES } from "./constants";
import History from "./components/History";
import ExcludedList from "./components/ExcludedList";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("movie");
  const [excludedGenres, setExcludedGenres] = useState(new Set());
  const [excludedLanguages, setExcludedLanguages] = useState(new Set());
  const [history, setHistory] = useState([]);

  async function fetchBasedOnMediaType(type) {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    let baseURL = "";
    if(excludedGenres.size == 0 && excludedLanguages.size == 0) {
      baseURL = `https://api.themoviedb.org/3/discover/${type}` +
      `?api_key=${ACCESS_KEY}` +
      `&page=${randomPage}`;
    } 
    else {
      const allowedLanguages = Object.keys(LANGUAGES).filter(
        (lang) => !excludedLanguages.has(lang)
      );
      
      const randomLanguage = allowedLanguages[
        Math.floor(Math.random() * allowedLanguages.length)
      ];

      baseURL = `https://api.themoviedb.org/3/discover/${type}` +
      `?api_key=${ACCESS_KEY}` +
      `&without_genres=${[...excludedGenres].join(",")}` +
      `&with_original_language=${randomLanguage}`
    }
    
    const response = await fetch(baseURL);
    const data = await response.json();
    const randomIdx = Math.floor(Math.random() * data.results.length);
    const item = data.results[randomIdx];
    setMedia(item);
    setHistory((prev) => [item, ... prev]);

    console.log("hi");
  }

  useEffect(() => {
    fetchBasedOnMediaType(mediaType);
  }, [mediaType]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>CinemaShuffle</h1>
        <h2>Discover Your Next Favorite Movie</h2>
      </header>

      <div className="main-container">
        <aside className="sidebar left">
          <History history={history}></History>
        </aside>

        <main className="center">
          {media ? (
            <article className="info-container">
              {media.poster_path ? (
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                  alt={media.title ?? media.name}
                />
              ) : (
                <div className="no-poster">No poster found</div>
              )}

              <div className="info-details">
                <h3>{media.title ?? media.name}</h3>
                <div className="info-meta">
                  <p>Language: {LANGUAGES[media.original_language]}</p>
                  {mediaType == "movie" ? (
                    <p>Release Date: {media.release_date}</p>
                  ) : (
                    <p>First Date on Air: {media.first_air_date}</p>
                  )}
                  <p>Rating: {media.vote_average}</p>
                </div>
                <h4>Overview</h4>
                <p className="overview">{media.overview}</p>
              </div>
            </article>
          ) : (
            <p className="status">Sorry, something went wrong.</p>
          )}

          <button id="next-button" onClick={() => fetchBasedOnMediaType(mediaType)}>
            Next
          </button>

          <Form
            genres={mediaType === "movie" ? MOVIE_GENRES : TV_GENRES}
            mediaType={mediaType}
            languages={LANGUAGES}
            setMediaType={setMediaType}
            excludedGenres={excludedGenres}
            excludedLanguages={excludedLanguages}
            setExcludedGenres={setExcludedGenres}
            setExcludedLanguages={setExcludedLanguages}
          ></Form>
        </main>

        <aside className="sidebar right">
          <ExcludedList
            genres={mediaType === "movie" ? MOVIE_GENRES : TV_GENRES}
            mediaType={mediaType}
            languages={LANGUAGES}
            setMediaType={setMediaType}
            excludedGenres={excludedGenres}
            excludedLanguages={excludedLanguages}
            setExcludedGenres={setExcludedGenres}
            setExcludedLanguages={setExcludedLanguages}
          ></ExcludedList>
        </aside>
      </div>
    </div>
  );
}

export default App;
