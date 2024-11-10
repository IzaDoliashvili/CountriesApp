/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/api";
import { CountriesListResponse } from "@/api/countries";

export const getCountries = () => {
  return httpClient.get<CountriesListResponse>("/countries").then((res) => {
    return res.data;
  });
};

export const getSingleCountry = (id: string) => () => {
  return httpClient.get(`/countries/${id}`).then((res) => {
    return res;
  });
};

export const updateCountry = ({ id, payload }: { id: any; payload: any }) => {
  return httpClient.patch(`/countries/${id}`, payload).then((res) => res.data);
};

export const deleteCountry = (id: string | number) => {
  return httpClient.delete(`/countries/${id}`);
};

// import { Country } from "@/types";
// import { httpClient } from "..";

// export const getCountriesData = async (): Promise<Country[]> => {
//   try {
//     const response = await httpClient.get<Country[]>("/countries");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching countries data:", error);
//     throw new Error("Failed to fetch countries data.");
//   }
// };

// export const getSingleCountryData = async (id: string): Promise<Country> => {
//   try {
//     const response = await httpClient.get<Country>(`/countries/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching countries data:", error);
//     throw new Error("Failed to fetch countries data.");
//   }
// };

// export const updateCountry = async ({
//   id,
//   payload,
// }: {
//   id: string;
//   payload: Partial<Country>;
// }): Promise<Country> => {
//   try {
//     const response = await httpClient.patch<Country>(
//       `/countries/${id}`,
//       payload,
//     );
//     return response.data; // The Country object is returned
//   } catch (error) {
//     console.error(`Error updating country with ID ${id}:`, error);
//     throw new Error("Failed to update country.");
//   }
// };

// export const createCountry = async (payload: Country): Promise<Country> => {
//   try {
//     const response = await httpClient.post<Country>("/countries", payload);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating country:", error);
//     throw new Error("Failed to create country.");
//   }
// };

// export const deleteCountry = async (id: string): Promise<void> => {
//   try {
//     const response = await httpClient.delete<void>(`/countries/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting country with ID ${id}:`, error);
//     throw new Error("Failed to delete country.");
//   }
// };
