import React, { useEffect, useRef, useState } from "react";
//import { useCanvas } from "../../hooks/useCanvas";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

interface coordinatesTypes {
  x: number;
  y: number;
}

/* const drawChart = (context:CanvasRenderingContext2D) => {
  context.lineWidth = 1;
  // for every array in the ry array
  for (let index = 0; index < ry.length; index++) {
    // for every point in the ry[index]
    for (let i = 0; i < ry[index].length; i++) {
      let l = ry[index][i];
      // draw the circle
      drawCircle(l.x, l.y);
      // draw the line
      if (i > 0) {
        let last = ry[index][i - 1];
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(l.x, l.y);
        ctx.strokeStyle = "blue";
        ctx.stroke();
      }
    }
  }
}; */

const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  /*const [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight] =
    useCanvas();*/
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [coordinates, setCoordinates] = useState<coordinatesTypes[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasClick = (event: any) => {
    // on each click get current mouse location
    const currentCoord = { x: event.clientX, y: event.clientY };
    // add the newest mouse location to an array in state
    //setCoordinates([...coordinates, currentCoord]);
    if (!canvasRef.current) return;
    var offset = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - offset.left;
    const y = event.clientY - offset.top;
    console.log("state refresh", coordinates);
    setCoordinates((coordinates) => [...coordinates, { x: x, y: y }]);

    console.log("coordinates", coordinates, { x: x, y: y });
    // delete everything

    console.log(currentCoord);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    //const dpi = window.devicePixelRatio;
    const context = canvas.getContext("2d");
    if (!context) return;
    setContext(context);
    //context.scale(dpi, dpi);
    //context.canvas.width = pgRef.current?.offsetWidth || 1000;
    //context.canvas.height = pgRef.current?.offsetHeight || 800;
    //context.fillStyle = "brown";
    //context.fillRect(0, 0, 100, 100);
    console.log("loaded");
  }, [props.width]);

  useEffect(() => {
    if (!context) return;
    context?.clearRect(0, 0, 689, 537);

    context.lineWidth = 1;
    // for every array in the ry array
    for (let index = 0; index < coordinates.length; index++) {
      let l = coordinates[index];
      // draw the circle
      //drawCircle(l.x, l.y);
      // draw the line
      if (index > 0) {
        let last = coordinates[index - 1];
        let present = coordinates[index];
        // /console.log("click", last.x, last.y);
        context.beginPath();
        context.moveTo(last.x, last.y);
        context.lineTo(present.x, present.y);
        context.strokeStyle = "brown";
        context.stroke();
      }
    }
  }, [coordinates]);

  return (
    <canvas
      className="canvas-pg"
      width={props.width}
      height={props.height}
      ref={canvasRef}
      onClick={handleCanvasClick}
    />
  );
};

export default Canvas;
