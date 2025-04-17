export interface GraphNode {
  id: number;
  semantic_summary: string;
  [key: string]: any;
}

export interface GraphEdge {
  source_id: number;
  target_id: number;
  [key: string]: any;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  [key: string]: any;
}

export interface ForceGraphNode {
  id: string;
  name: string;
  embedding?: number[];
  metadata?: Record<string, any>;
  val?: number;
}

export interface ForceGraphLink {
  source: string;
  target: string;
}

export interface ForceGraphData {
  nodes: ForceGraphNode[];
  links: ForceGraphLink[];
} 