import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async (): Promise<Country[]> => {
  const res = await fetch(
    `${BASE_URL}/all?fields=name,translations,flags,region,subregion,languages,currencies,cca3,population,capital`
  );

  if (!res.ok) {
    throw new Error('Erro ao buscar países');
  }

  const data = await res.json();
  return data;
};

export const getCountryByCode = async (code: string): Promise<Country | null> => {
  const res = await fetch(
    `${BASE_URL}/alpha/${code}?fields=name,translations,flags,region,subregion,languages,currencies,cca3,population,capital`
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data as Country;
};
