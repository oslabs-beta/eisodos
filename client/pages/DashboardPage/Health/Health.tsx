import React, { useState, useEffect } from 'react';
import CPUUsageChart from './charts/CPUUsageChart';
import MemChart from './charts/MemUsageChart';
import NetworkTransmitChart from './charts/NetworkTransmitChart';
import NetworkReceiveChart from './charts/NetworkReceiveChart';
import { DataPoint, DataObj } from './charts/charts.types';
import PodsMetricsTable from './charts/PodsMetricsChart';
import CPUResponsiveBar from './charts/CPUBar';

const Health = () => {
  interface Metrics {
    cpuValues: string[];
    memValues: string[];
    networkTransmitValues: string[];
    networkReceiveValues: string[];
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
    setNetworkTransmitData(processChartData(networkTransmitValues, 'networkTransmitUsage'));
    setNetworkReceiveData(processChartData(networkReceiveValues, 'networkReceiveUsage'));
  }

  function processChartData(values: string[], id: string): DataObj[] {
    const dataPoints: DataPoint[] = [];
    for (let i = 0; i < values.length; i++) {
      const dataPoint = {
        x: i,
        y: parseFloat(values[i])
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
      <div>
        <CPUResponsiveBar />
        <PodsMetricsTable label="Pod Metrics" />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flexBasis: '50%' }}>
          <CPUUsageChart chartData={cpuData} />
        </div>
        <div style={{ flexBasis: '50%' }}>
          <MemChart chartData={memData} />
        </div>
        <div style={{ flexBasis: '50%' }}>
          <NetworkTransmitChart chartData={networkTransmitData} />
        </div>
        <div style={{ flexBasis: '50%' }}>
          <NetworkReceiveChart chartData={networkReceiveData} />
        </div>
      </div>
    </div>
  );
};

export default Health;
