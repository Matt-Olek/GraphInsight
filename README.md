# GraphInsight

A simple web application that visualizes hierarchical JSON data using force-directed graphs.

## Overview

GraphInsight takes hierarchical data in JSON format and transforms it into interactive, force-directed graph visualizations. It's designed to help users quickly understand complex data structures and relationships through visual representation.

## Features

- Paste JSON data directly into the web interface
- Interactive force-directed graph visualization
- Node sizing and coloring based on data properties
- Detailed documentation for formatting requirements
- Responsive design for desktop and mobile use

## Live Demo

Try GraphInsight at: [https://graph-insight-viz.vercel.app](https://graph-insight-viz.vercel.app)

## Local Development

This project is built with:
- React
- TypeScript
- Vite
- TailwindCSS
- DaisyUI

To run locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

1. Paste your hierarchical JSON data into the input field
2. Click "Visualize" to generate an interactive graph
3. Explore the graph by dragging, zooming, and clicking on nodes
4. Return to the input screen to modify your data or try new datasets

## Example Data Format

```json
{
  "name": "Root Node",
  "children": [
    {
      "name": "Child 1",
      "children": []
    },
    {
      "name": "Child 2",
      "value": 30,
      "color": "#5D8AA8"
    }
  ]
}
```

Check the documentation page in the app for more details on formatting requirements.

## License

MIT
