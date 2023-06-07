import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

interface PromResult {
  value: [number, string];
  // Add other properties based on the structure of the Prometheus response
}

const dashboardController = {
  getClusterData: async (
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> => {
    try {
      // Query Prometheus for CPU usage, memory usage, and network usage
      const responseCpuUsage = await axios.get<PromResult[]>(
        'http://localhost:9090/api/v1/query?query=rate(container_cpu_usage_seconds_total{job=\'kubernetes-nodes\'}[2m])'
      );
      const responseMemUsage = await axios.get<PromResult[]>(
        'http://localhost:9090/api/v1/query?query=container_memory_usage_bytes{job=\'kubernetes-nodes\'}'
      );
      const responseNetwork = await axios.get<PromResult[]>(
        'http://localhost:9090/api/v1/query?query=sum(rate(node_network_transmit_bytes_total[2m]))+sum(rate(node_network_receive_bytes_total[2m]))'
      );

      // Store the results in res.locals.data
      const cpuUsage = responseCpuUsage.data.map(
        (item: { value: any }) => item.value
      );
      const memUsage = responseMemUsage.data.map(
        (item: { value: any }) => item.value
      );
      const networkUsage = responseNetwork.data.map(
        (item: { value: any }) => item.value
      );

      // Format the data
      const formattedData = {
        cpuTimestamps: cpuUsage.map((item: any[]) => item[0]),
        cpuValues: cpuUsage.map((item: any[]) => item[1]),
        memTimestamps: memUsage.map((item: any[]) => item[0]),
        memValues: memUsage.map((item: any[]) => item[1]),
        networkTimestamps: networkUsage.map((item: any[]) => item[0]),
        networkValues: networkUsage.map((item: any[]) => item[1]),
      };

      // Store the formatted data in res.locals.data
      res.locals.data = formattedData;
      if (next) {
        return next();
      }
    } catch (err) {
      if (next) {
        return next({{ log: `Error in dash ${err}` }});
      }
    }
  },
};

export default dashboardController;
