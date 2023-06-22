import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const CPUResponsiveBar = () => {
  return (
  <div style={{ height: 200, maxWidth: '40%' }}>
  <ResponsiveBar
    data={[
      {
        "CPU Usage": 80 // Replace 80 with the desired CPU usage value
      }
    ]}
    keys={['CPU Usage']}
    indexBy="CPU Usage"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.05}
    layout="horizontal"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'accent' }}
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
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'CPU Usage',
      legendPosition: 'middle',
      legendOffset: 32
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendPosition: 'middle',
      legendOffset: -40
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [['darker', 1.6]]
    }}
    legends={[]}
    role="application"
    barAriaLabel={(e) =>
      `${e.id}: ${e.formattedValue} in CPU Usage: ${e.indexValue}`
    }
  />
  </div>
)};

export default CPUResponsiveBar;
