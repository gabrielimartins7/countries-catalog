import styles from './SearchInput.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Informe o país que deseja conhecer..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
