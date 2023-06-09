import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

export type Props = NonNullable<unknown>; // TODO: figure out better type for this

const LineChart = () => {
  const [data, setData] = useState<DataObj[]>([{ id: 'cpuUsage', data: [] }]);

  // TODO: move these out into a d.ts file?
  interface Metrics {
    cpuValues: string[];
  }

  interface DataPoint {
    x: number;
    y: number | string;
  }

  interface DataObj {
    id: string;
    data: DataPoint[];
  }

  async function getData(): Promise<void> {
    const res = await fetch('/api/dashboard/metrics');
    const metrics: Promise<Metrics> = res.json();

    const cpuValues = (await metrics).cpuValues;
    const values: DataPoint[] = [];

    for (let i = 0; i < cpuValues.length; i++) {
      const dataPoint = {
        x: i,
        y: parseFloat(cpuValues[i]) // change this to number? or can we leave as string?
      };

      values.push(dataPoint);
    }

    const data = [{
      id: 'cpuUsage',
      data: values
    }];

    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ height: 420, maxWidth: '100%' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=' >-.2f'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'CPU Usage',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={9}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
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
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineChart;
