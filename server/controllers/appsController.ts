import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';

interface GroupedPods {
  [namespace: string]: Namespace;
}

interface Namespace {
  [app: string]: App;
}

interface App {
  status?: string;
}

const appsController = {
  getPods: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Initialize Kube config
      const kc = new k8s.KubeConfig();
      kc.loadFromDefault();
      const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
      const { body: podList } = await k8sApi.listPodForAllNamespaces();
      const namespaceGroupedPods: GroupedPods = {};

      for (const pod of podList.items) {
        const namespace = pod.metadata?.namespace;
        const fullName = pod.metadata?.name;
        const status = pod.status?.phase;

        if (!namespace || !fullName || !status) continue;

        let baseName = fullName.replace(/-\d.*$/, ''); // String that starts with a hyphen - followed by any digit

        // If baseName is a node exporter pod, strip unique identifier
        if (baseName.startsWith('my-monitoring-prometheus-node-exporter')) {
          baseName = 'my-monitoring-prometheus-node-exporter';
        }

        if (!namespaceGroupedPods[namespace]) {
          namespaceGroupedPods[namespace] = {};
        }

        const appKeys = Object.keys(namespaceGroupedPods[namespace]);

        // Check if the baseName matches the root name of any existing app keys
        const matchingKey = appKeys.find((key) => baseName.startsWith(key));

        if (matchingKey) {
          // If a matching key is found, update its status
          namespaceGroupedPods[namespace][matchingKey].status = status;
        } else {
          // If no matching key is found, create a new entry
          namespaceGroupedPods[namespace][baseName] = { status };
        }
      }

      res.locals.pods = namespaceGroupedPods;

      return next();
    } catch (error) {
      return next({ log: `Error in getPods: ${error}` });
    }
  }
};

export default appsController;
