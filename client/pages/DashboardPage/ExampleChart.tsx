import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import { generateDrinkStats } from '@nivo/generators';

// import { makeCustomLayer } from './CustomLayer';

export type Props = NonNullable<unknown>; // TODO: figure out better type for this

const data: Serie[] = generateDrinkStats(18);

const ExampleChart = () => {
  return (
    <div style={{ height: 420, maxWidth: '100%' }}>
      <ResponsiveLine
        data={data.filter((d) => d.id === 'rhum')}
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        animate={true}
        enableSlices={'x'}
        yScale={{
          type: 'linear',
          stacked: true,
          min: 0,
          max: 1000
        }}
        lineWidth={3}
        curve='linear'
        colors={['#028ee6', '#774dd7']}
        enableGridX={false}
        pointSize={12}
        pointColor='white'
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        layers={[
          'grid',
          'markers',
          'areas',
          // makeCustomLayer({ y0: 0, y1: 100 }),
          'lines',
          'slices',
          'axes',
          'points',
          'legends'
        ]}
        theme={{
          crosshair: {
            line: {
              strokeWidth: 2,
              stroke: '#774dd7',
              strokeOpacity: 1
            }
          }
        }}
      />
    </div>
  );
}

export default ExampleChart;