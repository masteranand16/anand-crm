import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Sparks() {
  const [sparks, setSparks] = useState<{ id: number; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    // Generate random sparks
    const generatedSparks = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
      size: Math.random() * 4 + 2,
    }));
    setSparks(generatedSparks);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute bottom-0 bg-yellow-400 rounded-full shadow-[0_0_8px_2px_rgba(250,204,21,0.8)]"
          style={{ 
            left: spark.left,
            width: spark.size,
            height: spark.size,
          }}
          initial={{ y: "10vh", opacity: 0, x: 0 }}
          animate={{
            y: ["10vh", "-110vh"],
            x: [0, Math.random() * 100 - 50, Math.random() * -100 + 50],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 0.5, 0]
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
