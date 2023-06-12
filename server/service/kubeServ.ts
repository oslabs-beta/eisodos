import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';

// Connect to the Kube cluster using the API URL
const connectToCluster = async (apiUrl: string): Promise<CoreV1Api> => {
  // Create instance of KubeConfig
  const kubeConfig = new KubeConfig();

  // Load the cluster configuration from URL
  kubeConfig.loadFromCluster(apiUrl);

  // Create instance of CoreV1Api using config
  const k8sApi = kubeConfig.makeApiClient(CoreV1Api);

  // Return CoreV1Api obj to interact with cluster
  return k8sApi;
};

// List pods in the default namespaces
const listPods = async (apiUrl: string): Promise<unknown> => {
  // Connect to the Kube cluster URL
  const k8sApi = await connectToCluster(apiUrl);

  // Use listNamespacedPod to list pods in the 'default' namespace
  const res = await k8sApi.listNamespacedPod('default');

  // Return the response containing the list of pods
  return res.body;
};

// List nodes in the cluster
const listNodes = async (apiUrl: string): Promise<unknown> => {
  // Connect to the Kube cluster with URL

  const k8sApi = await connectToCluster(apiUrl);
  // Use the listNode method to list all nodes in the cluster

  const res = await k8sApi.listNode();
  // Return the response containing the list of nodes
  return res.body;
};
const getNamespaces = async (apiUrl: string): Promise<unknown> => {
  // Connect to the Kube cluster URL
  const k8sApi = await connectToCluster(apiUrl);

  // Use listNamespace method to get all namespaces in the cluster
  const res = await k8sApi.listNamespace();

  // Return the response containing the list of namespaces
  return res.body;
};

export default {
  connectToCluster,
  listNodes,
  listPods,
  getNamespaces
};
