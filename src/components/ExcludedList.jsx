import React from "react";
import Option from "./Option";
import { MOVIE_GENRES, TV_GENRES, LANGUAGES } from "../constants";

const ExcludedList = ({
  mediaType,
  setMediaType,
  genres,
  languages,
  excludedGenres,
  setExcludedGenres,
  excludedLanguages,
  setExcludedLanguages,
}) => {
  function remove(excludedList, setExcludedList, id) {
    const next = new Set(excludedList);
    next.delete(id);
    setExcludedList(next);
  }

  return (
    <div>
      <h4>Banned Contents: </h4>
      {excludedGenres.size > 0 && (
        <>
          <h5>Banned Genres: </h5>
          <ul className="list">
            {[...excludedGenres].map((id) => (
              <Option
                key={id}
                onClick={() => remove(excludedGenres, setExcludedGenres, id)}
              >
                {genres[id]}
              </Option>
            ))}
          </ul>
        </>
      )}

      {excludedLanguages.size > 0 && (
        <>
          <h5>Banned Languages: </h5>
          <ul className="list">
            {[...excludedLanguages].map((id) => (
              <Option
                key={id}
                onClick={() =>
                  remove(excludedLanguages, setExcludedLanguages, id)
                }
              >
                {languages[id]}
              </Option>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ExcludedList;
