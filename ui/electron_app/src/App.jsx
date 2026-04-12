import { Canvas } from "@react-three/fiber";

function Scene() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}

function App() {
  return (
    <div style={{ height: "100vh", background: "black" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;