import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const CPUResponsiveBar = () => {
  return (
    <div className="relative h-48 w-3/4">
      <p className="absolute ml-20 mt-5">CPU Usage &#37;</p>
      <ResponsiveBar
        data={[
          {
            'CPU Usage': 82 // Replace 80 with the desired CPU usage value
          }
        ]}
        keys={['CPU Usage']}
        indexBy="CPU Usage"
        margin={{ top: 55, right: 100, bottom: 50, left: 80 }}
        padding={0.05}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={'#7dd3fc'}
        fill={[
          {
            match: {
              id: 'CPU Usage'
            },
            id: 'dots'
          }
        ]}
        borderRadius={6}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]]
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickValues: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={'#ffffff'}
        legends={[]}
        role="application"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in CPU Usage: ${e.indexValue}`}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#ffffff'
              }
            },
            legend: {
              text: {
                fill: '#ffffff'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default CPUResponsiveBar;
