import { useEffect, useMemo, useRef, useState } from "react";
import SEO from "../components/SEO";
import dottedPattern from "../assets/background/dotted-bg.svg?raw";
import Sidebar from "../components/Sidebar";
import ToolsMenu from "../components/ToolsMenu";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import Canvas from "../components/Canvas";
import ZebraLabel from "../components/ZebraLabel";
import { useModeCanvas } from "../context/ModeCanvas";
import { useLocation, useNavigate } from "react-router-dom";

function CanvasEditor() {
  const { user, isAuthReady } = useUser();
  const [customName, setCustomName] = useState("");
  const { modeCanvasActive } = useModeCanvas();
  const location = useLocation();
  const navigate = useNavigate();

  const PATTERN_SIZE = 200;
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [shapePos, setShapePos] = useState({ x: 0, y: 0 });
  const [isPanningBackground, setIsPanningBackground] = useState(false);
  const [isDraggingShape, setIsDraggingShape] = useState(false);

  const panPointerRef = useRef({ x: 0, y: 0 });
  const shapeDragRef = useRef({
    pointer: { x: 0, y: 0 },
    shape: { x: 0, y: 0 },
  });
  /*useEffect(() => {
    if (location.pathname === "/" && !user) {
      navigate("/login");
    }
  }, [location, navigate, user]);*/

  useEffect(() => {
    if (!isAuthReady) return; // todavía no sabemos si hay usuario
    if (!user) navigate("/login");
  }, [isAuthReady, user, navigate]);

  const patternUrl = useMemo(() => {
    const svg = dottedPattern.replace(/currentColor/g, "#fff5");
    const encoded = encodeURIComponent(svg)
      .replace(/%0A/g, "")
      .replace(/%20/g, " ");
    return `url("data:image/svg+xml,${encoded}")`;
  }, []);

  const handleBackgroundPointerDown = (event) => {
    if (isDraggingShape) return;
    event.preventDefault();
    panPointerRef.current = { x: event.clientX, y: event.clientY };
    setIsPanningBackground(true);
  };

  const handleShapePointerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = event;
    shapeDragRef.current = {
      pointer: { x: clientX, y: clientY },
      shape: { ...shapePos },
    };
    setIsDraggingShape(true);
  };

  useEffect(() => {
    if (!isPanningBackground && !isDraggingShape) return;

    const getPoint = (event) => {
      if ("touches" in event) {
        const touch = event.touches[0];
        if (!touch) return null;
        return { x: touch.clientX, y: touch.clientY };
      }
      return { x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event) => {
      const point = getPoint(event);
      if (!point) return;
      event.preventDefault();

      if (isDraggingShape) {
        const { pointer, shape } = shapeDragRef.current;
        setShapePos({
          x: shape.x + (point.x - pointer.x),
          y: shape.y + (point.y - pointer.y),
        });
      } else if (isPanningBackground) {
        const { x, y } = panPointerRef.current;
        setOffset((prev) => ({
          x: prev.x + (point.x - x),
          y: prev.y + (point.y - y),
        }));
        panPointerRef.current = { x: point.x, y: point.y };
      }
    };

    const stopInteraction = () => {
      setIsDraggingShape(false);
      setIsPanningBackground(false);
    };

    const listenerOptions = { passive: false };

    window.addEventListener("pointermove", handlePointerMove, listenerOptions);
    window.addEventListener("pointerup", stopInteraction);
    window.addEventListener("pointercancel", stopInteraction);

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
        listenerOptions
      );
      window.removeEventListener("pointerup", stopInteraction);
      window.removeEventListener("pointercancel", stopInteraction);
    };
  }, [isPanningBackground, isDraggingShape]);

  return (
    <>
      <SEO
        title="JeviQR | Dashboard and analytics for your QR codes"
        description="Manage your QR codes, monitor real-time metrics, and control campaigns inside the JeviQR dashboard."
        url="https://jeviqr.com/dashboard"
      />
      <div
        className={`relative h-screen w-screen overflow-hidden ${
          isPanningBackground ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          backgroundImage: patternUrl,
          backgroundRepeat: "repeat",
          backgroundSize: `${PATTERN_SIZE}px ${PATTERN_SIZE}px`,
          backgroundPosition: `${offset.x}px ${offset.y}px`,
          backgroundColor: "var(--bg-color)",
          touchAction: "none",
        }}
        onPointerDown={handleBackgroundPointerDown}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="pointer-events-auto absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${
                offset.x + shapePos.x
              }px), calc(-50% + ${offset.y + shapePos.y}px))`,
            }}
            onPointerDown={handleShapePointerDown}
          >
            {modeCanvasActive === "canvasii" && (
              <Canvas customName={customName} />
            )}
          </div>
        </div>
        <div className={`flex  `}>
          <Sidebar user={user}></Sidebar>
          <div className="w-full h-full transition-all duration-900">
            <Header user={user}></Header>
            <div className="w-full h-full flex  items-center justify-center   "></div>
            <div onPointerDown={(e) => e.stopPropagation()}>
              <ToolsMenu
                customName={customName}
                setCustomName={setCustomName}
              ></ToolsMenu>
              <ZebraLabel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CanvasEditor;
