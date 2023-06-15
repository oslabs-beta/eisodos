import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';

// Interfaces define the structure and types of the data received from the API response
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
interface DashboardData {
  nodes: number;
  pods: number;
  namespaces: number;
  deployments: number;
  services: number;
}

const dashboardController = {
  getClusterData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Retrieve CPU usage data
      const responseCpuUsage = await axios.get<QueryResponse>(
        'http://localhost:9090/api/v1/query?query=rate(container_cpu_usage_seconds_total{job="kubelet", namespace="default"}[10m])'
      );
      // Retrieve Mem usage
      const responseMemUsage = await axios.get<QueryResponse>(
        'http://localhost:9090/api/v1/query?query=container_memory_usage_bytes{job="kubelet", namespace="default"}'
      );
      // Retrieve network transmit
      const responseTransmit = await axios.get<QueryResponse>(
        'http://localhost:9090/api/v1/query?query=rate(node_network_transmit_bytes_total{job="node-exporter"}[10m])'
      );
      // Retrieve network receive
      const responseReceive = await axios.get<QueryResponse>(
        'http://localhost:9090/api/v1/query?query=rate(node_network_receive_bytes_total{job="node-exporter"}[10m])'
      );
      // Extract data from API reqs
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
      // Format the extracted data
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
        networkReceiveValues: networkReceiveUsage.map((item: any[]) => item[1])
      };
      // Return the formattedData
      res.locals.data = formattedData;

      return next();
    } catch (err) {
      return next({ log: `Error in dash ${err}` });
    }
  },
  getNumberOf: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Create a new KubeConfig
      const kc = new k8s.KubeConfig();
      // Load the config from default location
      kc.loadFromDefault();
      // Create instance of Corev1api and AppsV1api using the loaded config
      const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
      const k8sApi1 = kc.makeApiClient(k8s.AppsV1Api);
      // Get all required info for each resource using Promise all
      const [
        { body: nodeList },
        { body: podList },
        { body: namespaceList },
        { body: deploymentList },
        { body: serviceList },
      ] = await Promise.all([
        k8sApi.listNode(),
        k8sApi.listPodForAllNamespaces(),
        k8sApi.listNamespace(),
        k8sApi1.listDeploymentForAllNamespaces(),
        k8sApi.listServiceForAllNamespaces(),
      ]);
      // Create an obj and fill with the counts
      const numOfData: DashboardData = {
        nodes: nodeList.items.length,
        pods: podList.items.length,
        namespaces: namespaceList.items.length,
        deployments: deploymentList.items.length,
        services: serviceList.items.length,
      };
      // return the counts object in res.locals
      res.locals.count = numOfData;
      return next();
    } catch (error) {
      return next({ log: `Error in getNumberOf: ${error}` });
    }
  },
};

export default dashboardController;
