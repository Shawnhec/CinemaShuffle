import React from "react";
import Card from "./Card";

const History = ({ history }) => {
  return (
    history.length > 0 && (
      <>
        <h4>History: </h4>
        <ul className="list history-list">
          {history.map((media) => (
            <Card key={`${media.mediaType}-${media.id}`} media={media} />
          ))}
        </ul>
      </>
    )
  );
};

export default History;
