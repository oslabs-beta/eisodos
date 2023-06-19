import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';

interface Node {
  name: string;
  pods: CustomPod[];
}
// Had to defined custom interface was getting issues with typescript and what V1pod wanted
interface CustomPod extends k8s.V1Pod {
  name: string;
  namespace: string;
  nodeName: string;
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
      const kc = new k8s.KubeConfig();
      kc.loadFromDefault();
      const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
      // Retrieve the list of nodes, pods, and namespaces from the Kubernetes API
      const [nodeList, podList, namespaceList] = await Promise.all([
        k8sApi.listNode(),
        k8sApi.listPodForAllNamespaces(),
        k8sApi.listNamespace()
      ]);
      // Create an array to hold the nodes
      const nodes: Node[] = nodeList.body.items.map((node) => ({
        name: node.metadata?.name || '',
        pods: []
      }));
      // Create an array to hold the namespaces
      const namespaces: Namespace[] = namespaceList.body.items.map((namespace) => ({
        name: namespace.metadata?.name || '',
        nodes: []
      }));
      // Create an array to hold the custom pods
      const pods: CustomPod[] = podList.body.items.map((pod) => {
        const metadata = pod.metadata || {};
        const nodeName = pod.spec?.nodeName || '';
        return {
          ...pod,
          name: metadata.name || '',
          namespace: metadata.namespace || '',
          nodeName
        };
      });

      // Assign pods to corresponding nodes
      nodes.forEach((node) => {
        node.pods = pods.filter((pod) => pod.nodeName === node.name);
      });

      // Assign nodes to corresponding namespaces
      namespaces.forEach((namespace) => {
        namespace.nodes = nodes.filter((node) => node.pods.some((pod) => pod.namespace === namespace.name));
      });

      const clusterHierarchy: ClusterHierarchy = {
        namespaces
      };

      res.locals.cluster = clusterHierarchy;
      return next();
    } catch (error) {
      return next({ log: `Error in showCluster: ${error}` });
    }
  }
};

export default hierarchyController;
