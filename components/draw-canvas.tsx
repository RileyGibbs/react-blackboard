import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Transformer } from "react-konva";

export default function DrawCanvas() {
  const [rects, setRects] = React.useState([]);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [rectSet, setRectSet] = React.useState(false);
  const [height, setHeight] = React.useState(50);
  const [width, setWidth] = React.useState(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rectSet) {
      setRects([
        ...rects, 
        { 
          startPointX: (window.innerWidth - 200) / 2 - width / 2,
          startPointY: (window.innerHeight - 200) / 2 - height / 2,
          height: height,
          width: width
        }
      ]);
      setRectSet(true);
    } 
    else {
      let curRec = rects[0];
      curRec.startPointX = (window.innerWidth - 200) / 2 - width / 2;
      curRec.startPointY = (window.innerHeight - 200) / 2 - height / 2;
      curRec.height = height;
      curRec.width = width;
      // replace last with current
      rects.splice(rects.length - 1, 1, curRec);
      setRects(rects.concat());
    }
  }

  const handleReset = () => {
    setHeight(50);
    setWidth(50);
    if (rectSet) {
      setRects([]);
    }
    setRectSet(false);
  }

  const handleMouseDown = (e) => {
    // Draw rect
    setIsDrawing(true);
    if (!rectSet) {
      const pos = e.target.getStage().getRelativePointerPosition();
      setRects([
        ...rects,
        { startPointX: pos.x, startPointY: pos.y, height: 0, width: 0 }
      ]);
    }
    // Resize rect
    else {
      let rect = rects[0];
      const point = e.target.getStage().getRelativePointerPosition();

      let recX = Math.min(rect.startPointX, rect.startPointX + rect.width)
      let recY = Math.min(rect.startPointY, rect.startPointY + rect.height)
      let recHeight = Math.abs(rect.height);
      let recWidth = Math.abs(rect.width);


      // Set which of different resizes (horiz, vertical, corners) we're handling
      if ((point.x > recX - 2 && point.x < recX + 2
            && point.y > recY + 2 && point.y < recY + recHeight ) ){
        // TODO: Change cursor to correct resize
      }
      else if ((point.x > recX + 2 && point.x < recX + recWidth
            && point.y > recY - 2 && point.y < recY + 2 ) ){
        // TODO: Change cursor to correct resize
      }
      else if ((point.x > recX + recWidth - 2 && point.x < recX + recWidth + 2
            && point.y > recY + 2 && point.y < recY + recHeight ) ){
        // TODO: Change cursor to correct resize
      }
      else if ((point.x > recX + 2 && point.x < recX + recWidth + 2
            && point.y > recY + recHeight - 2 && point.y < recY + recHeight + 2 ) ){
        // TODO: Change cursor to correct resize
      }
    }
  };

  const handleMouseMove = (e) => {
    // Not drawing -> ignore
    if (!isDrawing && !rectSet) {
      return;
    }
    // Drawing rectangle w/ pointer
    else if (!rectSet) {
      const stage = e.target.getStage();
      const point = stage.getRelativePointerPosition();

      // Get rectangle
      let curRec = rects[0];

      curRec.height = point.y - curRec.startPointY;
      curRec.width = point.x - curRec.startPointX;

      // replace last with current
      rects.splice(rects.length - 1, 1, curRec);
      setRects(rects.concat());

      setHeight(curRec.height);
      setWidth(curRec.width);
    }
    // Handle Resizing
    else if (isDrawing) {
      // TODO: Handle actual resizing
    }
    // Handle resizing cursor changes
    else {
      let rect = rects[0];
      const point = e.target.getStage().getRelativePointerPosition();

      let recX = Math.min(rect.startPointX, rect.startPointX + rect.width)
      let recY = Math.min(rect.startPointY, rect.startPointY + rect.height)
      let recHeight = Math.abs(rect.height);
      let recWidth = Math.abs(rect.width);

      if ((point.x > recX - 2 && point.x < recX + 2
            && point.y > recY + 2 && point.y < recY + recHeight ) ){
        // TODO: Change cursor to correct resize
      }
      else if ((point.x > recX + 2 && point.x < recX + recWidth
            && point.y > recY - 2 && point.y < recY + 2 ) ){
        // TODO: Change cursor to correct resize
      }
      else if ((point.x > recX + recWidth - 2 && point.x < recX + recWidth + 2
            && point.y > recY + 2 && point.y < recY + recHeight ) ){
        // TODO: Change cursor to correct resize
      }
      else if ((point.x > recX + 2 && point.x < recX + recWidth + 2
            && point.y > recY + recHeight - 2 && point.y < recY + recHeight + 2 ) ){
        // TODO: Change cursor to correct resize
      }
    }
    
  };

  const handleMouseUp = () => {
    if (isDrawing && !rectSet) {
      setRectSet(true);
    }
    setIsDrawing(false);
  };

  return (
    <>
    <div id="draw-inputs">
      <form onSubmit={handleSubmit}>
        <label>
          Height:
          <input type="number" value={height} onChange={(e) => setHeight(Math.abs(parseInt(e.target.value)))}/>
        </label>
        <label>
          Width:
          <input type="number" value={width} onChange={(e) => setWidth(Math.abs(parseInt(e.target.value)))}/>
        </label>
        <input id="submit" type="submit" value="Draw"/>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
    <div id='stage-container'>
      <Stage
        container={"stage-container"}
        x={0}
        y={0}
        width={window.innerWidth - 200}
        height={window.innerHeight - 200}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        // TODO: Change cursor on resize hover style={{ cursor: cursor }}
      >
        <Layer>
          {rects.map((rect, i) => (
            // Map drawn rectangle(s) to Rect components
            <Rect
              key={i}
              x={Math.min(rect.startPointX, rect.startPointX + rect.width)}
              y={Math.min(rect.startPointY, rect.startPointY + rect.height)}
              height={Math.abs(rect.height)}
              width={Math.abs(rect.width)}
              stroke="#FBF7F5"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
            />
          ))}
        </Layer>
      </Stage>
    </div>
    </>
  );
}

// render(<App />, document.getElementById("root"));
