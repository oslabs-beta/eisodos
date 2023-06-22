import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const CPUResponsiveBar = () => {
  return (
    <div className="h-48 w-1/2">
      <ResponsiveBar
        data={[
          {
            'CPU Usage': 100 // Replace 80 with the desired CPU usage value
          }
        ]}
        keys={['CPU Usage']}
        indexBy="CPU Usage"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.05}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={'#146C94'}
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
