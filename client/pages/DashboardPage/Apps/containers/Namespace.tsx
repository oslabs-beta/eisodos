import React from 'react';
import App from './App';

interface NamespaceProps {
  namespace: string;
  apps: string[];
}

const Namespace = (props: NamespaceProps) => {
  const { namespace, apps } = props;

  return (
    <section>
      <div className="flex flex-wrap justify-start text-center">
        <div className="rounded-lg bg-blue-200/30 px-4 py-2">
          <label>{namespace}</label>
        </div>
      </div>
      <div className="mb-10 mt-6 flex max-w-7xl flex-wrap gap-5">
        {apps.map((name) => (
          <App key={name} name={name} />
        ))}
      </div>
    </section>
  );
};

export default Namespace;
