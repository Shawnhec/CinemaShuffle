import React from "react";
import Option from "./Option";

const Form = ({
  mediaType,
  setMediaType,
  genres,
  languages,
  excludedGenres,
  setExcludedGenres,
  excludedLanguages,
  setExcludedLanguages,
}) => {
  function switchMedia(mediaType, setList) {
    setMediaType(mediaType);
    setList(new Set());
  }

  function toggle(list, setList, id) {
    setList(new Set(list).add(id));
  }

  return (
    <div className="form">
      <h3>Find Your Next Movie Based on Your Preferences</h3>
      <form>
        <div className="form-group">
          <fieldset>
            <legend>Media Type</legend>

            <label htmlFor="movie">Movie</label>
            <input
              id="movie"
              type="radio"
              name="media-type"
              value="movie"
              checked={mediaType === "movie"}
              onChange={() => switchMedia("movie", setExcludedGenres)}
            />

            <label htmlFor="tv">TV</label>
            <input
              id="tv"
              type="radio"
              name="media-type"
              value="tv"
              checked={mediaType === "tv"}
              onChange={() => switchMedia("tv", setExcludedGenres)}
            />
          </fieldset>
        </div>

        <div className="form-group">
          <fieldset>
            <legend>Genre</legend>

            {genres && (
              <ul className="button-group">
                {Object.entries(genres)
                  .filter(([id]) => !excludedGenres.has(id))
                  .map(([id, genre]) => (
                    <Option
                      key={id}
                      onClick={() =>
                        toggle(excludedGenres, setExcludedGenres, id)
                      }
                    >
                      {genre}
                    </Option>
                  ))}
              </ul>
            )}
          </fieldset>
        </div>

        <div className="form-group">
          <fieldset>
            <legend>Language</legend>

            {languages && (
              <ul className="button-group">
                {Object.entries(languages)
                  .filter((entry) => !excludedLanguages.has(entry[0]))
                  .map(([id, language]) => (
                    <Option
                      key={id}
                      onClick={() =>
                        toggle(excludedLanguages, setExcludedLanguages, id)
                      }
                    >
                      {language}
                    </Option>
                  ))}
              </ul>
            )}
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default Form;
