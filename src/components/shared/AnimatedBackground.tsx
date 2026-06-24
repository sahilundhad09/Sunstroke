"use client";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large primary orb */}
      <div
        className="absolute -top-[300px] -left-[200px] h-[600px] w-[600px] rounded-full opacity-20 animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Secondary orb */}
      <div
        className="absolute -right-[150px] top-[30%] h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          animation: "float 8s ease-in-out 2s infinite",
        }}
      />

      {/* Violet accent orb */}
      <div
        className="absolute bottom-[10%] left-[20%] h-[400px] w-[400px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          animation: "float 10s ease-in-out 4s infinite",
        }}
      />

      {/* Small floating accent */}
      <div
        className="absolute top-[60%] right-[30%] h-[200px] w-[200px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
          animation: "float 7s ease-in-out 1s infinite",
        }}
      />

      {/* Circuit overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-30" />

      {/* Top gradient fade */}
      <div
        className="absolute inset-x-0 top-0 h-[200px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,16,0.8), transparent)",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[200px]"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,16,1), transparent)",
        }}
      />
    </div>
  );
}
