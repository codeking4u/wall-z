import React, { useEffect, useRef, useState, useContext } from "react";

import { coordinatesContext } from "./../../context/coordinates.context";
import { eventToggleContext } from "./../../context/event-toggle.context";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  /*const [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight] =
    useCanvas();*/
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const {
    wallCoordinates,
    setWallCoordinates,
    currentPosition,
    setCurrentPosition,
    lastReference,
    setLastReference,
  } = useContext(coordinatesContext);

  const { toolEnabled } = useContext(eventToggleContext);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasMouseMove = (event: any) => {
    if (!canvasRef.current) return;
    if (!toolEnabled || toolEnabled == "DELETE_WALL") return;

    var offset = canvasRef.current.getBoundingClientRect();

    setCurrentPosition([
      { x: event.clientX - offset.left, y: event.clientY - offset.top },
    ]);
  };

  const drawWalls = () => {
    if (!context) return;
    context?.clearRect(0, 0, 689, 537);

    context.lineWidth = 5;
    // for every array in the ry array
    for (let structure = 0; structure <= wallCoordinates.length; structure++) {
      let wallBody = wallCoordinates[structure];
      // draw the circle
      //drawCircle(l.x, l.y);
      // draw the line
      for (let wall = 0; wall < wallBody?.length; wall++) {
        if (wall > 0) {
          let last = wallBody[wall - 1];
          let present = wallBody[wall];
          context.beginPath();
          context.moveTo(last.x, last.y);
          context.lineTo(present.x, present.y);
          context.strokeStyle = "brown";
          context.stroke();
        }
      }
    }
  };

  const handleCanvasClick = (event: any) => {
    if (!toolEnabled) return;
    if (toolEnabled == "CREATE_WALL") {
      if (!canvasRef.current) return;
      var offset = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - offset.left;
      const y = event.clientY - offset.top;
      if (lastReference.length) {
        /* add to last structure */
        setWallCoordinates((cord) => [
          ...cord.slice(0, -1),
          [...cord[cord.length - 1], { x: x, y: y }],
        ]);
      } else {
        /* new structure */
        setWallCoordinates((cord) => [...cord, [{ x: x, y: y }]]);
      }

      setLastReference([{ x: x, y: y }]);
      console.log(wallCoordinates);
    }
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
  }, [wallCoordinates]);

  useEffect(() => {
    if (
      wallCoordinates.length &&
      currentPosition.length &&
      lastReference.length
    ) {
      const lastPoint = lastReference[0];
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

    if (!toolEnabled || toolEnabled == "DELETE_WALL") {
      setCurrentPosition([]);
      setLastReference([]);
    }
    if (!context) return;
    context.clearRect(0, 0, 689, 537);
    drawWalls();
    console.log("useeffect", toolEnabled);
    /* if (toolEnabled)
      canvas.addEventListener("mousemove", handleCanvasMouseMove);
    else canvas.removeEventListener("mousemove", handleCanvasMouseMove);

    return () => {
      console.log("removeEventListener");
      canvas.removeEventListener("click", handleCanvasMouseMove);
    }; */
  }, [toolEnabled]);

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
