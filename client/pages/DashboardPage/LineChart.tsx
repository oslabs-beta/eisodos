import React, { useState, useEffect } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';

export type Props = NonNullable<unknown>; // TODO: figure out better type for this

const LineChart = () => {
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

  const [data, setData] = useState<DataObj[]>([{ id: 'cpuUsage', data: [] }]);

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

    setData(data); // why is this not working
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


// {
//     "cpuTimestamps": [
//         1686240020.61,
//         1686240020.61,
//         1686240020.61,
//         1686240020.61,
//         1686240020.61,
//         1686240020.61,
//         1686240020.61
//     ],
//     "cpuValues": [
//         "0.004255115642273672",
//         "0.0023353920203498003",
//         "0.002933404197262373",
//         "0.014037059779965983",
//         "0.004084593518794658",
//         "0.0056170787633335285",
//         "0.006225772064463598"
//     ],
//     "memTimestamps": [
//         1686240020.636,
//         1686240020.636,
//         1686240020.636,
//         1686240020.636,
//         1686240020.636,
//         1686240020.636,
//         1686240020.636
//     ],
//     "memValues": [
//         "51879936",
//         "18526208",
//         "46804992",
//         "241635328",
//         "23924736",
//         "76472320",
//         "68554752"
//     ],
//     "networkTransmitTimestamps": [
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668,
//         1686240020.668
//     ],
//     "networkTransmitValues": [
//         "0",
//         "0",
//         "20311.34154244977",
//         "885.4486068524197",
//         "0",
//         "0",
//         "32886.80677715026",
//         "384.863499681524",
//         "0",
//         "0",
//         "1135.8281640588832",
//         "274.4634048793494",
//         "0",
//         "100.21294324599572",
//         "166.09202851587813",
//         "10680.451810017588",
//         "0",
//         "343.345986482733",
//         "19856.596898191354"
//     ],
//     "networkReceiveTimestamps": [
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694,
//         1686240020.694
//     ],
//     "networkReceiveValues": [
//         "0",
//         "0",
//         "1014.3023794093137",
//         "20219.852167859102",
//         "0",
//         "0",
//         "32886.80677715026",
//         "384.863499681524",
//         "0",
//         "0",
//         "10356.281825756872",
//         "305.4629753069961",
//         "0",
//         "111.41190630497174",
//         "236.54846773446897",
//         "338.5279140820294",
//         "0",
//         "253.1321173965373",
//         "1062.7545956835386"
//     ]
// }