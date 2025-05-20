import styles from './ContinentFilter.module.css';

type Props = {
  continents: string[];
  selected: string[];
  onChange: (value: string[]) => void;
};

// Ordem fixa desejada
const CONTINENT_ORDER = [
  'África',
  'América do Norte',
  'América do Sul',
  'Ásia',
  'Europa',
  'Oceania',
];

export default function ContinentFilter({ continents, selected, onChange }: Props) {
  const toggle = (continent: string) => {
    if (selected.includes(continent)) {
      onChange(selected.filter(c => c !== continent));
    } else {
      onChange([...selected, continent]);
    }
  };

  // Ordena os continentes com base na ordem desejada
  const sortedContinents = [...continents].sort(
    (a, b) => CONTINENT_ORDER.indexOf(a) - CONTINENT_ORDER.indexOf(b)
  );

  return (
    <div className={styles.container}>
      {sortedContinents.map(continent => (
        <label key={continent} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selected.includes(continent)}
            onChange={() => toggle(continent)}
          />
          {continent}
        </label>
      ))}
    </div>
  );
}
