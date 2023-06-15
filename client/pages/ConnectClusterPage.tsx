import React, { useState, ChangeEvent } from 'react';

const ConnectClusterPage = () => {
  const [cluster, setCluster] = useState('');

  async function connectCluster(cluster: string) {
    try {
      const response = await fetch('/api/dashboard/count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiUrl: cluster,
        }),
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  function handleConnectClick() {
    connectCluster(cluster);
  }
  function handleClusterChange(event: ChangeEvent<HTMLInputElement>) {
    setCluster(event.target.value);
  }
  return (
    <div>
      <h1> Connect to cluster </h1>
      <input
        id='clusterInput'
        placeholder='my-cluster'
        value={cluster}
        onChange={handleClusterChange}
      />
      <button onClick={handleConnectClick}>Connect</button>
    </div>
  );
};

// const ConnectClusterPage = () => {
//   async function connectCluster(cluster: string) {
//     try {
//       /* need endpoint for cluster */
//       const response = await fetch('/api/dashboard/count', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'Application/JSON',
//         },
//         body: JSON.stringify({
//           apiUrl: cluster,
//         }),
//       });
//     }
//     catch (error) {
//       console.error('An error occurred:', error);
//     }
//   }

//   return (
//     <div>
//       <h1> Connect to cluster </h1>
//       <input id='clusterInput' placeholder='my-cluster'/>
//       <button>Connect</button>
//     </div>
//   );
// };

export default ConnectClusterPage;

