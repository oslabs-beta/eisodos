import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import type { DataObj } from '../health.types';

interface NetworkReceiveProps {
  chartData: DataObj[]; // Update the type of chartData according to your data structure
}

const NetworkReceiveChart = ({ chartData }: NetworkReceiveProps) => {
  
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
    <div className="h-96 max-w-full rounded-lg bg-black-3 mt-10">
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 50, right: 110, bottom: 90, left: 100 }}
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
          legend: 'CPU Usage',
          legendOffset: -80,
          legendPosition: 'middle'
        }}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={9}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableArea={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#f5f5f5',
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#f5f5f5',
              },
            },
            legend: {
              text: {
                fill: '#f5f5f5',
                opacity: 0.75,
              },
            },
          },
        }}
        colors={['#116A7B']}
      />
    </div>
  );
};

export default NetworkReceiveChart;
