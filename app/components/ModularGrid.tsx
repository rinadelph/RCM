import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Module {
  id: string;
  component: React.ReactNode;
  defaultSize: { w: number; h: number };
}

interface ModularGridProps {
  modules: Module[];
  onSaveLayout: (layout: any) => void;
  onLoadLayout: () => any;
}

const ModularGrid: React.FC<ModularGridProps> = ({ modules, onSaveLayout, onLoadLayout }) => {
  const [layouts, setLayouts] = useState(() => onLoadLayout() || {
    lg: modules.map((module, index) => ({
      i: module.id,
      x: (index % 3) * module.defaultSize.w,
      y: Math.floor(index / 3) * module.defaultSize.h,
      w: module.defaultSize.w,
      h: module.defaultSize.h,
      minW: 3,
      minH: 3,
    })),
  });
  const [hiddenModules, setHiddenModules] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const savedLayout = onLoadLayout();
    if (savedLayout) {
      setLayouts(savedLayout);
    }
  }, [onLoadLayout]);

  const onLayoutChange = (currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts);
  };

  const handleSaveLayout = () => {
    onSaveLayout(layouts);
  };

  const toggleModuleVisibility = (moduleId: string) => {
    setHiddenModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleShowAll = () => {
    setShowAll(prev => !prev);
    setHiddenModules(showAll ? modules.map(m => m.id) : []);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={handleSaveLayout}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Layout
        </button>
        <div>
          <button
            onClick={toggleShowAll}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            {showAll ? 'Hide All' : 'Show All'}
          </button>
        </div>
      </div>
      <div className="mb-4">
        {modules.map((module) => (
          <label key={module.id} className="inline-flex items-center mr-4 mb-2">
            <input
              type="checkbox"
              checked={!hiddenModules.includes(module.id)}
              onChange={() => toggleModuleVisibility(module.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">{module.id}</span>
          </label>
        ))}
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
        onDragStop={(layout) => onLayoutChange(layout, layouts)}
        onResizeStop={(layout) => onLayoutChange(layout, layouts)}
      >
        {modules.map((module) => (
          <div key={module.id} className={`bg-white rounded-lg shadow-lg overflow-hidden ${hiddenModules.includes(module.id) ? 'hidden' : ''}`}>
            <div className="p-4">
              {module.component}
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default ModularGrid;