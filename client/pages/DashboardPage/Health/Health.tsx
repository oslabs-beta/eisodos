import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataPoint, DataObj } from './health.types';

// import chart components
// TODO: rename these charts
import CPUResponsiveBar from './components/CPUBar';
import PodsMetricsTable from './components/PodsMetricsChart';
import CPUUsageChart from './components/CPUUsageChart';
import MemChart from './components/MemUsageChart';
import NetworkTransmitChart from './components/NetworkTransmitChart';
import NetworkReceiveChart from './components/NetworkReceiveChart';

// types for fetched data
interface Metrics {
  cpu: Metric[];
  memory: Metric[];
  receive: Metric[];
  transmit: Metric[];
}

interface Metric {
  timestamp: number;
  value: string;
}

const Health = () => {
  const [cpuData, setCpuData] = useState<DataObj[]>([]);
  const [memData, setMemData] = useState<DataObj[]>([]);
  const [netTransmitData, setNetTransmitData] = useState<DataObj[]>([]);
  const [netReceiveData, setNetReceiveData] = useState<DataObj[]>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData(): Promise<void> {
    const res = await axios.get('/api/dashboard/global-metrics?time=10m');
    const metrics: Metrics = res.data;

    // format metrics for nivo charts
    setCpuData(processChartData(metrics.cpu, 'cpuUsage'));
    setMemData(processChartData(metrics.memory, 'memUsage'));
    setNetTransmitData(processChartData(metrics.transmit, 'netTransmit'));
    setNetReceiveData(processChartData(metrics.transmit, 'netReceive'));
  }

  function processChartData(metrics: Metric[], id: string): DataObj[] {
    const dataPoints: DataPoint[] = [];
    for (let i = 0; i < metrics.length; i++) {
      const dataPoint = {
        x: metrics[i].timestamp,
        y: parseFloat(metrics[i].value)
      };
      dataPoints.push(dataPoint);
    }
    console.log(dataPoints);
    return [{ id, data: dataPoints }];
  }

  return (
    <div className="px-14 py-16">
      <div className="grid grid-cols-2 rounded-lg bg-black-2">
        <div className="flex flex-col justify-center rounded-lg">
          <p className="justify-self-start">CPU Usage &#37;</p>
          <CPUResponsiveBar />
        </div>
        <PodsMetricsTable label="Pod Metrics" />
      </div>

      <div className="flex flex-row gap-10">
        <div style={{ flexBasis: '50%' }}>
          <CPUUsageChart chartData={cpuData} />
        </div>
        <div style={{ flexBasis: '50%' }}>
          <MemChart chartData={memData} />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flexBasis: '50%' }}>
          <NetworkTransmitChart chartData={netTransmitData} />
        </div>
        <div style={{ flexBasis: '50%' }}>
          <NetworkReceiveChart chartData={netReceiveData} />
        </div>
      </div>
    </div>
  );
};

export default Health;
