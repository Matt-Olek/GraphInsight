import { useState } from 'react'
import './App.css'
import GraphInput from './components/GraphInput'
import ForceGraphDisplay from './components/ForceGraphDisplay'
import DocumentationPage from './components/DocumentationPage'
import { GraphNode } from './types/Graph'
import { hierarchyToForceGraph } from './utils/graphUtils'

function App() {
  const [graphData, setGraphData] = useState<GraphNode | null>(null)
  const [viewMode, setViewMode] = useState<'input' | 'visualization' | 'documentation'>('input')
  
  const handleGraphDataSubmit = (data: GraphNode) => {
    setGraphData(data)
    setViewMode('visualization')
  }
  
  const handleBackToInput = () => {
    setViewMode('input')
  }
  
  const handleShowDocumentation = () => {
    setViewMode('documentation')
  }
  
  return (
    <div className="w-full h-screen bg-base-100">
      {viewMode === 'input' && (
        <div className="container mx-auto p-4 h-full flex flex-col items-center justify-center">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-3 font-handwriting">💢 GraphInsight</h1>
            <p className="text-xl text-base-content/70">Visualize hierarchical graph data with force-directed graphs</p>
          </header>
          
          <GraphInput onGraphDataSubmit={handleGraphDataSubmit} />
          
          <div className="mt-8">
            <button 
              onClick={handleShowDocumentation}
              className="text-sm underline hover:text-primary transition"
            >
              View Documentation & Formatting Guidelines
            </button>
          </div>
        </div>
      )}
      
      {viewMode === 'visualization' && graphData && (
        <ForceGraphDisplay 
          graphData={hierarchyToForceGraph(graphData)} 
          onBack={handleBackToInput} 
        />
      )}
      
      {viewMode === 'documentation' && (
        <DocumentationPage onBack={handleBackToInput} />
      )}
    </div>
  )
}

export default App
