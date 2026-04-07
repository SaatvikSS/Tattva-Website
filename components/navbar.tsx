"use client"

import { motion } from "framer-motion"

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="flex items-center gap-6 px-6 py-3 rounded-full backdrop-blur-xl bg-white/5 border border-white/10">
        <span className="text-sm font-medium tracking-tight text-white/90">
          Tattva
        </span>
        <a
          href="#download"
          className="px-4 py-1.5 text-xs font-medium tracking-wide rounded-full bg-sage/90 text-white/90 hover:bg-sage transition-colors duration-300"
        >
          Download
        </a>
      </div>
    </motion.nav>
  )
}
