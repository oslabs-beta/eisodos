import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';
import { current } from '@reduxjs/toolkit';

// Interfaces define the structure and types of the data received from the API response
interface PromResult {
  metric: Record<string, string>;

  //TODO: MAKE SURE THIS WORKS FOR BOTH TYPES OF RESPONSES
  value: [number, string];
  values: [number, string][];
  
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

interface GlobalMetrics {
  cpu: MetricData[];
  memory: MetricData[];
  transmit: MetricData[];
  receive: MetricData[];
}
interface MetricData {
  timestamp: number;
  value: string;
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
    // example request: http://localhost:8080/api/dashboard/global-metrics?time=10m
    //destructuring query parameters (no paramaters will get instant metrics)
    let { time, namespace }: { time?: string | undefined; namespace?: string | undefined } = req.query;
    if (!time) time = '';
    else time = `[${time}]`;

    if (!namespace) namespace = '';
    else namespace = `,namespace ="${namespace}"`;

    //querying for data
    try {
      //Retrieve CPU usage

      //TODO REMOVE CONTAINER != "" FOR GLOBAL METRICS
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

      //Formatting Response from CPU and Mem response
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
              value: metric
            };
          } else {
            cpuResult[i].value = (parseFloat(cpuResult[i].value) + parseFloat(metric)).toString().slice(0,8);

          }
        }
      }

      // looping through formatted responses for memory data and aggregating data across all pods
      const memResult: MetricData[] = [];
      for (const pod of formattedResponse) {
        if (!pod.metrics.memory) continue;

        for (let i = 0; i < pod.metrics.memory.length; i++) {
          const [timestamp, metric] = pod.metrics.memory[i];
          
          //converting to gigabytes
          const gigabytes = (parseFloat(metric) / 1000000000).toString()
          
          if (!memResult[i]) {
            memResult[i] = {
              timestamp: timestamp,
              value: gigabytes
            };
          } else {
            memResult[i].value = (parseFloat(memResult[i].value) + parseFloat(gigabytes)).toString().slice(0,6);
            // while( memResult[i].value.length < 6){
            //   memResult[i].value+='0'
            // }
          }
        }
      }

      //getting transmit and receive data 
      const transmitResult: MetricData[] = [];
      const receiveResult: MetricData[] = [];

      let transmitData: [number, string][] = [];
      let receiveData: [number, string][] = [];
      
      //dealing with prometheus auto pluralization
      let networkingLength = 0
      if (responseTransmit.data.data.result[0].values){
        networkingLength = responseTransmit.data.data.result[0].values.length
      }
      if (responseTransmit.data.data.result[0].value){
        networkingLength = 1
      }
      
        for (let i = 0; i < networkingLength; i++) {
          
          for (let j = 0 ; j < responseTransmit.data.data.result.length;j++ ){
            //dealing with prometheus auto pluralization again
            if (responseCpuUsage.data.data.result[j].values) {
              transmitData = responseTransmit.data.data.result[j].values;
              receiveData = responseReceive.data.data.result[j].values;
            }
            if (responseCpuUsage.data.data.result[j].value) {
              transmitData.push(responseTransmit.data.data.result[j].value);
              receiveData.push(responseReceive.data.data.result[j].value);
            }


            //converting to gigabytes
            const transmitGigabytes = (parseFloat(transmitData[i][1])/1000000000).toString()

            //creating object for transmit data
            if (!transmitResult[i]) {
              transmitResult[i] = {
                timestamp: transmitData[i][0],
                value: transmitGigabytes
              };
            } else {
              transmitResult[i].value = (parseFloat(transmitResult[i].value) + parseFloat(transmitGigabytes)).toString().slice(0,6);
            }

            const receiveGigabytes = (parseFloat(receiveData[i][1])/1000000000).toString()

            //creating object for receive data
            if (!receiveResult[i]) {
              receiveResult[i] = {
                timestamp: receiveData[i][0],
                value: receiveGigabytes
              };
            } else {
              receiveResult[i].value = (parseFloat(receiveResult[i].value) + parseFloat(receiveGigabytes)).toString().slice(0,6);
            }
          }
        }
      
      

      //collecting CPU, Memory, Transmit, and Receive into one object to be returned to the front end
      const result: GlobalMetrics = {
        cpu: cpuResult,
        memory: memResult,
        transmit: transmitResult,
        receive: receiveResult
      };

      // console.log(result)

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
  },
  getGlobalMetricPercentages: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const cpuUtilization = await axios.get<QueryResponse>(
        `http://localhost:9090/api/v1/query?query=1 - sum(avg by (mode) (rate(node_cpu_seconds_total{job="node-exporter", mode=~"idle|iowait|steal"}[10m])))`
      );
      const memUtilization = await axios.get<QueryResponse>(
        `http://localhost:9090/api/v1/query?query= 1 - sum(:node_memory_MemAvailable_bytes:sum) / sum(node_memory_MemTotal_bytes{job="node-exporter"})`
      );
      
      const cpuPercent = cpuUtilization.data.data.result[0].value[1]
      const memPercent = memUtilization.data.data.result[0].value[1]
      
      const result = {
        cpuPercent:cpuPercent ,
        memPercent:memPercent
      }
     
      res.locals.data = result;
      return next();
    } catch (error) {
      return next({ log: `Error in getGlobalMetricPercentages: ${error}` });
    }
  }
};

export default dashboardController;


