"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      {/* Breathing sage glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] rounded-full bg-sage/20 blur-[120px] pointer-events-none"
      />

      {/* Hero text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-4xl"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white text-balance leading-[1.1]">
          Discover Your
          <br />
          <span className="font-light">True Center.</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-base sm:text-lg font-light text-white/50 max-w-md mx-auto text-pretty"
        >
          A mindful journaling experience designed for clarity, reflection, and personal growth.
        </motion.p>
      </motion.div>

      {/* iPhone mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-16 md:mt-20"
      >
        <div className="relative w-[280px] sm:w-[320px] md:w-[360px] aspect-[9/19] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50">
          {/* Phone frame */}
          <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-8 rounded-full bg-black z-30" />
          
          {/* Screen content - placeholder */}
          <div className="w-full h-full bg-gradient-to-b from-[#0a0a0f] to-[#08080C] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sage/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <p className="text-white/30 text-sm font-light">Your journal awaits</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
