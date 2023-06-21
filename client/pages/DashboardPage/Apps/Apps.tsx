import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Namespace from './containers/Namespace';

interface AppsData {
  [namespace: string]: string[];
}

const Apps = () => {
  const [data, setData] = useState<AppsData>({});

  useEffect(() => {
    // TODO: fetch data from server
    // axios.get('/api/cluster/apps').then((res) => {
    //   console.log(res.data);
    //   setData(res.data);
    // });

    setData({
      default: ['example-deploy'],
      monitoring: [
        'alertmanager-main',
        'blackbox-exporter',
        'grafana',
        'kube-statemetrics',
        'node-exporter',
        'prometheus-adapter',
        'prometheus-applications',
        'prometheus-k8s',
        'prometheus-operator'
      ],
      'kube-system': [
        'coredns',
        'etcd-monitoring-control-plane',
        'kindnet',
        'kube-apiserver-monitoring-control-plane',
        'kube-controller-manager-monitoring-control-plane',
        'kube-proxy',
        'kube-scheduler-monitoring-control-plane'
      ],
      'local-path-storage': ['local-path-provisioner']
    });
  }, []);

  return (
    <div className="mx-auto w-fit">
      {Object.entries(data).map(([namespace, apps]) => (
        <Namespace key={namespace} namespace={namespace} apps={apps} />
      ))}
    </div>
  );
};

export default Apps;
