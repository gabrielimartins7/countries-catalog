import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllCountries } from '../services/countries';
import CountryCard from '../components/CountryCard';
import SearchInput from '../components/Filters/SearchInput';
import ContinentFilter from '../components/Filters/ContinentFilter';
import LanguageSelect from '../components/Filters/LanguageSelect';
import { Country } from '../types/country';
import styles from './index.module.css';

type Props = {
  countries: Country[];
};

export default function HomePage({ countries }: Props) {
  const [search, setSearch] = useState('');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [filtered, setFiltered] = useState<Country[]>(countries);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const countriesPerPage = 8;
  const visiblePageCount = 6;

  const allLanguages = Array.from(
    new Set(countries.flatMap(c => Object.values(c.languages || {})))
  );

  const allContinents = Array.from(
    new Set(countries.map(c => c.region).filter(Boolean))
  );

  useEffect(() => {
    let result = [...countries];

    if (search) {
      result = result.filter(c =>
        c.translations?.por?.common?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedContinents.length > 0) {
      result = result.filter(c => selectedContinents.includes(c.region));
    }

    if (selectedLanguage) {
      result = result.filter(c =>
        Object.values(c.languages || {}).includes(selectedLanguage)
      );
    }

    setFiltered(result);
    setCurrentPage(1);
    setPageGroupStart(1);
  }, [search, selectedContinents, selectedLanguage, countries]);

  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / countriesPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    if (page < pageGroupStart) {
      setPageGroupStart(page);
    } else if (page >= pageGroupStart + visiblePageCount) {
      setPageGroupStart(page - visiblePageCount + 1);
    }
  };

  const handlePreviousGroup = () => {
    if (pageGroupStart > 1) {
      setPageGroupStart(pageGroupStart - visiblePageCount);
    }
  };

  const handleNextGroup = () => {
    if (pageGroupStart + visiblePageCount <= totalPages) {
      setPageGroupStart(pageGroupStart + visiblePageCount);
    }
  };

  const visiblePages = Array.from({ length: visiblePageCount }, (_, i) => pageGroupStart + i)
    .filter(page => page <= totalPages);

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.logoWrapper}>
            <img src="/assets/logo.png" alt="Logo" width={100} height={50} />
          </div>

          <div className={styles.filters}>
            <SearchInput value={search} onChange={setSearch} />
            <LanguageSelect options={allLanguages} selected={selectedLanguage} onChange={setSelectedLanguage} />
            <ContinentFilter continents={allContinents} selected={selectedContinents} onChange={setSelectedContinents} />
          </div>

          <div className={styles.grid}>
            {currentCountries.map(country => (
              <Link key={country.cca3} href={`/country/${country.cca3}`}>
                <CountryCard
                  name={country.translations?.por?.common || country.name.common}
                  flag={country.flags.png}
                  capital={country.capital?.[0] || 'Não informada'}
                  region={country.region}
                />
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={handlePreviousGroup}
                className={styles.arrow}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                &laquo;
              </button>

              {visiblePages.map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`${styles.pageButton} ${page === currentPage ? styles.activePageButton : ''}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNextGroup}
                className={styles.arrow}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      </div>
        <div className={styles.footer}>
          <img src="/assets/logoFooter.png" alt="Logo" width={100} height={50} className={styles.footerLogo} />
          <p className={styles.footerText}>Grupo Plan Marketing (C) Todos os direitos reservados - 2025</p>
        </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const countries = await getAllCountries();
  return {
    props: { countries },
  };
};
