import React from 'react';

interface DocumentationPageProps {
  onBack: () => void;
}

const DocumentationPage: React.FC<DocumentationPageProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-handwriting">Documentation</h1>
        <button
          onClick={onBack}
          className="btn btn-ghost"
        >
          Back to Home
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-4">Graph Visualization Format Requirements</h2>

          <p className="text-lg mb-6">
            GraphInsight accepts JSON data in a node-edge format to generate visualizations.
            The input must follow these formatting constraints:
          </p>

          <div className="divider"></div>

          <h3 className="text-2xl font-bold mt-4 mb-3">Basic Structure</h3>
          <p className="mb-4">Your JSON data must contain a nodes array and an edges array:</p>

          <div className="mockup-code mb-6">
            <pre><code>{`{
  "nodes": [
    {
      "id": 0,
      "semantic_summary": "Node Label"
    }
  ],
  "edges": [
    {
      "source_id": 0,
      "target_id": 1
    }
  ]
}`}</code></pre>
          </div>

          <h3 className="text-2xl font-bold mt-6 mb-3">Required Fields</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><span className="font-bold">nodes</span> (array): List of nodes in the graph</li>
            <li><span className="font-bold">edges</span> (array): List of connections between nodes</li>
            <li><span className="font-bold">id</span> (number): Unique identifier for each node</li>
            <li><span className="font-bold">semantic_summary</span> (string): Text label for the node</li>
            <li><span className="font-bold">source_id</span> (number): ID of the source node in an edge</li>
            <li><span className="font-bold">target_id</span> (number): ID of the target node in an edge</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-3">Optional Fields</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Additional properties can be added to both nodes and edges</li>
            <li>These will be displayed in the metadata panel when viewing the graph</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-3">Example</h3>
          <div className="mockup-code mb-6">
            <pre><code>{`{
  "nodes": [
    {
      "id": 0,
      "semantic_summary": "Knowledge",
      "type": "root"
    },
    {
      "id": 1,
      "semantic_summary": "Science",
      "type": "category"
    },
    {
      "id": 2,
      "semantic_summary": "Physics",
      "type": "subject"
    }
  ],
  "edges": [
    {
      "source_id": 0,
      "target_id": 1,
      "type": "contains"
    },
    {
      "source_id": 1,
      "target_id": 2,
      "type": "contains"
    }
  ]
}`}</code></pre>
          </div>

          <h3 className="text-2xl font-bold mt-6 mb-3">Size Limits</h3>
          <p className="mb-2">For optimal performance:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Maximum recommended nodes: 500</li>
            <li>Maximum recommended edges: 1000</li>
            <li>Maximum file size: 5MB</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-3">Troubleshooting</h3>
          <p className="mb-2">Common issues:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Ensure your JSON is valid (no trailing commas, properly quoted keys)</li>
            <li>All nodes must have a unique id</li>
            <li>All edges must reference valid node ids</li>
            <li>Each node must have a semantic_summary</li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default DocumentationPage; 