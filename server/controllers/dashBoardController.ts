import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import kube from '../service/kubeServ'; 

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
        networkReceiveValues: networkReceiveUsage.map((item: any[]) => item[1]),
      };
      // Return the formattedData
      res.locals.data = formattedData;

      return next();
    } 
    catch (err) {
      return next({ log: `Error in dash ${err}` });
    }
  },
  getCount: async (req: Request,res: Response, next: NextFunction): Promise<void> => {
    try {
      const { apiUrl } = req.body;

      // Connect to the Kubernetes cluster
      const k8sApi = await kube.connectToCluster(apiUrl);

      // List pods
      const podList = await kube.listPods(apiUrl);

      // Count pods
      const podCount = podList.items.length;

      // List nodes
      const nodeList = await kube.listNodes(apiUrl);

      // Count the nodes
      const nodeCount = nodeList.items.length;

      // Get AppsV1ApiClient
      const appsV1Api = kube.getAppsV1ApiClient(apiUrl);

      // List deployments
      const deploymentList = await appsV1Api.listDeploymentForAllNamespaces();
      const deploymentCount = deploymentList.body.items.length;

      // List services
      const serviceList = await k8sApi.listServiceForAllNamespaces();
      const serviceCount = serviceList.body.items.length;

      res.locals.counts = {
        pods: podCount,
        nodes: nodeCount,
        deployments: deploymentCount,
        services: serviceCount,
      };

      return next();
    } catch (error) {
      return next({ log: `Error in getCount: ${error}` });
    }
  },
};

export default dashboardController;
