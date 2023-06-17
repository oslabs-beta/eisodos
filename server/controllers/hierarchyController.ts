import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';
interface Node {
  name: string;
  pods: Pod[];
}

interface Pod {
  name: string;
  namespace: string;
}

interface Namespace {
  name: string;
  nodes: Node[];
}

interface ClusterHierarchy {
  namespaces: Namespace[];
}
const hierarchyController = {
  showCluster: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Create a new KubeConfig
      const kc = new k8s.KubeConfig();
      // Load the config from default location
      kc.loadFromDefault();
      // Create instance of Corev1api using the loaded config
      const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

      // Get the required information from the cluster
      const [nodeList, podList, namespaceList] = await Promise.all([
        k8sApi.listNode(),
        k8sApi.listPodForAllNamespaces(),
        k8sApi.listNamespace()
      ]);
      // Create an empty array to store the nodes
      const nodes: Node[] = [];

      // Create an empty array to store the pods
      const pods: Pod[] = [];

      // Create an empty array to store the namespaces
      const namespaces: Namespace[] = [];
    } catch (error) {}
  }
};

export default hierarchyController;
