import React from 'react'

const Card = ({media}) => {
  return (
    <li className="card">
      {media.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
          alt={media.name ?? media.title}
        />
      ) : (
        <div className="no-poster">No Image</div>
      )}
      <p>{media.name ?? media.title}</p>
    </li>
  );
};




export default Card