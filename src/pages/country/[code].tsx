import { GetServerSideProps } from 'next';
import { getCountryByCode } from '../../services/countries';
import { Country } from '../../types/country';
import styles from './CountryDetail.module.css';
import Link from 'next/link';

const getRegionImage = (region: string) => {
  const normalized = region.toLowerCase();

  if (normalized.includes('europe')) return '/assets/europe.png';
  if (normalized.includes('africa')) return '/assets/africa.png';
  if (normalized.includes('asia')) return '/assets/asia.png';
  if (normalized.includes('america')) {
    if (normalized.includes('south')) return '/assets/south-america.png';
    if (normalized.includes('north')) return '/assets/north-america.png';
    return '/assets/america.png';
  }
  if (normalized.includes('oceania')) return '/assets/oceania.png';
  if (normalized.includes('antarctica')) return '/assets/oceania.png'; // Ajuste para Antártida
  return '/assets/default.png';
};

type Props = {
  country: Country;
};

export default function CountryDetailPage({ country }: Props) {
  const name = country.translations?.por?.official || country.name.official;
  const flag = country.flags?.svg || country.flags?.png;
  const region = country.region;
  const regionImage = getRegionImage(region);
  const subregion = country.subregion || 'Não informado';
  const population = country.population.toLocaleString('pt-BR');

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'Não informado';

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(c => `${c.name} (${c.symbol})`)
        .join(', ')
    : 'Não informado';

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Voltar
      </Link>

      <div className={styles.card}>
        <img
          src={regionImage}
          alt={`Imagem da região ${region}`}
          className={styles.regionImage}
        />

        <div className={styles.content}>
          <div className={styles.flagWrapper}>
            <img src={flag} alt={`Bandeira de ${name}`} className={styles.flag} />
          </div>
          <h1 className={styles.name}>{name}</h1>
          <p><strong>Região:</strong> {region}</p>
          <p><strong>Sub-região:</strong> {subregion}</p>
          <p><strong>População:</strong> {population} habitantes</p>
          <p><strong>Moeda(s):</strong> {currencies}</p>
          <p><strong>Línguas faladas:</strong> {languages}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.params?.code as string;
  const country = await getCountryByCode(code);

  if (!country) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      country,
    },
  };
};
