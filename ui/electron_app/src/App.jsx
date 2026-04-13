import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Scene({ status }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      let scale = 1;

      if (status === "listening") {
        scale = 1 + Math.sin(t * 5) * 0.2;
      } else if (status === "responding") {
        scale = 1 + Math.sin(t * 3) * 0.1;
      }

      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="cyan" wireframe />
    </mesh>
  );
}

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
        .then((data) => setData(data));
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

    {/* 🔹 HUD TEXT */}
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

    {/* 🔹 3D CANVAS */}
    <Canvas style={{ height: "100vh" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Scene status={data.status} />
    </Canvas>

  </div>
  );
}

export default App;