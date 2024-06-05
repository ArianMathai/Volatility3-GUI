import React, { useState } from 'react';
import { Tree } from 'react-d3-tree';
import * as d3 from 'd3'; // Import d3 library

const MyCustomLabelComponent = ({ nodeData }) => (
  <div className="custom-node">
    {nodeData.name}
  </div>
);

const MyTreeComponent = ({ processTree }) => {
  const [treeData, setTreeData] = useState(processTree);

// const renderNodeWithCustomEvents = ({ nodeDatum }) => {
//   // Split the data into lines
//   const lines = [
//     `ImageFileName: ${nodeDatum.name}`,
//     `PID: ${nodeDatum?.PID}`,
//     `Handles: ${nodeDatum?.Handles}`,
//     `ExitTime: ${nodeDatum?.ExitTime}`
//   ];
//
//   // Calculate the height of the text
//   const lineHeight = 20; // Adjust this value according to your font size
//   const textHeight = lines.length * lineHeight;
//
//   // Calculate the width and height of the rectangle
//   const rectWidth = 200; // Adjust this value as needed
//   const rectHeight = textHeight + 20; // Add some padding
//
//   return (
//     <g>
//       {/* Render a rectangle for the node */}
//       <rect x={-rectWidth / 2} y={-rectHeight / 2} width={rectWidth} height={rectHeight} fill="lightgray" stroke="black" strokeWidth="1" />
//       {/* Render text inside the rectangle */}
//       <text fill="black" textAnchor="middle">
//         {lines.map((line, index) => (
//           <tspan key={index} x="0" dy={index === 0 ? "0" : `${lineHeight}px`}>{line}</tspan>
//         ))}
//       </text>
//     </g>
//   );
// };

const renderNodeWithCustomEvents = ({
  nodeDatum,
  toggleNode,
  handleNodeClick
}) => {
  const lineHeight = 20; // Adjust according to your font size
  const padding = 10; // Adjust padding as needed

  // Calculate the width and height of the text content
  const lines = [
    nodeDatum.name,
    nodeDatum.PID && `PID: ${ nodeDatum.PID || ''}`,
    nodeDatum.PPID && `PPID: ${nodeDatum.PPID || ''}`,
    nodeDatum.Handles && `Handles: ${nodeDatum.Handles || ''}`,
    nodeDatum.ExitTime && `ExitTime: ${nodeDatum.ExitTime || ''}`,
  ];
  const textHeight = lines.length * lineHeight;

  // Calculate the width and height of the rectangle
  const rectWidth = 200; // Adjust width as needed
  const rectHeight = textHeight + padding * 2; // Add padding

  return (
    <g>
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
      <foreignObject x={-rectWidth / 2 + padding} y={-rectHeight / 2 + padding} width={rectWidth - padding * 2} height={rectHeight - padding * 2}>
        <div style={{ width: '100%', height: '100%', textAlign: 'center', lineHeight: `${lineHeight}px` }}>
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
