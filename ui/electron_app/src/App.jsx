import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

/* =========================
   🔵 CORE SPHERE
========================= */
function Scene({ status }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      let scale = 1;
      let glow = 0.3;

      if (status === "listening") {
        scale = 1 + Math.sin(t * 5) * 0.25;
        glow = 1.5;
      } else if (status === "responding") {
        scale = 1 + Math.sin(t * 3) * 0.15;
        glow = 1.0;
      }

      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y += 0.01;

      if (meshRef.current.material) {
        meshRef.current.material.emissiveIntensity = glow;
      }
    }
  });

  return (
    <>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="cyan"
          emissive="cyan"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Outer shell */}
      <mesh scale={1.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="cyan"
          wireframe
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

/* =========================
   🟢 WAVE RING
========================= */
function WaveRing({ status }) {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ringRef.current) {
      let scale = 1.4;

      if (status === "listening") {
        scale = 1.4 + Math.sin(t * 6) * 0.15;
      } else if (status === "responding") {
        scale = 1.4 + Math.sin(t * 3) * 0.1;
      }

      ringRef.current.scale.set(scale, scale, scale);
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.5, 0.02, 16, 100]} />
      <meshBasicMaterial color="cyan" wireframe />
    </mesh>
  );
}

/* =========================
   🧠 MAIN APP
========================= */
function App() {
  const [data, setData] = useState({
    status: "",
    user_text: "",
    response: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8000/state")
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error(err));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100vh", background: "black" }}>

      {/* 🔹 ACTIVATE BUTTON */}
      <button
        onClick={() => {
          fetch("http://localhost:8000/activate", {
            method: "POST",
          });
        }}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "10px 20px",
          background: "cyan",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 10
        }}
      >
        Activate Jarvis
      </button>

      {/* 🔹 TOP LEFT HUD */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "cyan",
          fontFamily: "monospace",
          zIndex: 10
        }}
      >
        <h2>Status: {data.status}</h2>
        <p>User: {data.user_text}</p>
        <p>Jarvis: {data.response}</p>
      </div>

      {/* 🔹 LEFT PANEL */}
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 120,
          color: "cyan",
          fontFamily: "monospace",
          border: "1px solid cyan",
          boxShadow: "0 0 10px cyan",
          padding: "10px",
          width: "200px",
          zIndex: 10
        }}
      >
        <h3>System</h3>
        <p>Status: {data.status}</p>
        <p>Uptime: Active</p>
        <p>Mode: Voice AI</p>
      </div>

      {/* 🔹 RIGHT PANEL */}
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 120,
          color: "cyan",
          fontFamily: "monospace",
          border: "1px solid cyan",
          boxShadow: "0 0 10px cyan",
          padding: "10px",
          width: "250px",
          zIndex: 10
        }}
      >
        <h3>Logs</h3>
        <p>Last Input:</p>
        <p>{data.user_text}</p>
        <p>Response:</p>
        <p>{data.response}</p>
      </div>

      {/* 🔹 BOTTOM BAR */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          color: "cyan",
          fontFamily: "monospace",
          border: "1px solid cyan",
          boxShadow: "0 0 10px cyan",
          padding: "10px 20px",
          zIndex: 10
        }}
      >
        JARVIS ONLINE • VOICE ACTIVE • SYSTEM STABLE
      </div>

      {/* 🔹 3D CANVAS */}
      <Canvas style={{ height: "100vh" }}>
        <ambientLight />
        <pointLight position={[0, 0, 5]} intensity={2} color="cyan" />

        <Scene status={data.status} />
        <WaveRing status={data.status} />
      </Canvas>

    </div>
  );
}

export default App;