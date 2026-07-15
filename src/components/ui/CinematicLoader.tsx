import { motion } from "framer-motion";

export default function CinematicLoader() {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Cinematic Letterbox Top */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-black z-20"
        initial={{ height: "15vh" }}
        animate={{ height: "0vh" }}
        transition={{ delay: 2.5, duration: 1, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Cinematic Letterbox Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black z-20"
        initial={{ height: "15vh" }}
        animate={{ height: "0vh" }}
        transition={{ delay: 2.5, duration: 1, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Deep Glow Background */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-30"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.5, opacity: [0, 0.5, 0.1] }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <div className="w-[50vw] h-[50vw] rounded-full bg-accent blur-[120px]" />
      </motion.div>

      {/* Center Geometric Logo */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.2, 1, 15], 
          rotate: [0, 0, 0, 90], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{ 
          duration: 3, 
          times: [0, 0.4, 0.7, 1], 
          ease: "easeInOut" 
        }}
      >
        <div className="w-24 h-24 border-[4px] border-secondary flex items-center justify-center shadow-[0_0_40px_rgba(249,225,35,0.6)]">
          <div className="w-12 h-12 bg-accent shadow-[0_0_20px_rgba(190,0,2,0.8)]" />
        </div>
      </motion.div>
      
      {/* Text Reveal */}
      <motion.div
        className="absolute z-10 bottom-[30%] text-white font-extrabold tracking-[0.5em] text-xs sm:text-sm uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [20, 0, -20] }}
        transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
      >
        Initializing CRM System
      </motion.div>
    </motion.div>
  );
}
