import React, { useState } from 'react';
import { Tree } from 'react-d3-tree';

const MyCustomLabelComponent = ({ nodeData }) => (
  <div className="custom-node">
    {nodeData.name}
  </div>
);

const MyTreeComponent = ({ processTree, onNodeClick }) => {
  const [treeData, setTreeData] = useState(processTree);

  const renderNodeWithCustomEvents = ({ nodeDatum }) => {
    const lineHeight = 20; // Adjust according to your font size
    const padding = 10; // Adjust padding as needed

    // Calculate the width and height of the text content
    const lines = [
      nodeDatum.name,
      nodeDatum.PID && `PID: ${nodeDatum.PID || ''}`,
      nodeDatum.PPID && `PPID: ${nodeDatum.PPID || ''}`,
      nodeDatum.Handles && `Handles: ${nodeDatum.Handles || ''}`,
      nodeDatum.ExitTime && `ExitTime: ${nodeDatum.ExitTime || ''}`,
    ];
    const textHeight = lines.length * lineHeight;

    // Calculate the width and height of the rectangle
    const rectWidth = 200; // Adjust width as needed
    const rectHeight = textHeight + padding * 2; // Add padding

    return (
      <g onClick={() => onNodeClick(nodeDatum)}>
        {/* Render a rectangle for the node */}
        <rect
          x={-rectWidth / 2}
          y={-rectHeight / 2}
          width={rectWidth}
          height={rectHeight}
          fill="lightgray"
          stroke="black"
          strokeWidth="1"
        />
        {/* Render text inside the rectangle using foreignObject for HTML content */}
        <foreignObject
          x={-rectWidth / 2 + padding}
          y={-rectHeight / 2 + padding}
          width={rectWidth - padding * 2}
          height={rectHeight - padding * 2}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              textAlign: 'center',
              lineHeight: `${lineHeight}px`,
            }}
          >
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Tree
        data={{
          name: 'All Trees',
          PID: '',
          PPID: '',
          Handles: '',
          ExitTime: '',
          children: processTree,
        }}
        separation={{ siblings: 3, nonSiblings: 3 }}
        translate={{ x: 300, y: 200 }}
        orientation="vertical"
        depthFactor={400}
        allowForeignObjects
        pathFunc="step"
        nodeLabelComponent={{
          render: <MyCustomLabelComponent />,
          foreignObjectWrapper: {
            y: -10,
            width: 150,
            x: -75,
            height: 20,
            style: {
              textAlign: 'center',
            },
          },
        }}
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps })
        }
      />
    </div>
  );
};

export default MyTreeComponent;

