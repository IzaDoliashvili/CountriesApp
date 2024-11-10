export type CountriesListResponse = Array<{
  imageSrc: string | undefined;
  capital: ReactNode;
  vote: ReactNode;
  id: string;
  name: string;
  visited: boolean;
}>;
