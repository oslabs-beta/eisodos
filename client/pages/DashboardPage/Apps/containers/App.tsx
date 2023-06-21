import React from 'react';
import { Link } from 'react-router-dom';

interface AppProps {
  name: string;
}

const App = (props: AppProps) => {
  const { name } = props;
  return (
    <div className="relative h-48 w-52 rounded-xl bg-white/10 hover:bg-white/20">
      <label className="absolute inset-x-4 inset-y-5">{name}</label>
      <div className="absolute inset-x-4 bottom-6 flex items-center gap-2 text-sm text-white-2">
        Status
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#4ade80" className="h-2 w-2 animate-pulse">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>
    </div>
  );
};

export default App;
