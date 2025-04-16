import { GraphNode, ForceGraphData, ForceGraphNode, ForceGraphLink } from '../types/Graph';

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

export function validateGraphData(data: any): data is GraphNode {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.name !== 'string') return false;
  if (data.embedding !== null && !Array.isArray(data.embedding)) return false;
  if (typeof data.metadata !== 'object') return false;
  if (!Array.isArray(data.children)) return false;
  
  // Validate children recursively
  for (const child of data.children) {
    if (!validateGraphData(child)) return false;
  }
  
  return true;
} 