import { useState, useCallback } from 'react';
import { validateGraphData } from '../utils/graphUtils';
import { GraphData } from '../types/Graph';
import sampleGraphData from '../data/sampleGraphData.json';

interface GraphInputProps {
  onGraphDataSubmit: (data: GraphData) => void;
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
    onGraphDataSubmit(sampleGraphData as GraphData);
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

      <button
        onClick={loadSampleData}
        className="btn btn-soft btn-primary"
      >
        Load Sample Data
      </button>
    </div>
  );
} 