import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NamespaceBox from './NamspaceBox';
import { Pod } from './Pod';

interface AppsData {
  [appName: string]: Pod[];
}

interface NamespaceData {
  [key: string]: AppsData;
}

const HierarchyPage: React.FC = () => {
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
    <div>
      {Object.entries(data).map(([namespace, appsData]) => (
        <NamespaceBox key={namespace} namespace={namespace} appsData={appsData} />
      ))}
    </div>
  );
};

export default HierarchyPage;
