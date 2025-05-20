import Select from 'react-select';

type Props = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    width: 420,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F68926',
    border: '1px solid #fff',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    boxShadow: 'none',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#fff',
    fontWeight: 500,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#fff',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#F68926',
    borderRadius: 12,
    maxHeight: 200,
    overflowY: 'auto',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#ff9a3c' : '#F68926',
    color: '#fff',
    cursor: 'pointer',
    padding: '10px 15px',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#fff',
    paddingLeft: 20,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menuList: (provided: any) => ({
    ...provided,
    scrollbarColor: '#F68926 #F68926',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#F68926',
      borderRadius: '10px',
    },
  }),
};

export default function LanguageSelect({ options, selected, onChange }: Props) {
  const formattedOptions = options.map(lang => ({
    value: lang,
    label: `º ${lang}`,
  }));

  return (
    <Select
      styles={customStyles}
      options={formattedOptions}
      value={formattedOptions.find(o => o.value === selected)}
      onChange={(option) => onChange(option?.value || '')}
      placeholder="Selecione o idioma"
      isSearchable={false}
    />
  );
}
