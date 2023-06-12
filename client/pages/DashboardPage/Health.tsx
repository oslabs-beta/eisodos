import React, { useState, useEffect } from 'react';
import CPUUsageChart from './CPUUsageChart';
import MemChart from './MemUsageChart';
import NetworkTransmitChart from './NetworkTransmitChart';
import NetworkReceiveChart from './NetworkReceiveChart';

const Health = () => {
  interface Metrics {
    cpuValues: string[];
    memValues: string[];
    networkTransmitValues: string[];
    networkReceiveValues: string[];
  }
  interface DataPoint {
    x: number;
    y: number | string;
  }
  interface DataObj {
    id: string;
    data: DataPoint[];
  }

  const [cpuData, setCpuData] = useState<DataObj[]>([{ id: 'cpuUsage', data: [] }]);
  
  const [memData, setMemData] = useState<DataObj[]>([{ id: 'memUsage', data: [] }]);
  
  const [networkTransmitData, setNetworkTransmitData] = useState<DataObj[]>([{ id: 'networkTransmitInfo', data: [] }]);

  const [networkReceiveData, setNetworkReceiveData] = useState<DataObj[]>([{ id: 'networkReceiveInfo', data: [] }]);

  async function getData(): Promise<void> {

    const res = await fetch('/api/dashboard/metrics');
    const metrics: Promise<Metrics> = res.json();

    const cpuValues = (await metrics).cpuValues;
    const memValues = (await metrics).memValues;
    const networkTransmitValues = (await metrics).networkTransmitValues;
    const networkReceiveValues = (await metrics).networkReceiveValues;
    
    setCpuData(processChartData(cpuValues, 'cpuUsage'));
    setMemData(processChartData(memValues, 'memUsage'));
    setNetworkTransmitData(processChartData(networkTransmitValues, 'cpuUsage'));
    setNetworkReceiveData(processChartData(networkReceiveValues, 'cpuUsage'));
  }

  function processChartData(values: string[], id: string): DataObj[] {
    const dataPoints: DataPoint[] = [];
    for (let i = 0; i < values.length; i++) {
      const dataPoint = {
        x: i, 
        y: parseFloat(values[i]),
      };
      dataPoints.push(dataPoint);
    }
    return [{ id, data: dataPoints }];
  }
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <CPUUsageChart chartData={cpuData} />
      <MemChart chartData={memData} />
      <NetworkTransmitChart chartData={networkTransmitData} />
      <NetworkReceiveChart chartData={networkReceiveData} />
    </div>
  );
};

export default Health;