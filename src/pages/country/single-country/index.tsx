import { getSingleCountry } from "@/api/countries/index";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const SingleCountryView = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: [id],
    queryFn: getSingleCountry(id as string),
    gcTime: 1000 * 60,
    staleTime: 1000 * 60,
  });

  console.log(data);

  return <div style={{ margin: 48 }}>{data?.data?.name}</div>;
};

export default SingleCountryView;
