import { useEffect, useRef, useState } from "react";

/**
 * CanvasPlayground
 *
 * Un ejemplo mínimo con un cuadrado que se puede arrastrar.
 * Sirve como playground para entender el patrón sin lógica adicional.
 */
function CanvasPlayground() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const pointerStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    setIsDragging(true);
    pointerStart.current = { x: clientX, y: clientY };
    dragStart.current = position;
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;
      const dx = clientX - pointerStart.current.x;
      const dy = clientY - pointerStart.current.y;
      setPosition({
        x: dragStart.current.x + dx,
        y: dragStart.current.y + dy,
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-slate-100">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm">
          Arrastra el cuadrado. Observa cómo se actualiza el estado básico.
        </p>
        <div
          className={`relative h-48 w-48 rounded-xl border border-slate-500 bg-slate-800 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div
            role="presentation"
            onPointerDown={handlePointerDown}
            className="absolute h-16 w-16 rounded-lg bg-amber-400 shadow-lg transition-colors hover:bg-amber-300"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          />
        </div>
        <code className="rounded bg-slate-800 px-3 py-1 text-xs">
          {JSON.stringify(position)}
        </code>
      </div>
    </div>
  );
}

export default CanvasPlayground;
