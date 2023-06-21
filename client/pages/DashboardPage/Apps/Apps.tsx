import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NamespaceBox from './NamespaceBox';
import { Pod } from './pod.types';

interface AppsData {
  [appName: string]: Pod[];
}

interface NamespaceData {
  [key: string]: AppsData;
}

const Apps: React.FC = () => {
  const [data, setData] = useState<NamespaceData>({});

  useEffect(() => {
    axios
      .get('/api/cluster/apps')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cluster data:', error);
      });
  }, []);

  return (
    <>
      {Object.entries(data).map(([namespace, appsData]) => (
        <NamespaceBox key={namespace} namespace={namespace} appsData={appsData} />
      ))}
    </>
  );
};

export default Apps;
