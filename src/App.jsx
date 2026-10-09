import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { MOVIE_GENRES, TV_GENRES, LANGUAGES } from "./constants";
import History from "./components/History";
import ExcludedList from "./components/ExcludedList";
import Option from "./components/Option";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("movie");
  const [excludedGenres, setExcludedGenres] = useState(new Set());
  const [excludedLanguages, setExcludedLanguages] = useState(new Set());
  const [history, setHistory] = useState([]);

  async function fetchBasedOnMediaType(type, isCancelled = () => false) {
    let maxPage = 500;

    // TMDB 不能排除語言，只能抓回來後自己過濾；整頁都被濾掉時就換一頁重試
    for (let attempt = 0; attempt < 5; attempt++) {
      const params = new URLSearchParams({
        api_key: ACCESS_KEY,
        page: Math.floor(Math.random() * maxPage) + 1,
      });
      if (excludedGenres.size > 0) {
        params.append("without_genres", [...excludedGenres].join(","));
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?${params}`
      );
      const data = await response.json();
      if (isCancelled()) return;

      // 篩選後總頁數可能不到 500，下一次只在實際存在的頁數裡抽
      maxPage = Math.min(data.total_pages || 1, 500);

      const results = (data.results ?? []).filter(
        (item) =>
          item.poster_path &&
          !excludedLanguages.has(item.original_language) &&
          !item.genre_ids.some((id) => excludedGenres.has(String(id)))
      );

      if (results.length > 0) {
        const picked = results[Math.floor(Math.random() * results.length)];
        const item = { ...picked, mediaType: type };
        setMedia(item);
        setHistory((prev) => [
          item,
          ...prev.filter(
            (m) => !(m.id === item.id && m.mediaType === item.mediaType)
          ),
        ]);
        return;
      }
    }

    alert("No data found. Please try again or adjust your filter settings.");
  }

  useEffect(() => {
    let ignore = false;
    fetchBasedOnMediaType(mediaType, () => ignore);
    return () => {
      ignore = true;
    };
  }, [mediaType]);

  const genreNames = media?.mediaType === "tv" ? TV_GENRES : MOVIE_GENRES;
  const mediaGenreIds = media
    ? media.genre_ids.filter((id) => genreNames[id])
    : [];

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
                  {media.mediaType === "movie" ? (
                    <p>Release Date: {media.release_date}</p>
                  ) : (
                    <p>First Date on Air: {media.first_air_date}</p>
                  )}
                  <p>Rating: {media.vote_average}</p>
                </div>

                <div className="ban-attrs">
                  <div>
                    <h4>Language</h4>
                    <ul className="button-group">
                      <Option
                        onClick={() =>
                          setExcludedLanguages(
                            new Set(excludedLanguages).add(media.original_language)
                          )
                        }
                      >
                        {LANGUAGES[media.original_language] ??
                          media.original_language}
                      </Option>
                    </ul>
                  </div>

                  {mediaGenreIds.length > 0 && (
                    <div>
                      <h4>Genres</h4>
                      <ul className="button-group">
                        {mediaGenreIds.map((id) => (
                          <Option
                            key={id}
                            onClick={() =>
                              setExcludedGenres(
                                new Set(excludedGenres).add(String(id))
                              )
                            }
                          >
                            {genreNames[id]}
                          </Option>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <p className="ban-hint">
                  Click a language or genre to add it to the ban list.
                </p>

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
