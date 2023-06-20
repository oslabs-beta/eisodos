import React, { FC, useEffect, useState } from 'react';

type MetricProps = {
  label: string;
}

const PodsMetricsTable: FC<MetricProps> = (props) => {
  const [metricDivs, setMetricDivs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard/count');
        const data = await res.json();

        const newMetricDivs: JSX.Element[] = [];
        for (const prop in data) {
          newMetricDivs.push(
            <div className='metric-box'>
              <div className='metric-label'>{prop}</div>
              <div className='metric-value'>{data[prop]}</div>
            </div>
          )
        }
        setMetricDivs(newMetricDivs);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="metrics-table">
      {metricDivs}
    </div>
  )
}

export default PodsMetricsTable;