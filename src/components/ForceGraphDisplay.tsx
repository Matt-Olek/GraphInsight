import { useRef, useEffect, useState } from 'react';
import { Network, Data, Edge, Node, Options } from 'vis-network';
import { DataSet } from 'vis-data';
import { GraphData, GraphNode } from '../types/Graph';
import GraphControls, { GraphSettings } from './GraphControls';
import 'vis-network/styles/vis-network.css';

interface ForceGraphDisplayProps {
  graphData: GraphData;
  onBack: () => void;
}

export default function ForceGraphDisplay({ graphData, onBack }: ForceGraphDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [settings, setSettings] = useState<GraphSettings>({
    repulsionForce: 200,
    linkDistance: 200
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get the primary color from CSS variables
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-success').trim();

    // Create nodes array for vis.js
    const nodes = new DataSet<Node>(
      graphData.nodes.map(node => ({
        id: node.id,
        label: node.semantic_summary,
        title: node.semantic_summary,
        color: {
          background: primaryColor,
          border: primaryColor,
          highlight: {
            background: primaryColor,
            border: primaryColor
          }
        },
        value: 20,
        shape: 'dot',
        size: 20
      }))
    );

    // Create edges array for vis.js
    const edges = new DataSet<Edge>(
      graphData.edges.map(edge => ({
        from: edge.source_id,
        to: edge.target_id,
        color: {
          color: 'rgba(204, 204, 204, 0.6)',
          highlight: 'rgba(153, 153, 153, 0.6)'
        },
        width: 1.5
      }))
    );

    // Create the network
    const data: Data = {
      nodes,
      edges
    };

    const options: Options = {
      nodes: {
        font: {
          size: 14,
          color: '#000000'
        }
      },
      edges: {
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.7
        },
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        }
      },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD',
          sortMethod: 'directed',
          shakeTowards: 'roots',
          levelSeparation: settings.linkDistance,
          nodeSpacing: settings.repulsionForce / 2,
          treeSpacing: settings.repulsionForce,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true
        }
      },
      physics: {
        hierarchicalRepulsion: {
          nodeDistance: settings.repulsionForce
        },
        stabilization: {
          iterations: 100
        }
      },
      interaction: {
        hover: false,
        tooltipDelay: 200
      }
    };

    networkRef.current = new Network(containerRef.current, data, options);

    // Handle node click
    networkRef.current.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = graphData.nodes.find(n => n.id === nodeId);
        if (node) {
          setSelectedNode(node);
        }
      }
    });

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && networkRef.current) {
        networkRef.current.redraw();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (networkRef.current) {
        networkRef.current.destroy();
      }
    };
  }, [graphData, settings]);

  const handleSettingsChange = (newSettings: GraphSettings) => {
    setSettings(newSettings);
  };

  const handleZoomIn = () => {
    if (networkRef.current) {
      const currentScale = networkRef.current.getScale();
      networkRef.current.moveTo({
        scale: currentScale * 1.5,
        animation: {
          duration: 400,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  };

  const handleZoomOut = () => {
    if (networkRef.current) {
      const currentScale = networkRef.current.getScale();
      networkRef.current.moveTo({
        scale: currentScale / 1.5,
        animation: {
          duration: 400,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  };

  const handleResetZoom = () => {
    if (networkRef.current) {
      networkRef.current.fit({
        animation: {
          duration: 400,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  };

  return (
    <div className="relative h-full w-full bg-base-100">
      <div
        ref={containerRef}
        className="w-full h-full"
      />

      <div className="fixed top-0 left-0 right-0 backdrop-blur-sm p-4 flex justify-between items-center z-10 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="btn btn-ghost btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h2 className="text-xl font-bold">Graph Visualization</h2>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="btn btn-sm btn-outline"
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
      </div>

      {/* Graph Controls */}
      {showSettings && (
        <div className="fixed top-20 right-4 z-20">
          <GraphControls
            onSettingsChange={handleSettingsChange}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />
        </div>
      )}

      {/* Node Details Modal */}
      {selectedNode && (
        <div className="fixed bottom-4 right-4 w-96 bg-white shadow-xl rounded-lg p-4 z-20 animate-slide-in-up border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Node Details</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="btn btn-ghost btn-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            <div className="font-semibold">Summary:</div>
            <div className="text-sm">{selectedNode.semantic_summary}</div>
            <div className="divider"></div>
            {Object.entries(selectedNode)
              .filter(([key]) => !['id', 'semantic_summary'].includes(key))
              .map(([key, value]) => (
                <div key={key} className="text-sm">
                  <div className="font-medium">{key}:</div>
                  {Array.isArray(value) ? (
                    <ul className="list-disc pl-4">
                      {value.map((item, i) => (
                        <li key={i}>
                          {typeof item === 'object' ? JSON.stringify(item) : item}
                        </li>
                      ))}
                    </ul>
                  ) : typeof value === 'object' ? (
                    <div>{JSON.stringify(value, null, 2)}</div>
                  ) : (
                    <div>{value}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
} 