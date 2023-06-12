import React from 'react';

const ConnectClusterPage = () => {
  async function connectCluster(cluster: string) {
    try {
      /* need endpoint for cluster */
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({
          cluster: cluster
        })
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div>
      <h1> Connect to cluster </h1>
      <input id="clusterInput" placeholder="my-cluster" />
      <button>Connect</button>
    </div>
  );
};

export default ConnectClusterPage;
