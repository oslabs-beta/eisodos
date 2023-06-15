import {
  KubeConfig,
  CoreV1Api,
  V1PodList,
  V1NodeList,
  V1NamespaceList,
  AppsV1Api,
} from '@kubernetes/client-node';

// Connect to the local Kube cluster
const connectToCluster = async (): Promise<CoreV1Api> => {
  // Create instance of KubeConfig
  const kubeConfig = new KubeConfig();

  // Load the default cluster configuration
  kubeConfig.loadFromDefault();

  // Create instance of CoreV1Api using config
  const k8sApi = kubeConfig.makeApiClient(CoreV1Api);

  // Return CoreV1Api obj to interact with cluster
  return k8sApi;
};

// List pods in the default namespace
const listPods = async (): Promise<V1PodList> => {
  // Connect to the local Kube cluster
  const k8sApi = await connectToCluster();

  // Use listNamespacedPod to list pods in the 'default' namespace
  const res = await k8sApi.listNamespacedPod('default');

  // Return list of pods
  return res.body;
};

// List nodes in the cluster
const listNodes = async (): Promise<V1NodeList> => {
  // Connect to the local Kube cluster
  const k8sApi = await connectToCluster();

  // Use listNode method to list all nodes
  const res = await k8sApi.listNode();

  // Return response containing list of nodes
  return res.body;
};

const getNamespaces = async (): Promise<V1NamespaceList> => {
  // Connect to the local Kube cluster
  const k8sApi = await connectToCluster();

  // Use listNamespace method to get all namespaces in the cluster
  const res = await k8sApi.listNamespace();

  // Return list of namespaces
  return res.body;
};

const getAppsV1ApiClient = (): AppsV1Api => {
  const kubeConfig = new KubeConfig();
  kubeConfig.loadFromDefault();
  return kubeConfig.makeApiClient(AppsV1Api);
};

export default {
  connectToCluster,
  listNodes,
  listPods,
  getNamespaces,
  getAppsV1ApiClient,
};
