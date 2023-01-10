import React, { useEffect, useRef, useState, useContext } from "react";
//import { useCanvas } from "../../hooks/useCanvas";

import { eventToggleContext } from "./../../context/event-toggle.context";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

interface coordinatesTypes {
  x: number;
  y: number;
}

const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  /*const [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight] =
    useCanvas();*/
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [coordinates, setCoordinates] = useState<coordinatesTypes[]>([]);
  const [currentPosition, setCurrentPosition] = useState<coordinatesTypes[]>(
    []
  );

  const { wallEnabled } = useContext(eventToggleContext);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasMouseMove = (event: any) => {
    if (!canvasRef.current) return;
    if (!wallEnabled) return;
    var offset = canvasRef.current.getBoundingClientRect();

    setCurrentPosition([
      { x: event.clientX - offset.left, y: event.clientY - offset.top },
    ]);
  };

  const drawWalls = () => {
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
  };

  const handleCanvasClick = (event: any) => {
    if (!wallEnabled) return;
    // on each click get current mouse location
    const currentCoord = { x: event.clientX, y: event.clientY };
    // add the newest mouse location to an array in state
    //setCoordinates([...coordinates, currentCoord]);
    if (!canvasRef.current) return;
    var offset = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - offset.left;
    const y = event.clientY - offset.top;
    setCoordinates((coordinates) => [...coordinates, { x: x, y: y }]);
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
    drawWalls();
  }, [coordinates]);

  useEffect(() => {
    if (coordinates.length && currentPosition.length) {
      const lastPoint = coordinates[coordinates.length - 1];
      if (!context) return;
      context.clearRect(0, 0, 689, 537);
      drawWalls();
      context.beginPath();

      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(currentPosition[0].x, currentPosition[0].y);
      context.strokeStyle = "green";
      context.stroke();
    }
  }, [currentPosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    /* Remove the last wall when wall is disabled */

    if (!wallEnabled) setCurrentPosition([]);
    if (!context) return;
    context.clearRect(0, 0, 689, 537);
    drawWalls();

    /* if (wallEnabled)
      canvas.addEventListener("mousemove", handleCanvasMouseMove);
    else canvas.removeEventListener("mousemove", handleCanvasMouseMove);

    return () => {
      console.log("removeEventListener");
      canvas.removeEventListener("click", handleCanvasMouseMove);
    }; */
  }, [wallEnabled]);

  return (
    <canvas
      className="canvas-pg"
      width={props.width}
      height={props.height}
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseMove={(e) => handleCanvasMouseMove(e)}
    />
  );
};

export default Canvas;
