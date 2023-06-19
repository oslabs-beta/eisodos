import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';

const HierarchyPage = () => {
  const [clusterData, setClusterData] = useState(null);
  // Fetch cluster data on component mount
  useEffect(() => {
    axios
      .get('/api/hierarchy/cluster')
      .then((response) => {
        setClusterData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cluster data:', error);
      });
  }, []);
};
