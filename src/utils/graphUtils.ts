import { GraphNode, ForceGraphData, ForceGraphNode, ForceGraphLink } from '../types/Graph';
import { GraphData, GraphEdge } from '../types/Graph';

export function hierarchyToForceGraph(rootNode: GraphNode): ForceGraphData {
  const nodes: ForceGraphNode[] = [];
  const links: ForceGraphLink[] = [];

  function processNode(node: GraphNode, parentId?: string): string {
    const id = `${node.name}_${nodes.length}`; // Generate unique ID

    // Add node
    nodes.push({
      id,
      name: node.name,
      embedding: node.embedding || undefined,
      metadata: node.metadata,
      val: node.children.length + 1 // Size based on number of children
    });

    // Add link to parent if it exists
    if (parentId) {
      links.push({
        source: parentId,
        target: id
      });
    }

    // Process children
    for (const child of node.children) {
      processNode(child, id);
    }

    return id;
  }

  processNode(rootNode);

  return { nodes, links };
}

export function validateGraphData(data: any): data is GraphData {
  // Check if data is an object
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check if nodes and edges arrays exist
  if (!Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
    return false;
  }

  // Validate each node
  for (const node of data.nodes) {
    if (!node || typeof node !== 'object') {
      return false;
    }

    // Check required node properties
    if (typeof node.id !== 'number' ||
      typeof node.semantic_summary !== 'string') {
      return false;
    }
  }

  // Validate each edge
  for (const edge of data.edges) {
    if (!edge || typeof edge !== 'object') {
      return false;
    }

    // Check required edge properties
    if (typeof edge.source_id !== 'number' ||
      typeof edge.target_id !== 'number') {
      return false;
    }

    // Verify that source and target nodes exist
    const sourceExists = data.nodes.some((node: GraphNode) => node.id === edge.source_id);
    const targetExists = data.nodes.some((node: GraphNode) => node.id === edge.target_id);

    if (!sourceExists || !targetExists) {
      return false;
    }
  }

  return true;
} 