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
      <label className="rounded-lg bg-white/20 px-3.5 py-2.5">{namespace}</label>
      <div className="mb-10 mt-6 flex max-w-7xl flex-wrap gap-5">
        {apps.map((name) => (
          <App key={name} name={name} />
        ))}
      </div>
    </section>
  );
};

export default Namespace;
