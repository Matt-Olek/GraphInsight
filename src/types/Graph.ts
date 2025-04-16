export interface GraphNode {
  name: string;
  embedding: number[] | null;
  metadata: Record<string, any>;
  children: GraphNode[];
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