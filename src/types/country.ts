export type Country = {
  name: {
    common: string;
    official: string;
  };
  translations?: {
    por?: {
      official: string;
      common: string;
    };
  };
  flags: {
    png?: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  cca3: string;
};
