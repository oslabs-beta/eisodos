import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import axios from 'axios';
import Legend from './Legend';

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
  type: string; // differentiate between different node types
  x?: number; // x-coordinate
  y?: number; // y-coordinate
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
      nodes.push({ id: namespace.name, type: 'namespace' });
      // Loop through the nodes within the namespace
      namespace.nodes.forEach((node) => {
        nodes.push({ id: node.name, type: 'node' });
        links.push({ source: namespace.name, target: node.name });
        // Loop through the pods within the node
        node.pods.forEach((pod) => {
          nodes.push({ id: pod.name, type: 'pod' });
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
      <Legend />
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeCanvasObject={(node, ctx) => {
          if (typeof node.x === 'number' && typeof node.y === 'number') {
            ctx.beginPath();
            if (node.type === 'namespace') {
              ctx.fillStyle = '#2563eb';
              ctx.rect(node.x - 10, node.y - 10, 20, 20); // Draw a square
            } else if (node.type === 'node') {
              ctx.fillStyle = '#22d3ee';
              ctx.moveTo(node.x, node.y - 10);
              ctx.lineTo(node.x + 10, node.y + 10);
              ctx.lineTo(node.x - 10, node.y + 10);
              ctx.closePath(); // Draw a triangle
            } else {
              ctx.fillStyle = '#4ade80';
              ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false); // Draw a circle
            }
            ctx.fill();
          }
        }}
        linkColor={() => '#e1e4e8'} // links color
      />
    </div>
  );
};

export default HierarchyPage;
