import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import type { DataObj } from '../health.types';

interface NetworkTransmitProps {
  chartData: DataObj[]; // Update the type of chartData according to your data structure
}

const NetworkTransmitChart = ({ chartData }: NetworkTransmitProps) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Converting to milliseconds
    return date.toLocaleTimeString('en-GB'); // You can use toLocaleDateString for dates
  };

  // Preprocessing the data to include formatted timestamps
  const formattedData = useMemo(() => {
    return chartData.map((series) => ({
      ...series,
      data: series.data.map((point) => ({
        ...point,
        x: formatTime(point.x)
      }))
    }));
  }, [chartData]);

  return (
    <div className="relative mt-10 h-96 max-w-full rounded-lg bg-black-2">
      <p className="absolute ml-10 mt-5 justify-self-start">Network Transmitted</p>
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 70, right: 30, bottom: 80, left: 110 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 10,
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
          legend: 'Gigabytes',
          legendOffset: -80,
          legendPosition: 'middle'
        }}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={9}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        // enableArea={true}
        theme={{
          grid: {
            line: {
              stroke: '#cbd5e1',
              opacity: 0.25
            }
          },
          axis: {
            ticks: {
              text: {
                fill: '#e5e7eb',
                opacity: 0.75
              }
            },
            legend: {
              text: {
                fill: '#f3f4f6'
              }
            }
          },
          //TODO: change margin
          tooltip: {
            container: {
              background: '#34d399',
              opacity: 0.75
            },
            basic: {
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center'
            },
            tableCell: {
              fontWeight: 'normal'
            },
            tableCellValue: {
              fontWeight: 'bold',
              color: 'black'
            }
          }
        }}
        colors={['#34d399']}
      />
    </div>
  );
};

export default NetworkTransmitChart;
