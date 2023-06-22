import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';
import { current } from '@reduxjs/toolkit';

// Interfaces define the structure and types of the data received from the API response
interface PromResult {
  metric: Record<string, string>;

  //TODO: MAKE SURE THIS WORKS FOR BOTH TYPES OF RESPONSES
  values: [number, string][];
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

interface GlobalMetrics{
  cpu: MetricData[]
  memory: MetricData[]
}
interface MetricData {
  timestamp: number;
  cpu: string;
}

interface PodMetrics {
  cpu?: [number, string][];
  memory?: [number, string][];
}

interface Pod {
  name: string;
  podName: string;
  namespace: string;
  metrics: PodMetrics;
}

const dashboardController = {
  getClusterData: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // example request: http://localhost:8080/api/dashboard/metrics?time=10m&namespace=monitoring

    let { time, namespace }: { time?: string | undefined; namespace?: string | undefined } = req.query;
    if (!time) time = '';
    else time = `[${time}]`;

    if (!namespace) namespace = '';
    else namespace = `,namespace ="${namespace}"`;

    try {
      // Retrieve CPU usage data
      const responseCpuUsage = await axios.get<QueryResponse>(
        `http://localhost:9090/api/v1/query?query=container_cpu_usage_seconds_total{container!=""${namespace}}${time}`
      );
      // Retrieve Mem usage
      const responseMemUsage = await axios.get<QueryResponse>(
        `http://localhost:9090/api/v1/query?query=container_memory_usage_bytes{container!=""${namespace}}${time}`
      );

      // Retrieve network transmit
      const responseTransmit = await axios.get<QueryResponse>(
        `http://localhost:9090/api/v1/query?query=node_network_transmit_bytes_total{container!=""${namespace}}${time}`
      );

      // Retrieve network receive
      const responseReceive = await axios.get<QueryResponse>(
        `http://localhost:9090/api/v1/query?query=node_network_receive_bytes_total{container!=""${namespace}}${time}`
      );

      const formattedResponse: Pod[] = [];
      for (let i = 0; i < responseCpuUsage.data.data.result.length; i++) {
        //intialize data
        let cpuData: [number, string][] = [];
        let memoryData: [number, string][] = [];

        //dealing with prometheus auto pluralizing of value property
        if (responseCpuUsage.data.data.result[i].values) {
          cpuData = responseCpuUsage.data.data.result[i].values;
          memoryData = responseMemUsage.data.data.result[i].values;
        }
        if (responseCpuUsage.data.data.result[i].value) {
          cpuData.push(responseCpuUsage.data.data.result[i].value);
          memoryData.push(responseMemUsage.data.data.result[i].value);
        }

        //creating metrics object
        const metrics: PodMetrics = { cpu: cpuData, memory: memoryData };

        //creating pod objects
        const pod: Pod = {
          name: responseCpuUsage.data.data.result[i].metric.name,
          podName: responseCpuUsage.data.data.result[i].metric.pod,
          namespace: responseCpuUsage.data.data.result[i].metric.namespace,
          metrics: metrics
        };

        //adding pod to an array to be returned to front end
        formattedResponse.push(pod);
      }

      res.locals.data = formattedResponse;

      return next();
    } catch (err) {
      return next({ log: `Error in dash ${err}` });
    }
  },

  getGlobalMetrics: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    //destructuring query parameters (no paramaters will get instant metrics)
    let { time, namespace }: { time?: string | undefined; namespace?: string | undefined } = req.query;
    if (!time) time = '';
    else time = `[${time}]`;

    if (!namespace) namespace = '';
    else namespace = `,namespace ="${namespace}"`;

    //querying for data
    try {
      //Retrieve CPU usage
      const responseCpuUsage = await axios.get<QueryResponse>(
        `http://localhost:9090/api/v1/query?query=container_cpu_usage_seconds_total{container!=""${namespace}}${time}`
      );
      // Retrieve Mem usage
      const responseMemUsage = await axios.get<QueryResponse>(
        `http://localhost:9090/api/v1/query?query=container_memory_usage_bytes{container!=""${namespace}}${time}`
      );
      
      //Formatting Response from queries
      const formattedResponse: Pod[] = [];
      for (let i = 0; i < responseCpuUsage.data.data.result.length; i++) {
        //intialize data
        let cpuData: [number, string][] = [];
        let memoryData: [number, string][] = [];

        //dealing with prometheus auto pluralizing of value property
        if (responseCpuUsage.data.data.result[i].values) {
          cpuData = responseCpuUsage.data.data.result[i].values;
          memoryData = responseMemUsage.data.data.result[i].values;
        }
        if (responseCpuUsage.data.data.result[i].value) {
          cpuData.push(responseCpuUsage.data.data.result[i].value);
          memoryData.push(responseMemUsage.data.data.result[i].value);
        }

        //creating metrics object
        const metrics: PodMetrics = { cpu: cpuData, memory: memoryData };

        //creating pod objects
        const pod: Pod = {
          name: responseCpuUsage.data.data.result[i].metric.name,
          podName: responseCpuUsage.data.data.result[i].metric.pod,
          namespace: responseCpuUsage.data.data.result[i].metric.namespace,
          metrics: metrics
        };

        //adding pod to our array for further processing below
        formattedResponse.push(pod);
      }

      const cpuResult: MetricData[] = [];

      // looping through formatted responses for CPU data and aggregating data across all pods 
      for (const pod of formattedResponse) {
        if (!pod.metrics.cpu) continue;

        for (let i = 0; i < pod.metrics.cpu.length; i++) {
          const [timestamp, metric] = pod.metrics.cpu[i];

          if (!cpuResult[i]) {
            cpuResult[i] = {
              timestamp: timestamp,
              cpu: metric
            };
          } else {
            cpuResult[i].cpu = (parseFloat(cpuResult[i].cpu) + parseFloat(metric)).toString();
          }
        }
      }
      
      // looping through formatted responses for memory data and aggregating data across all pods 
      const memResult: MetricData[] = [];
      for (const pod of formattedResponse) {
        if (!pod.metrics.cpu) continue;

        for (let i = 0; i < pod.metrics.cpu.length; i++) {
          const [timestamp, metric] = pod.metrics.cpu[i];

          if (!memResult[i]) {
            memResult[i] = {
              timestamp: timestamp,
              cpu: metric
            };
          } else {
            memResult[i].cpu = (parseFloat(memResult[i].cpu) + parseFloat(metric)).toString();
          }
        }
      }
    
      //collecting CPU and Memory into one object to be returned to the front end
      const result: GlobalMetrics = {
        cpu: cpuResult,
        memory: memResult
      }
      res.locals.data = result;
      return next();
    } catch (error) {
      return next({ log: `Error in getGlobalMetrics: ${error}` });
    }
  },

  getNumberOf: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        { body: serviceList }
      ] = await Promise.all([
        k8sApi.listNode(),
        k8sApi.listPodForAllNamespaces(),
        k8sApi.listNamespace(),
        k8sApi1.listDeploymentForAllNamespaces(),
        k8sApi.listServiceForAllNamespaces()
      ]);
      // Create an obj and fill with the counts
      const numOfData: DashboardData = {
        nodes: nodeList.items.length,
        pods: podList.items.length,
        namespaces: namespaceList.items.length,
        deployments: deploymentList.items.length,
        services: serviceList.items.length
      };
      // return the counts object in res.locals
      res.locals.count = numOfData;
      return next();
    } catch (error) {
      return next({ log: `Error in getNumberOf: ${error}` });
    }
  }
};

export default dashboardController;

//DELETE IF UNNEEDED

// // Extract data from API reqs
// const cpuUsage = responseCpuUsage.data.data.result.map((item: PromResult) => item.value);
// const memUsage = responseMemUsage.data.data.result.map((item: PromResult) => item.value);
// const networkTransmitUsage = responseTransmit.data.data.result.map((item: PromResult) => item.value);
// const networkReceiveUsage = responseReceive.data.data.result.map((item: PromResult) => item.value);
// // Format the extracted data
// const formattedData = {
//   cpuTimestamps: cpuUsage.map((item: any[]) => item[0]),
//   cpuValues: cpuUsage.map((item: any[]) => item[1]),
//   memTimestamps: memUsage.map((item: any[]) => item[0]),
//   memValues: memUsage.map((item: any[]) => item[1]),
//   networkTransmitTimestamps: networkTransmitUsage.map((item: any[]) => item[0]),
//   networkTransmitValues: networkTransmitUsage.map((item: any[]) => item[1]),
//   networkReceiveTimestamps: networkReceiveUsage.map((item: any[]) => item[0]),
//   networkReceiveValues: networkReceiveUsage.map((item: any[]) => item[1])
// };
// // Return the formattedData
//TESTING
// const test = await axios.get<QueryResponse>(
//   `http://localhost:9090/api/v1/query?query=container_cpu_usage_seconds_total{container!=""${namespace}}[1m]`
// );

// test.data.data.result.map((item: PromResult) => console.log(item));
// console.log(test.data.data.result)
// console.log(test.data.data.result[0]);

// console.log(responseCpuUsage.data.data.result[0]);

//TEST ZONE
      // const test = await axios.get<QueryResponse>(
      //   `http://localhost:9090/api/v1/query_range?query=sum(rate(container_memory_usage_bytes))&start=1687385963385&end=1687389573501&step=10m`
      // );
      // console.log(test)
      //END OF TEST ZONE