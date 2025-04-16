import { useRef, useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { ForceGraphData, ForceGraphNode } from '../types/Graph';

interface ForceGraphDisplayProps {
  graphData: ForceGraphData;
  onBack: () => void;
}

interface NodeWithPosition extends ForceGraphNode {
  x?: number;
  y?: number;
  color?: string;
}


export default function ForceGraphDisplay({ graphData, onBack }: ForceGraphDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set());
  const [showMetadata, setShowMetadata] = useState(false);
  
  const handleNodeHover = useCallback((node: NodeWithPosition | null) => {
    if (node) {
      setHighlightedNode(node.id);
      
      // Find connected links
      const connectedLinks = new Set<string>();
      graphData.links.forEach(link => {
        if (link.source === node.id || link.target === node.id) {
          connectedLinks.add(`${link.source}-${link.target}`);
        }
      });
      setHighlightLinks(connectedLinks);
    } else {
      setHighlightedNode(null);
      setHighlightLinks(new Set());
    }
  }, [graphData.links]);
  
  const handleZoomIn = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      graphRef.current.zoom(currentZoom * 1.5, 400); // duration in ms
    }
  };
  
  const handleZoomOut = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      graphRef.current.zoom(currentZoom / 1.5, 400); // duration in ms
    }
  };
  
  const handleResetZoom = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400, 50); // duration, padding
    }
  };
  
  useEffect(() => {
    // Adjust the size on resize
    const handleResize = () => {
      if (containerRef.current && graphRef.current) {
        graphRef.current.width(containerRef.current.offsetWidth);
        graphRef.current.height(containerRef.current.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial zoom to fit
    setTimeout(() => {
      if (graphRef.current) {
        graphRef.current.zoomToFit(400);
      }
    }, 500);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [graphData]);
  
  const getNodeColor = (node: NodeWithPosition) => {
    if (highlightedNode && node.id === highlightedNode) {
      return '#E91E63'; // Highlight color for selected node
    }
    return node.color as string;
  };
  
  const getLinkColor = (link: any) => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    if (highlightLinks.has(`${sourceId}-${targetId}`) || 
        highlightLinks.has(`${targetId}-${sourceId}`)) {
      return '#E91E63'; // Highlight color for connected links
    }
    return '#aaaaaa';
  };

  const isLinkHighlighted = (link: any) => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    return highlightLinks.has(`${sourceId}-${targetId}`) || 
           highlightLinks.has(`${targetId}-${sourceId}`);
  };
  
  return (
    <div className="relative h-screen w-full">
      <div 
        ref={containerRef} 
        className="w-full h-full"
      >
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel="name"
          nodeAutoColorBy="name"
          nodeVal={(node) => node.val || 1}
          linkWidth={(link) => isLinkHighlighted(link) ? 2.5 : 1.5}
          linkColor={getLinkColor}
          linkDirectionalParticles={(link) => isLinkHighlighted(link) ? 5 : 2}
          linkDirectionalParticleSpeed={0.005}
          onNodeHover={handleNodeHover}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const label = node.name;
            const isHighlighted = highlightedNode === node.id;
            const fontSize = isHighlighted ? 16/globalScale : 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
            
            // Node circle
            ctx.beginPath();
            const nodeSize = isHighlighted ? 8 : 5;
            ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
            ctx.fillStyle = getNodeColor(node);
            ctx.fill();
            
            if (isHighlighted) {
              // Add a border for highlighted nodes
              ctx.strokeStyle = '#000';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
            
            // Text background
            ctx.fillStyle = isHighlighted ? 'rgba(255, 235, 245, 0.9)' : 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2,
              bckgDimensions[0],
              bckgDimensions[1]
            );
            
            // Text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = isHighlighted ? '#E91E63' : 'black';
            ctx.fillText(label, node.x, node.y);
          }}
          cooldownTicks={100}
          onEngineStop={() => {
            // Called when the simulation finishes its initial cooldown phase
          }}
        />
      </div>
      
      {/* Top fixed control bar */}
      <div className="fixed top-0 left-0 right-0 bg-base-300/80 backdrop-blur-sm p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="btn btn-ghost btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h2 className="text-xl font-bold">{graphData.nodes[0]?.name || 'Graph'} Visualization</h2>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => setShowMetadata(!showMetadata)} className="btn btn-ghost btn-sm">
            {showMetadata ? 'Hide Metadata' : 'Show Metadata'}
          </button>
          <div className="btn-group btn-group-horizontal">
            <button onClick={handleZoomIn} className="btn btn-sm btn-outline">+</button>
            <button onClick={handleResetZoom} className="btn btn-sm btn-outline">Reset</button>
            <button onClick={handleZoomOut} className="btn btn-sm btn-outline">-</button>
          </div>
        </div>
      </div>
      
      {/* Metadata slide-out panel */}
      {showMetadata && (
        <div className="fixed right-0 top-16 bottom-0 w-80 bg-base-100 shadow-lg p-4 overflow-auto z-10 animate-slide-in-right">
          <h3 className="text-lg font-bold mb-2">Graph Metadata</h3>
          <div className="divider"></div>
          <pre className="text-xs overflow-auto bg-base-200 p-2 rounded-box">
            {JSON.stringify(graphData.nodes[0]?.metadata || {}, null, 2)}
          </pre>
          
          <h3 className="text-lg font-bold mt-4 mb-2">Node Count</h3>
          <div className="stat-value text-primary">{graphData.nodes.length}</div>
          
          <h3 className="text-lg font-bold mt-4 mb-2">Link Count</h3>
          <div className="stat-value text-secondary">{graphData.links.length}</div>
        </div>
      )}
    </div>
  );
} 