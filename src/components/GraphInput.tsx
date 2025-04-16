import { useState, useCallback } from 'react';
import { validateGraphData } from '../utils/graphUtils';
import { GraphNode } from '../types/Graph';

interface GraphInputProps {
  onGraphDataSubmit: (data: GraphNode) => void;
}

export default function GraphInput({ onGraphDataSubmit }: GraphInputProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target?.result as string);
        
        if (validateGraphData(parsedData)) {
          onGraphDataSubmit(parsedData);
          setError(null);
        } else {
          setError('Invalid graph data structure. Please check the format.');
        }
      } catch (e) {
        setError('Invalid JSON format. Please check your file.');
      }
    };
    
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleFileRead(file);
      } else {
        setError('Please upload a JSON file.');
      }
    }
  }, [onGraphDataSubmit]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileRead(e.target.files[0]);
    }
  };

  const loadSampleData = () => {
    const sampleData = {
      "name": "Science",
      "embedding": [0.1, 0.15, 0.2],
      "metadata": {"domain": "Fundamental Knowledge", "created": "2024-01-01"},
      "children": [
        {
          "name": "Physics",
          "embedding": [0.2, 0.25, 0.3],
          "metadata": {"field": "Natural Science"},
          "children": [
            {
              "name": "Classical Mechanics",
              "embedding": [0.21, 0.26, 0.31],
              "metadata": {},
              "children": [
                {"name": "Newton's Laws", "embedding": null, "metadata": {"importance": "High"}, "children": []},
                {"name": "Lagrangian Mechanics", "embedding": [0.22, 0.27, 0.32], "metadata": {}, "children": []}
              ]
            }
          ]
        }
      ]
    };
    
    onGraphDataSubmit(sampleData);
    setError(null);
  };

  const loadFullSampleData = () => {
    const fullSampleData = {
      "name": "Science",
      "embedding": [0.1, 0.15, 0.2],
      "metadata": {"domain": "Fundamental Knowledge", "created": "2024-01-01"},
      "children": [
        {
          "name": "Physics",
          "embedding": [0.2, 0.25, 0.3],
          "metadata": {"field": "Natural Science"},
          "children": [
            {
              "name": "Classical Mechanics",
              "embedding": [0.21, 0.26, 0.31],
              "metadata": {},
              "children": [
                {"name": "Newton's Laws", "embedding": null, "metadata": {"importance": "High"}, "children": []},
                {"name": "Lagrangian Mechanics", "embedding": [0.22, 0.27, 0.32], "metadata": {}, "children": []}
              ]
            },
            {
              "name": "Quantum Mechanics",
              "embedding": [0.3, 0.35, 0.4],
              "metadata": {"difficulty": "High"},
              "children": [
                {"name": "Schrödinger Equation", "embedding": [0.31, 0.36, 0.41], "metadata": {}, "children": []},
                {"name": "Quantum Entanglement", "embedding": null, "metadata": {"phenomenon": "spooky action"}, "children": []}
              ]
            },
            {
              "name": "Thermodynamics",
              "embedding": [0.4, 0.45, 0.5],
              "metadata": {},
              "children": [
                {"name": "Laws of Thermodynamics", "embedding": [0.41, 0.46, 0.51], "metadata": {}, "children": []}
              ]
            }
          ]
        },
        {
          "name": "Biology",
          "embedding": [0.5, 0.55, 0.6],
          "metadata": {"field": "Life Science"},
          "children": [
            {
              "name": "Genetics",
              "embedding": [0.51, 0.56, 0.61],
              "metadata": {},
              "children": [
                {"name": "DNA", "embedding": [0.52, 0.57, 0.62], "metadata": {"structure": "Double Helix"}, "children": []},
                {"name": "RNA", "embedding": [0.53, 0.58, 0.63], "metadata": {}, "children": []}
              ]
            },
            {
              "name": "Ecology",
              "embedding": [0.6, 0.65, 0.7],
              "metadata": {},
              "children": [
                {"name": "Ecosystems", "embedding": null, "metadata": {}, "children": []},
                {"name": "Biodiversity", "embedding": [0.61, 0.66, 0.71], "metadata": {}, "children": []}
              ]
            },
            {
              "name": "Cell Biology",
              "embedding": [0.7, 0.75, 0.8],
              "metadata": {},
              "children": []
            }
          ]
        },
        {
          "name": "Computer Science",
          "embedding": [0.8, 0.85, 0.9],
          "metadata": {"field": "Formal Science", "relevance": "High"},
          "children": [
            {
              "name": "Algorithms",
              "embedding": [0.81, 0.86, 0.91],
              "metadata": {},
              "children": [
                {"name": "Sorting Algorithms", "embedding": null, "metadata": {}, "children": []},
                {"name": "Graph Algorithms", "embedding": [0.82, 0.87, 0.92], "metadata": {}, "children": []}
              ]
            },
            {
              "name": "Artificial Intelligence",
              "embedding": [0.9, 0.95, 1.0],
              "metadata": {"subfield": "emerging"},
              "children": [
                {"name": "Machine Learning", "embedding": [0.91, 0.96, 1.01], "metadata": {}, "children": []},
                {"name": "Natural Language Processing", "embedding": [0.92, 0.97, 1.02], "metadata": {}, "children": []}
              ]
            }
          ]
        }
      ]
    };
    
    onGraphDataSubmit(fullSampleData);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full mx-auto">

      
      <div 
        className={`w-full max-w-3xl h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors
          ${isDragging ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary/50 hover:bg-base-200'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg font-medium mb-1">Drop your JSON file here</p>
          <p className="text-base-content/60 text-sm">or click to browse files</p>
        </div>
      </div>
      
      {error && <div className="alert alert-error max-w-3xl">{error}</div>}
      
      <div className="flex gap-4">
        <button 
          onClick={loadSampleData}
          className="btn btn-soft btn-primary"
        >
          Load Small Sample
        </button>
        <button 
          onClick={loadFullSampleData}
          className="btn btn-soft btn-primary"
        >
          Load Full Sample
        </button>
      </div>
    </div>
  );
} 