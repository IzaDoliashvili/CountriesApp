import React from "react";
import { Link } from "react-router-dom";

const CountryItem: React.FC<{ countryName: string; id: string }> = ({
  countryName,
  id,
}) => {
  return (
    <Link to={`/ka/country/${id}`}>
      <div>{countryName}</div>
    </Link>
  );
};

export default CountryItem;
