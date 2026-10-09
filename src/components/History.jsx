import React from "react";
import Card from "./Card";

const History = ({ history }) => {
  return (
    history.length > 0 && (
      <>
        <h4>History: </h4>
        <ul className="list">
          {history.map((media, index) => (
            <Card key={index} media={media}>
              {media.name ?? media.title}
            </Card>
          ))}
        </ul>
      </>
    )
  );
};

export default History;
