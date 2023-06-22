import React, { FC, useEffect, useState } from 'react';

type MetricProps = {
  label: string;
};

const PodsMetricsTable = (props: MetricProps) => {
  const [metricDivs, setMetricDivs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard/count');
        const data = await res.json();

        const newMetricDivs: JSX.Element[] = [];
        for (const prop in data) {
          newMetricDivs.push(
            <div id="metric-box" className="flex flex-col justify-center items-center">
              <div id="metric-label" className="mb-2">{prop}</div>
              <span id="metric-value" className="text-center border border-white rounded-lg px-2 py-1 w-14">
                {data[prop]}
              </span>
            </div>
          );
        }
        setMetricDivs(newMetricDivs);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="metrics-table" className="flex justify-evenly items-center">
      {metricDivs}
    </div>
  );
};

export default PodsMetricsTable;
