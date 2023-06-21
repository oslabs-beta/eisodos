import React from 'react';
import { Pod } from './Pod';

interface AppBoxProps {
  appName: string;
  pods: Pod[];
  openModal: () => void;
}

const AppBox: React.FC<AppBoxProps> = ({ appName, pods, openModal }) => {
  return (
    <div style={{ width: '200px', height: '200px', border: '1px solid ', margin: '10px' }} onClick={openModal}>
      {appName}
    </div>
  );
};

export default AppBox;
