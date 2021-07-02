import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { searchFetch } from '../functions';
import { cityType, geoloc, loadType } from '../types';

const Search: React.FC<{
  setLocation: React.Dispatch<React.SetStateAction<geoloc>>;
  setLoad: React.Dispatch<React.SetStateAction<loadType>>;
  load: loadType;
}> = ({ setLocation, setLoad, load }) => {
  const [search, setSearch] = useState<string>('');
  const [cities, setCities] = useState<Array<cityType>>([]);
  const [citiesCount, setCitiesCount] = useState<number>(-1);
  const { t } = useTranslation();

  const renderCities = cities?.map((city: cityType, i: number) => {
    if (i < citiesCount) {
      return (
        <>
          <button
            className="group flex flex-col items-center bg-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-900 w-min m-2 rounded-md py-0.5 px-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white text-left whitespace-nowrap"
            onClick={() => {
              setCities([]);
              setLoad({
                error: load.error,
                errorMessage: load.errorMessage,
                fetch: false,
                geoloc: load.geoloc,
                ip: load.ip,
                isLoading: true,
                search: true,
              });
              setCitiesCount(-1);
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
          </button>
        </>
      );
    }
    if (cities.length > citiesCount) {
      if (i === citiesCount) {
        return (
          <button
            className="bg-gray-200 dark:bg-gray-600 text-black dark:text-white m-2 px-2 py-0.5 hover:bg-white dark:hover:bg-gray-800 rounded-md"
            key="btnmore"
            onClick={() => {
              setCitiesCount(citiesCount + 10);
            }}
          >
            <p className="font-medium">{t('MORE')}</p>
          </button>
        );
      }
    }
    return <></>;
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
      className={`bg-white dark:bg-black w-full ${
        citiesCount === -1
          ? 'bg-opacity-30 dark:bg-opacity-30'
          : 'bg-opacity-80 dark:bg-opacity-80'
      } shadow-lg fixed top-0 z-10`}
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
            setCitiesCount(10);
          }}
          onFocus={async (e: React.FormEvent<HTMLInputElement>) => {
            setSearch(e.currentTarget.value + '');
            setCitiesCount(10);
          }}
        />
        <button
          className="w-10 h-10 rounded-full bg-theme-switch border-white dark:border-black border-solid border-4 mr-2"
          onClick={() => {
            if (document.documentElement.classList.contains('dark')) {
              document.documentElement.style.setProperty(
                '--scrollbarThumb',
                '#555555',
              );
              document.documentElement.style.setProperty(
                '--scrollbarThumbHover',
                '#363636',
              );
              document.documentElement.style.setProperty(
                '--scrollbarThumbFocus',
                '#1b1b1b',
              );
              document.documentElement.style.setProperty(
                '--scrollbarInactiveAction',
                '#a1a1a1',
              );
              document.documentElement.classList.remove('dark');
            } else {
              document.documentElement.classList.add('dark');
              document.documentElement.style.setProperty(
                '--scrollbarThumb',
                '#a1a1a1',
              );
              document.documentElement.style.setProperty(
                '--scrollbarThumbHover',
                '#cacaca',
              );
              document.documentElement.style.setProperty(
                '--scrollbarThumbFocus',
                '#e9e9e9',
              );
              document.documentElement.style.setProperty(
                '--scrollbarInactiveAction',
                '#686868',
              );
            }
          }}
        ></button>
      </div>
      {citiesCount === -1 ? (
        <></>
      ) : (
        <div className="py-2 my-2 flex flex-wrap overflow-auto max-h-64">
          {renderCities}
          <button
            className="bg-gray-200 dark:bg-gray-600 text-black dark:text-white m-2 px-2 py-0.5 hover:bg-white dark:hover:bg-gray-800 rounded-md"
            key="btnclose"
            onClick={() => {
              setCitiesCount(-1);
            }}
          >
            <p className="font-medium">{t('CLOSE')}</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
