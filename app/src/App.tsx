import { useState } from "react";
import { SurfaceLayer } from "@/surface/Surface";
import { ControlPanel } from "@/components/ControlPanel";
import { Intro } from "@/components/Intro";
import { useWakeLock } from "@/hooks/useWakeLock";
import { useFullscreen } from "@/hooks/useFullscreen";

export default function App() {
  useWakeLock();
  const fullscreen = useFullscreen();
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <SurfaceLayer />
      <ControlPanel fullscreen={fullscreen} />
      {!introDone && (
        <Intro
          onFullscreen={() => fullscreen.enter(fullscreen.canChooseMonitor)}
          onDone={() => setIntroDone(true)}
        />
      )}
    </>
  );
}
