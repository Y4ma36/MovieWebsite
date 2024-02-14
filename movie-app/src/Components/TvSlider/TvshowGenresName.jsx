import React, { useEffect, useState } from "react";
import { getGenre } from "../../Services/api";
import { useQuery } from "@tanstack/react-query";

const TvshowGenresName = (props) => {
  const { data } = useQuery({
    queryKey: ["genre"],
    queryFn: getGenre,
  });

  const [genreName, setGenreName] = useState("");

  if (!data) {
    return null;
  }
  const { genresId } = props;

  return <div>{genreName}</div>;
};

export default TvshowGenresName;
