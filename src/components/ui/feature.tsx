export const Grid = ({ size = 20 }: { size?: number }) => {
  return (
    <div
      className="absolute inset-0 z-10"
      style={{
        backgroundSize: `${size}px ${size}px`,
        backgroundImage: `
          linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px)
        `,
      }}
    />
  );
};
