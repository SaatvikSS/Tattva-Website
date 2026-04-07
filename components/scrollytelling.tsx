"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const tabs = [
  {
    id: "moment",
    title: "Moment",
    subtitle: "Capture fleeting thoughts",
    description: "Transform passing moments into lasting insights. Every thought deserves a place to belong.",
    // Add your mockup image path here, e.g.: image: "/mockups/moment.png"
    image: null as string | null,
  },
  {
    id: "discover",
    title: "Discover",
    subtitle: "Uncover patterns within",
    description: "Your journal reveals patterns you never knew existed. See the threads that connect your days.",
    // Add your mockup image path here, e.g.: image: "/mockups/discover.png"
    image: null as string | null,
  },
  {
    id: "companion",
    title: "Companion",
    subtitle: "Your mindful guide",
    description: "An AI companion that listens without judgment and helps you explore the depths of your thoughts.",
    // Add your mockup image path here, e.g.: image: "/mockups/companion.png"
    image: null as string | null,
  },
]

export function Scrollytelling() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Use refs for synchronous access in wheel handler
  const isLockedRef = useRef(false)
  const activeIndexRef = useRef(0)
  const accumulatedDelta = useRef(0)
  const isTransitioning = useRef(false)
  const scrollThreshold = 150 // Higher threshold for more deliberate scrolling

  // Keep ref in sync with state
  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect()
      
      // Section is "in view" when its top is near the viewport top
      const sectionAtTop = rect.top <= 10 && rect.bottom > window.innerHeight * 0.5
      
      // Scrolling down into section - lock it
      if (!isLockedRef.current && sectionAtTop && e.deltaY > 0 && activeIndexRef.current === 0) {
        isLockedRef.current = true
        accumulatedDelta.current = 0
        e.preventDefault()
        e.stopPropagation()
        return
      }
      
      // Scrolling up into section from below - lock it
      if (!isLockedRef.current && rect.top < 0 && rect.bottom >= window.innerHeight * 0.9 && e.deltaY < 0 && activeIndexRef.current === tabs.length - 1) {
        isLockedRef.current = true
        accumulatedDelta.current = 0
        e.preventDefault()
        e.stopPropagation()
        return
      }

      // When locked, handle tab navigation
      if (isLockedRef.current) {
        e.preventDefault()
        e.stopPropagation()
        
        // Don't accumulate while transitioning
        if (isTransitioning.current) return
        
        accumulatedDelta.current += e.deltaY

        if (Math.abs(accumulatedDelta.current) >= scrollThreshold) {
          const direction = accumulatedDelta.current > 0 ? 1 : -1
          accumulatedDelta.current = 0
          
          const currentIndex = activeIndexRef.current
          const newIndex = currentIndex + direction

          // Check boundaries
          if (newIndex >= tabs.length) {
            // Unlock and let page scroll down
            isLockedRef.current = false
            return
          }

          if (newIndex < 0) {
            // Unlock and let page scroll up
            isLockedRef.current = false
            return
          }

          // Valid tab change
          isTransitioning.current = true
          activeIndexRef.current = newIndex
          setActiveIndex(newIndex)
          
          // Prevent rapid tab changes
          setTimeout(() => {
            isTransitioning.current = false
          }, 400)
        }
      }
    }

    // Must use capture AND prevent default properly
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true })
    return () => window.removeEventListener("wheel", handleWheel, { capture: true })
  }, [])

  // Touch support
  const touchStartY = useRef(0)
  const lastTouchTime = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const rect = section.getBoundingClientRect()
      const currentY = e.touches[0].clientY
      const deltaY = touchStartY.current - currentY
      
      const sectionAtTop = rect.top <= 10 && rect.bottom > window.innerHeight * 0.5

      // Lock on swipe up into section
      if (!isLockedRef.current && sectionAtTop && deltaY > 30 && activeIndexRef.current === 0) {
        isLockedRef.current = true
        e.preventDefault()
        return
      }
      
      // Lock on swipe down from below
      if (!isLockedRef.current && rect.top < 0 && rect.bottom >= window.innerHeight * 0.9 && deltaY < -30 && activeIndexRef.current === tabs.length - 1) {
        isLockedRef.current = true
        e.preventDefault()
        return
      }

      if (isLockedRef.current) {
        e.preventDefault()
        
        const now = Date.now()
        if (now - lastTouchTime.current < 400) return
        
        if (Math.abs(deltaY) >= 50) {
          const direction = deltaY > 0 ? 1 : -1
          touchStartY.current = currentY
          
          const currentIndex = activeIndexRef.current
          const newIndex = currentIndex + direction

          if (newIndex >= tabs.length) {
            isLockedRef.current = false
            return
          }

          if (newIndex < 0) {
            isLockedRef.current = false
            return
          }

          lastTouchTime.current = now
          activeIndexRef.current = newIndex
          setActiveIndex(newIndex)
        }
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const activeTab = tabs[activeIndex]

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#08080C] h-screen"
    >
      <div className="h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[500px] h-[500px] rounded-full bg-sage/10 blur-[100px]" />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 px-6 w-full max-w-7xl">
          {/* Text content - changes with scroll */}
          <div className="relative w-full lg:w-1/2 h-[200px] lg:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-center text-center lg:text-left"
              >
                <span className="text-sage text-sm font-medium tracking-widest uppercase mb-3">
                  {`0${activeIndex + 1}`}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-white mb-4 text-balance">
                  {activeTab.title}
                </h2>
                <p className="text-lg sm:text-xl font-light text-white/60 mb-3">
                  {activeTab.subtitle}
                </p>
                <p className="text-sm sm:text-base font-light text-white/40 max-w-md mx-auto lg:mx-0 text-pretty">
                  {activeTab.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phone mockup */}
          <div className="relative w-[260px] sm:w-[280px] lg:w-[300px]">
            <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50">
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20" />

              {/* Dynamic island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 rounded-full bg-black z-30" />

              {/* Tab indicator bar */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                {tabs.map((tab, index) => (
                  <span
                    key={tab.id}
                    className={`text-[10px] sm:text-xs font-medium px-2 py-1 transition-all duration-300 ${
                      index === activeIndex 
                        ? "text-white opacity-100 scale-100" 
                        : "text-white opacity-40 scale-95"
                    }`}
                  >
                    {tab.title}
                  </span>
                ))}
              </div>

                {/* Screen content */}
              <div className="relative w-full h-full bg-gradient-to-b from-[#0a0a0f] to-[#08080C]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    {activeTab.image ? (
                      // Actual mockup image when provided
                      <img
                        src={activeTab.image}
                        alt={`${activeTab.title} screen`}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      // Placeholder UI when no image
                      <div className="w-full h-full flex flex-col items-center justify-center p-8">
                        <div className="w-20 h-20 rounded-3xl bg-sage/10 flex items-center justify-center mb-4 border border-sage/20">
                          <TabIcon id={activeTab.id} />
                        </div>
                        <p className="text-white/30 text-sm font-light text-center mb-2">
                          {activeTab.title}
                        </p>
                        <p className="text-white/15 text-xs font-light text-center">
                          Add mockup image
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {tabs.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-sage w-6" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-white/30 text-xs font-light mb-2">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
              <motion.div className="w-1 h-1.5 rounded-full bg-white/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TabIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    moment: (
      <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
    discover: (
      <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
    companion: (
      <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    ),
  }

  return icons[id] || null
}
