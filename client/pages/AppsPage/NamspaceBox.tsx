import React, { useState } from 'react';
import Modal from 'react-modal';
import AppBox from './AppBox';
import { Pod } from './Pod';

interface AppsData {
  [appName: string]: Pod[];
}

interface NamespaceBoxProps {
  namespace: string;
  appsData: AppsData;
}

const NamespaceBox: React.FC<NamespaceBoxProps> = ({ namespace, appsData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<{ appName: string; pods: Pod[] } | null>(null);

  const openModal = (appName: string, pods: Pod[]) => {
    setSelectedApp({ appName, pods });
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApp(null);
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', marginTop: '10px' }}>{namespace}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.entries(appsData).map(([appName, pods]) => (
          <AppBox key={appName} appName={appName} pods={pods} openModal={() => openModal(appName, pods)} />
        ))}
      </div>
      {selectedApp && (
        <Modal isOpen={modalOpen} onRequestClose={closeModal} contentLabel="Pods Modal">
          <h2 style={{ color: 'black' }}>{selectedApp.appName}</h2>
          {selectedApp.pods.map((pod, index) => (
            <div key={index}>
              <p style={{ color: 'black' }}>{pod.name}</p>
              <p style={{ color: 'black' }}>Status: {pod.status}</p>
            </div>
          ))}
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default NamespaceBox;
