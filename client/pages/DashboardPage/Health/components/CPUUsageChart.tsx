import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import type { DataObj } from '../health.types';

interface CPUUsageChartProps {
  chartData: DataObj[]; // Update the type of chartData according to your data structure
}

const CPUUsageChart = ({ chartData }: CPUUsageChartProps) => {
  return (
    <div className="h-96 max-w-full rounded-lg bg-black-3 mt-10">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 100, left: 80 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 0.005,
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
          legendOffset: 85,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 0,
          tickRotation: 0,
          legend: 'CPU Usage',
          legendOffset: -50,
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
            itemTextColor: '#F5F5F5',
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(10, 2, 6, .51)',
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
                opacity: 0.75,
              }
            },
            legend: {
              text: {
                fill: '#f5f5f5'
              }
            }
          }
        }}
        colors={['#2E8A99']}
      />
      </div>
  );
};

export default CPUUsageChart;
