import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import type { DataObj } from '../health.types';

interface MemChartProps {
  chartData: DataObj[]; // Update the type of chartData according to your data structure
}

const MemChart = ({ chartData }: MemChartProps) => {
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Converting to milliseconds
    return date.toLocaleTimeString('en-GB'); // You can use toLocaleDateString for dates
  };

   // Preprocessing the data to include formatted timestamps
   const formattedData = useMemo(() => {
    return chartData.map(series => ({
      ...series,
      data: series.data.map(point => ({
        ...point,
        x: formatTime(point.x)
      }))
    }));
  }, [chartData]);
  
  return (
    <div className="mt-10 h-96 max-w-full rounded-lg bg-black-2">
      <p className="justify-self-start">Memory Usage</p>
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 50, right: 110, bottom: 100, left: 100 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Time',
          legendOffset: 58,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 0,
          tickRotation: 0,
          legend: 'Memory Usage',
          legendOffset: -60,
          legendPosition: 'middle'
        }}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={9}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableArea={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#f5f5f5',
                opacity: 0.75
              }
            },
            legend: {
              text: {
                fill: '#f5f5f5'
              }
            }
          }
        }}
        colors={['#1B9C85']}
      />
    </div>
  );
};

export default MemChart;
