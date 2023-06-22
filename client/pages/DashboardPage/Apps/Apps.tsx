import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Namespace from './containers/Namespace';

interface AppsData {
  [namespace: string]: string[];
}

const Apps = () => {
  const [data, setData] = useState<AppsData>({});

  useEffect(() => {
    axios.get('/api/cluster/apps').then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="mx-auto w-fit">
    <div className="mx-auto w-fit px-14 py-16">
      {Object.entries(data).map(([namespace, apps]) => (
        <Namespace key={namespace} namespace={namespace} apps={apps} />
      ))}
    </div>
  );
};

export default Apps;
