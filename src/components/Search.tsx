import React from 'react';
import { useTranslation } from 'react-i18next';

const Search: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-black w-full h-14 flex justify-between items-center bg-opacity-40 dark:bg-opacity-30 shadow-lg">
      <input
        type="text"
        name=""
        id=""
        className="bg-opacity-20 bg-white dark:bg-black dark:bg-opacity-15 w-4/5 h-10 ml-2 rounded font-semibold text-2xl outline-none text-gray-200 dark:text-gray-400 placeholder-gray-200 dark:placeholder-gray-400 hover:bg-opacity-40 dark:hover:bg-opacity-30 hover:placeholder-white dark:hover:placeholder-gray-300 hover:text-white dark:hover:text-gray-300 pl-2"
        placeholder={t('SEARCH')}
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
  );
};

export default Search;
