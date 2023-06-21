import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import axios from 'axios';

interface Pod {
  name: string;
}

interface Node {
  name: string;
  pods: Pod[];
}

interface Namespace {
  name: string;
  nodes: Node[];
}

interface ClusterHierarchy {
  namespaces: Namespace[];
}

interface ForceGraphNode {
  id: string;
}

interface ForceGraphLink {
  source: string;
  target: string;
}

const HierarchyPage: React.FC = () => {
  const [clusterData, setClusterData] = useState<ClusterHierarchy | null>(null);
  const [nodes, setNodes] = useState<ForceGraphNode[]>([]);
  const [links, setLinks] = useState<ForceGraphLink[]>([]);

  // Fetch cluster data on component mount
  useEffect(() => {
    axios
      .get('/api/hierarchy/tree')
      .then((response) => {
        setClusterData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cluster data:', error);
      });
  }, []);

  // Convert data to format required by graph
  const convertData = (data: ClusterHierarchy) => {
    const nodes: ForceGraphNode[] = [];
    const links: ForceGraphLink[] = [];
    // Loop through the namespaces
    data.namespaces.forEach((namespace) => {
      nodes.push({ id: namespace.name });
      // Add the namespace as a node
      // Loop through the nodes within the namespace
      namespace.nodes.forEach((node) => {
        // Add the node as a node
        nodes.push({ id: node.name });
        // Create links between the namespace and the node
        links.push({ source: namespace.name, target: node.name });
        // Loop through the pods within the node
        node.pods.forEach((pod) => {
          // Add the pod as a node
          nodes.push({ id: pod.name });
          // Create links between the node and the pod
          links.push({ source: node.name, target: pod.name });
        });
      });
    });

    return { nodes, links };
  };

  useEffect(() => {
    if (clusterData) {
      const { nodes, links } = convertData(clusterData);
      setNodes(nodes);
      setLinks(links);
    }
  }, [clusterData]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ForceGraph2D graphData={{ nodes, links }} />
    </div>
  );
};

export default HierarchyPage;
