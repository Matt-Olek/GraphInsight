import { useState } from 'react';

interface GraphControlsProps {
    onSettingsChange: (settings: GraphSettings) => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onResetZoom: () => void;
}

export interface GraphSettings {
    repulsionForce: number;
    linkDistance: number;
}

const defaultSettings: GraphSettings = {
    repulsionForce: 200,
    linkDistance: 200
};

export default function GraphControls({ onSettingsChange, onZoomIn, onZoomOut, onResetZoom }: GraphControlsProps) {
    const [settings, setSettings] = useState<GraphSettings>(defaultSettings);

    const handleChange = (key: keyof GraphSettings, value: number) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        onSettingsChange(newSettings);
    };

    return (
        <div className="card bg-base-100 shadow-xl p-4">
            <div className="card-body">
                <h2 className="card-title">Graph Settings</h2>

                <div className="space-y-4">
                    {/* Repulsion Force */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Repulsion Force</span>
                            <span className="label-text-alt">{settings.repulsionForce}</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="300"
                            value={settings.repulsionForce}
                            onChange={(e) => handleChange('repulsionForce', Number(e.target.value))}
                            className="range range-primary"
                        />
                    </div>

                    {/* Link Distance */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Link Distance</span>
                            <span className="label-text-alt">{settings.linkDistance}</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="300"
                            value={settings.linkDistance}
                            onChange={(e) => handleChange('linkDistance', Number(e.target.value))}
                            className="range range-primary"
                        />
                    </div>

                    {/* Zoom Controls */}
                    <div className="divider">Zoom Controls</div>
                    <div className="flex justify-between gap-2">
                        <button onClick={onZoomIn} className="btn btn-sm btn-outline flex-1">+</button>
                        <button onClick={onResetZoom} className="btn btn-sm btn-outline flex-1">Reset</button>
                        <button onClick={onZoomOut} className="btn btn-sm btn-outline flex-1">-</button>
                    </div>

                    {/* Reset Button */}
                    <button
                        className="btn btn-outline btn-primary w-full"
                        onClick={() => {
                            setSettings(defaultSettings);
                            onSettingsChange(defaultSettings);
                        }}
                    >
                        Reset to Default
                    </button>
                </div>
            </div>
        </div>
    );
} 