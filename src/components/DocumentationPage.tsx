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
            GraphInsight accepts hierarchical JSON data in a specific format to generate visualizations.
            The input must follow these formatting constraints:
          </p>

          <div className="divider"></div>

          <h3 className="text-2xl font-bold mt-4 mb-3">Basic Structure</h3>
          <p className="mb-4">Your JSON data must represent a tree structure with nodes and children:</p>
          
          <div className="mockup-code mb-6">
            <pre><code>{`{
  "name": "Root Node",
  "children": [
    {
      "name": "Child 1",
      "children": [...]
    },
    {
      "name": "Child 2",
      "children": [...]
    }
  ]
}`}</code></pre>
          </div>
          
          <h3 className="text-2xl font-bold mt-6 mb-3">Required Fields</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><span className="font-bold">name</span> (string): A label for each node in the graph</li>
            <li><span className="font-bold">children</span> (array, optional): An array of child nodes</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-3">Optional Fields</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><span className="font-bold">value</span> (number): Affects the size of the node</li>
            <li><span className="font-bold">color</span> (string): Custom color for the node (hex code or named color)</li>
            <li><span className="font-bold">metadata</span> (object): Additional data to display on hover/selection</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-3">Example</h3>
          <div className="mockup-code mb-6">
            <pre><code>{`{
  "name": "Project",
  "value": 100,
  "color": "#5D8AA8",
  "metadata": {
    "description": "Main project overview"
  },
  "children": [
    {
      "name": "Module A",
      "value": 60,
      "children": [
        {
          "name": "Submodule A1",
          "value": 30
        },
        {
          "name": "Submodule A2",
          "value": 30,
          "color": "#E52B50"
        }
      ]
    },
    {
      "name": "Module B",
      "value": 40,
      "metadata": {
        "status": "in progress",
        "owner": "Team Alpha"
      }
    }
  ]
}`}</code></pre>
          </div>

          <h3 className="text-2xl font-bold mt-6 mb-3">Size Limits</h3>
          <p className="mb-2">For optimal performance:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Maximum recommended nodes: 500</li>
            <li>Maximum recommended depth: 10 levels</li>
            <li>Maximum file size: 5MB</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-3">Troubleshooting</h3>
          <p className="mb-2">Common issues:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Ensure your JSON is valid (no trailing commas, properly quoted keys)</li>
            <li>All nodes must have a name property</li>
            <li>The children property, if present, must be an array</li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default DocumentationPage; 