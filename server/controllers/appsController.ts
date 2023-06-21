import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';

interface SimplePodInfo {
  name: string;
  status: string;
}

interface AppData {
  [key: string]: SimplePodInfo[];
}

interface NamespaceData {
  [key: string]: AppData;
}

const appsController = {
  getPods: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Initialize Kube config
      const kc = new k8s.KubeConfig();
      // Load config from default
      kc.loadFromDefault();
      // Create coreV1api instance using the config
      const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
      // Retrieve pod list using method
      const { body: podList } = await k8sApi.listPodForAllNamespaces();
      // Initialize an empty obj store pod info
      const namespaceGroupedPods: NamespaceData = {};
      // Iterate over each pod
      for (const pod of podList.items) {
        const namespace = pod.metadata?.namespace;
        const name = pod.metadata?.name;
        const status = pod.status?.phase;
        const appName = pod.metadata?.labels?.app;
        // Extract namespace , name , status and appName from pod data
        if (!namespace || !name || !status || !appName) continue; // Skip pods with undefined or unknown namespaces, appNames
        // If namespace doesn't exist in namspaceGRoupedPod create it
        if (!namespaceGroupedPods[namespace]) {
          namespaceGroupedPods[namespace] = {};
        }
        // If appName doesn't exist in the namespace data , create it
        if (!namespaceGroupedPods[namespace][appName]) {
          namespaceGroupedPods[namespace][appName] = [];
        }
        // Add the pods name and status to its respective namespace and Appname
        namespaceGroupedPods[namespace][appName].push({ name, status });
      }

      res.locals.pods = namespaceGroupedPods;

      return next();
    } catch (error) {
      return next({ log: `Error in getPods: ${error}` });
    }
  }
};

export default appsController;
