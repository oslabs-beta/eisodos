import React from 'react';
import { Link } from 'react-router-dom';

interface AppProps {
  name: string;
}

const App = (props: AppProps) => {
  const { name } = props;
  return (
    <div className="relative h-48 w-52 rounded-lg bg-black-3 hover:bg-indigo-300/30">
      <label className="absolute inset-x-4 inset-y-5">{name}</label>
      <div className="absolute inset-x-4 bottom-6 flex items-center gap-2 text-sm text-white-2">
        Status
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="#4ade80"
          className="mt-0.5 h-2 w-2 animate-pulse">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>
    </div>
  );
};

export default App;
