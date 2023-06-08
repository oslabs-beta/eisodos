import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

interface PromResult {
  metric: Record<string, string>;
  value: [number, string];
}

interface QueryResult {
  resultType: string;
  result: PromResult[];
}

interface QueryResponse {
  status: string;
  data: QueryResult;
}

const dashboardController = {
  getClusterData: async (
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> => {
    try {
      const responseCpuUsage = await axios.get<QueryResponse>(
        'http://localhost:9090/api/v1/query?query=rate(container_cpu_usage_seconds_total{job="kubelet", namespace="default", node="minikube"}[2m])'
      );
      console.log(
        'Individual CPU Usage Result:',
        responseCpuUsage.data.data.result[0]
      );

      const responseMemUsage = await axios.get<QueryResponse>(
        'http://localhost:9090/api/v1/query?query=container_memory_usage_bytes{job="kubelet", namespace="default", node="minikube"}'
      );
      console.log(
        'Individual MEM Usage Result:',
        responseMemUsage.data.data.result[0]
      );
      const responseTransmit = await axios.get<QueryResponse>(
        'http://localhost:9090/api/v1/query?query=rate(node_network_transmit_bytes_total{job="node-exporter"}[2m])'
      );
      console.log(
        'Network Transmit Result:',
        responseTransmit.data.data.result[0]
      );

      const responseReceive = await axios.get<QueryResponse>(
        'http://localhost:9090/api/v1/query?query=rate(node_network_receive_bytes_total{job="node-exporter"}[2m])'
      );
      console.log(
        'Network Receive Result:',
        responseReceive.data.data.result[0]
      );
      const cpuUsage = responseCpuUsage.data.data.result.map(
        (item: PromResult) => item.value
      );
      const memUsage = responseMemUsage.data.data.result.map(
        (item: PromResult) => item.value
      );
      const networkTransmitUsage = responseTransmit.data.data.result.map(
        (item: PromResult) => item.value
      );
      const networkReceiveUsage = responseReceive.data.data.result.map(
        (item: PromResult) => item.value
      );

      const formattedData = {
        cpuTimestamps: cpuUsage.map((item: any[]) => item[0]),
        cpuValues: cpuUsage.map((item: any[]) => item[1]),
        memTimestamps: memUsage.map((item: any[]) => item[0]),
        memValues: memUsage.map((item: any[]) => item[1]),
        networkTransmitTimestamps: networkTransmitUsage.map(
          (item: any[]) => item[0]
        ),
        networkTransmitValues: networkTransmitUsage.map(
          (item: any[]) => item[1]
        ),
        networkReceiveTimestamps: networkReceiveUsage.map(
          (item: any[]) => item[0]
        ),
        networkReceiveValues: networkReceiveUsage.map((item: any[]) => item[1]),
      };

      res.locals.data = formattedData;

      if (next) {
        return next();
      }
    } catch (err) {
      if (next) {
        return next({ log: `Error in dash ${err}` });
      }
    }
  },
};

export default dashboardController;
