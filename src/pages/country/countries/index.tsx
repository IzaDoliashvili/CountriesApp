import React from "react";
import { Link } from "react-router-dom";

const CountryItem: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  return (
    <Link to={`/ka/country/${id}`}>
      <div>{name}</div>
    </Link>
  );
};

export default CountryItem;
