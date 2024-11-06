import { httpClient } from "@/api";



export const getCountries = async () => {
const res = await httpClient.get("/countries");
console.log("Fetched countries data:", res.data);
return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCountry = async ({ id, payload }: { id: string; payload: any }) => {
  const res = await httpClient.patch(`/countries/${id}`, payload);
    return res.data;
};

export const deleteCountry = (id: string | number) => {
  return httpClient.delete(`/countries/${id}`);
};

