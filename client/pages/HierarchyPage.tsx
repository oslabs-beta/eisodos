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
    // Initialize empty arrays to store nodes, and links
    const nodes: ForceGraphNode[] = [];
    const links: ForceGraphLink[] = [];
    const nodeNames = new Set(); // add a set

    // Loop through the namespaces in data
    data.namespaces.forEach((namespace) => {
      // Add the namespace as a node
      if (!nodeNames.has(namespace.name)) {
        // Check if node name already exists
        nodes.push({ id: namespace.name, type: 'namespace' });
        nodeNames.add(namespace.name); // Add node name to Set
      }
      // Loop through the nodes within the namespace
      namespace.nodes.forEach((node) => {
        // Add node as a node
        if (!nodeNames.has(node.name)) {
          // Check if node name already exists
          nodes.push({ id: node.name, type: 'node' });
          nodeNames.add(node.name); // Add node name to Set
        }
        // Add a link between the namespace and node
        links.push({ source: namespace.name, target: node.name });
        // Loop through the pods within the node
        node.pods.forEach((pod) => {
          // Add the pod as a node
          if (!nodeNames.has(pod.name)) {
            // Check if node name already exists
            nodes.push({ id: pod.name, type: 'pod' });
            nodeNames.add(pod.name); // Add node name to Set
          }
          // Add a link between the node and pod
          links.push({ source: node.name, target: pod.name });
        });
      });
    });
    // Return the nodes and links
    return { nodes, links };
  };

  // Update nodes and links if clusterData change
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
        width={1376} //make responsive?
        height={800} //make responsive?
        graphData={{ nodes, links }} // Set nodes and links data for the graph ... we have to define custom rednerding for nodes
        nodeCanvasObject={(node, ctx) => {
          if (typeof node.x === 'number' && typeof node.y === 'number') {
            // Make sure node has coords
            ctx.beginPath(); //  Start path for drawing
            if (node.type === 'namespace') {
              // If node is namespace
              ctx.fillStyle = '#2563eb'; // Set color
              ctx.rect(node.x - 10, node.y - 10, 20, 20); // Draw a square
            } else if (node.type === 'node') {
              // If node is a node
              ctx.fillStyle = '#22d3ee'; // Set color
              ctx.moveTo(node.x, node.y - 10); // Start triangle path :(
              ctx.lineTo(node.x + 10, node.y + 10); // Draw first line of tri
              ctx.lineTo(node.x - 10, node.y + 10); // Draw second line of tri
              ctx.closePath(); // Draw a triangle
            } else {
              ctx.fillStyle = '#4ade80'; // If pod set color and draw circle
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
