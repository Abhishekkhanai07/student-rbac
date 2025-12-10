export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      
      {/* === BASE GRADIENT === */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#eef2ff] via-[#f0f9ff] to-[#faf5ff] animate-gradientslow" />

      {/* === FLOATING BLOB 1 === */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-purple-400 opacity-30 blur-[160px] rounded-full animate-blob1" />

      {/* === FLOATING BLOB 2 === */}
      <div className="absolute top-[50%] left-[60%] w-[500px] h-[500px] bg-blue-400 opacity-25 blur-[180px] rounded-full animate-blob2" />

      {/* === FLOATING BLOB 3 === */}
      <div className="absolute top-[70%] left-[30%] w-[350px] h-[350px] bg-pink-400 opacity-20 blur-[150px] rounded-full animate-blob3" />

      {/* === SOFT GLOW RING === */}
      <div className="absolute top-[40%] left-[50%] w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 border-[2px] border-white/40 rounded-full blur-[120px] opacity-30 animate-pulse" />

      {/* === FLOATING PARTICLES === */}
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 bg-white/60 rounded-full animate-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        ></span>
      ))}

    </div>
  );
}
