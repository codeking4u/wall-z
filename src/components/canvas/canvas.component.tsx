import React, { useEffect, useRef, useState, useContext } from "react";

import {
  CoordinatesContext,
  coordinatesTypes,
} from "./../../context/coordinates.context";
import { EventToggleContext } from "./../../context/event-toggle.context";
import { CanvasContext } from "./../../context/canvas.context";
import { UndoRedoContext } from "./../../context/undoredo.context";

import Image from "../../assets/Sample_Floorplan.jpg";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const [context, setContext] = useState<CanvasRenderingContext2D>();

  const {
    wallCoordinates,
    setWallCoordinates,
    currentPosition,
    setCurrentPosition,
    lastReference,
    setLastReference,
    highLight,
    setHighLight,
    selectedLine,
    setSelectedLine,
  } = useContext(CoordinatesContext);

  const { width, height } = useContext(CanvasContext);

  const { toolEnabled } = useContext(EventToggleContext);
  const { undoStack, setUndoStack, redoStack, setRedoStack } =
    useContext(UndoRedoContext);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasMouseMove = (event: any) => {
    if (!canvasRef.current) return;
    if (!toolEnabled || toolEnabled == "DELETE_WALL") return;

    var offset = canvasRef.current.getBoundingClientRect();

    setCurrentPosition([
      { x: event.clientX - offset.left, y: event.clientY - offset.top },
    ]);
  };

  const drawWallEndpoints = (
    start: coordinatesTypes,
    end: coordinatesTypes
  ) => {
    if (!context) return;
    context.rect(start.x - 3, start.y - 3, 6, 6);
    context.rect(end.x - 3, end.y - 3, 6, 6);
  };

  const drawWalls = () => {
    if (!context) return;
    context?.clearRect(0, 0, width, height);
    let selectionCount = 0;
    context.lineWidth = 7;
    const highLightVal = highLight[0];

    for (let structure = 0; structure <= wallCoordinates.length; structure++) {
      let wallBody = wallCoordinates[structure];

      if (wallBody?.length == 2) {
        let start = wallBody[0];
        let end = wallBody[1];

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);

        context.lineCap = "round";
        context.strokeStyle = "orange";

        if (
          highLightVal &&
          selectionCount == 0 &&
          context.isPointInStroke(highLightVal.x, highLightVal.y)
        ) {
          context.strokeStyle = "rgb(0 151 229)";
          setSelectedLine([
            { x: start.x, y: start.y },
            { x: end.x, y: end.y },
          ]);
          drawWallEndpoints(start, end);

          selectionCount += 1;
        }
        context.stroke();
      }
    }
  };

  const handleCanvasClick = (event: any) => {
    /* reset undoredo when new clicks are observed */

    if (!toolEnabled) return;
    if (!canvasRef.current) return;
    var offset = canvasRef.current.getBoundingClientRect();

    if (toolEnabled == "CREATE_WALL") {
      setUndoStack([]);
      setRedoStack([]);
      const x = event.clientX - offset.left;
      const y = event.clientY - offset.top;
      if (wallCoordinates.length) {
        /* wall already initiated */
        setWallCoordinates((cord) => {
          if (cord[cord.length - 1].length == 1) {
            if (lastReference.length) {
              /* if lastReference is present then continue drawing from last coordinate */
              return [
                ...cord.slice(0, -1),
                [...cord[cord.length - 1], { x: x, y: y }],
                [{ x: x, y: y }],
              ];
            } else {
              /* new structure */
              return [...cord, [{ x: x, y: y }]];
            }
          } else {
            return [...cord, [{ x: x, y: y }]];
          }
        });
      } else {
        /* new structure */
        setWallCoordinates([[{ x: x, y: y }]]);
      }

      setLastReference([{ x: x, y: y }]);
    }

    if (toolEnabled == "DELETE_WALL") {
      // adjust to proper mouse position
      const pointX = event.clientX - offset.left;
      const pointY = event.clientY - offset.top;
      setHighLight([{ x: pointX, y: pointY }]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    setContext(context);
  }, [width]);

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
    }

    drawWalls();
  }, [toolEnabled, highLight, lastReference]);

  useEffect(() => {
    const deleteLine = (e: any) => {
      if (["8", "46", "Backspace", "Delete"].includes(e.code)) {
        if (!selectedLine.length) return;

        /* del and backspace */
        const updatedCoordinates: coordinatesTypes[][] = [];

        wallCoordinates.forEach((wall) => {
          if (wall.length != 2) return;
          if (
            wall[0].x != selectedLine[0].x ||
            wall[0].y != selectedLine[0].y ||
            wall[1].x != selectedLine[1].x ||
            wall[1].y != selectedLine[1].y
          ) {
            updatedCoordinates.push(wall);
          }
        });

        setWallCoordinates([...updatedCoordinates]);

        setHighLight([]);
        setUndoStack((coords) => [...coords, selectedLine]);
      }

      if (["27", "Escape"].includes(e.code)) {
        setCurrentPosition([]);
        setLastReference([]);
        setWallCoordinates((cords) => cords.filter((wall) => wall.length == 2));
      }

      if (e.key === "y" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        /* REDO */
        if (redoStack.length) {
          const latestWall = redoStack[redoStack.length - 1];
          setRedoStack((coords) => [...coords.slice(0, -1)]);
          latestWall && setWallCoordinates((coords) => [...coords, latestWall]);
        }
      }

      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        /* UNDO */
        if (undoStack.length) {
          const lastWall = undoStack[undoStack.length - 1];
          setWallCoordinates((coords) => [...coords, lastWall]);
          setRedoStack((coords) => [
            ...coords,
            undoStack[undoStack.length - 1],
          ]);
          setUndoStack((coords) => [...coords.slice(0, -1)]);
        } else {
          wallCoordinates.length &&
            setRedoStack((coords) => [
              ...coords,
              wallCoordinates[wallCoordinates.length - 1],
            ]);

          setWallCoordinates((coords) => [...coords.slice(0, -1)]);
        }
      }
    };
    window.addEventListener("keydown", deleteLine);

    return () => window.removeEventListener("keydown", deleteLine);
  }, [selectedLine, undoStack, redoStack, wallCoordinates]);

  return (
    <canvas
      className={"canvas-pg " + toolEnabled?.toLowerCase()}
      width={width}
      height={height}
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseMove={(e) => handleCanvasMouseMove(e)}
      style={{
        backgroundImage: "url(" + Image + ")",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );
};

export default Canvas;
