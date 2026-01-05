import * as React from "react";

export function Dots() {
    const [dots, setDots] = React.useState<Array<{ id: number; x: number; y: number; opacity: number; fadingOut: boolean }>>([]);
  
    React.useEffect(() => {
      const createDot = () => {
        const id = Date.now() + Math.random();
        const x = 20 + Math.random() * 60; // Random x position (0-100%)
        const y = 20 + Math.random() * 60; // Random y position (0-100%)
        const opacity = 0.1 + Math.random() * 0.2; // Random opacity between 0.1 and 0.3
        
        setDots(prev => [...prev, { id, x, y, opacity, fadingOut: false }]);
  
        // Start fade-out after random time (1-4 seconds)
        const duration = 1000 + Math.random() * 10000;
        setTimeout(() => {
          // Start fade-out animation
          setDots(prev => prev.map(dot => 
            dot.id === id ? { ...dot, fadingOut: true } : dot
          ));
          
          // Remove dot after fade-out completes (1 second)
          setTimeout(() => {
            setDots(prev => prev.filter(dot => dot.id !== id));
          }, 1000);
        }, duration);
      };
  
      // Create initial dots
      const initialDots = 20;
      for (let i = 0; i < initialDots; i++) {
        setTimeout(() => createDot(), i * 20000);
      }
  
      // Continuously create new dots
      const interval = setInterval(() => {
        createDot();
      }, 500); // Create a new dot every 500ms
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {dots.map(dot => (
          <Dot
            key={dot.id}
            x={dot.x}
            y={dot.y}
            opacity={dot.opacity}
            fadingOut={dot.fadingOut}
          />
        ))}
      </div>
    );
  }
  
  function Dot({ x, y, opacity, fadingOut }: { x: number, y: number, opacity: number, fadingOut: boolean }) {
    const [isVisible, setIsVisible] = React.useState(false);
  
    React.useEffect(() => {
      // Trigger fade-in after component mounts
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div 
        className="absolute rounded-full bg-[#3a3a3a] transition-opacity duration-1000" 
        style={{ 
          left: `${x}%`, 
          top: `${y}%`, 
          width: '14px', 
          height: '14px', 
          opacity: fadingOut ? 0 : (isVisible ? opacity : 0)
        }} 
      />
    )
  }