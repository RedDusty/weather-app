import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { searchFetch } from '../functions';
import { cityType, geoloc } from '../types';

const Search: React.FC<{
  setLocation: React.Dispatch<React.SetStateAction<geoloc>>;
}> = ({ setLocation }) => {
  const [search, setSearch] = useState<string>('');
  const [cities, setCities] = useState<Array<cityType>>([]);
  const { t } = useTranslation();

  const renderCities = cities?.map((city: cityType, i: number) => {
    if (i < 10) {
      return (
        <button
          className="group bg-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-900 w-min m-2 rounded-md py-0.5 px-2 text-black dark:text-white text-left whitespace-nowrap"
          onClick={() => {
            localStorage.setItem('search', String(true));
            setLocation({
              coord: {
                lat: city.coord.lat || 0,
                lon: city.coord.lon || 0,
              },
              accuracy: 0,
            });
          }}
          key={i}
        >
          <p className="font-medium">
            {city.name +
              ', ' +
              (city.state.length === 0 ? '' : `${city.state}, `) +
              city.country}
          </p>
          <div className="text-xs leading-3 ml-2 hidden group-hover:block">
            <p>{t('LATITUDE') + ': ' + city.coord.lat}</p>
            <p>{t('LONGITUDE') + ': ' + city.coord.lon}</p>
          </div>
        </button>
      );
    }
  });

  useEffect(() => {
    const timeTypeing = setTimeout(async () => {
      setCities(await searchFetch(search));
    }, 1000);
    return () => {
      clearTimeout(timeTypeing);
    };
  }, [search]);
  return (
    <div
      className="bg-white dark:bg-black w-full bg-opacity-30 dark:bg-opacity-30 shadow-lg fixed top-0 z-10"
      style={{ minHeight: 56 }}
    >
      <div className="flex justify-between items-center mt-2">
        <input
          type="text"
          name=""
          id=""
          className="bg-opacity-20 bg-white dark:bg-black dark:bg-opacity-15 w-4/5 h-10 ml-2 rounded font-semibold text-2xl outline-none text-gray-800 dark:text-gray-400 placeholder-gray-800 dark:placeholder-gray-400 hover:bg-opacity-40 dark:hover:bg-opacity-30 hover:placeholder-gray-700 dark:hover:placeholder-gray-300 hover:text-gray-700 dark:hover:text-gray-300 pl-2"
          placeholder={t('SEARCH')}
          onChange={async (e: React.FormEvent<HTMLInputElement>) => {
            setSearch(e.currentTarget.value);
          }}
        />
        <button
          className="w-10 h-10 rounded-full bg-theme-switch border-white dark:border-black border-solid border-4 mr-2"
          onClick={() => {
            if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
            } else {
              document.documentElement.classList.add('dark');
            }
          }}
        ></button>
      </div>
      <div className="pt-2 flex">{renderCities}</div>
    </div>
  );
};

export default Search;
