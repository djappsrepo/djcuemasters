export const MusicWave = () => {
  return (
    <div className="flex items-end gap-1 h-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-gradient-primary rounded-full opacity-70 animate-pulse`}
          style={{
            height: `${Math.random() * 100 + 20}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.8 + Math.random() * 0.4}s`
          }}
        />
      ))}
    </div>
  );
};