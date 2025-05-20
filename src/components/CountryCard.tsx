import styles from './CountryCard.module.css';

type Props = {
  name: string;
  flag: string;
  capital: string;
  region: string;
};

const getRegionImage = (region: string): string => {
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
  if (normalized.includes('antarctica')) return '/assets/oceania.png';

  return '/assets/default.png';
};

export default function CountryCard({ name, flag, capital, region }: Props) {
  const regionImage = getRegionImage(region);

  return (
    <div className={styles.card}>
      <img src={regionImage} alt={region} className={styles.regionImage} />

      <div className={styles.content}>
        <img src={flag} alt={`Bandeira de ${name}`} className={styles.flag} />
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.capitalWrapper}>
          <img
            src="/assets/icon.png"
            alt="Ícone de localização"
            className={styles.capitalIcon}
          />
          <p className={styles.capital}>{capital}</p>
        </div>
        <button className={styles.button}>Ver mais</button>
      </div>
    </div>
  );
}
