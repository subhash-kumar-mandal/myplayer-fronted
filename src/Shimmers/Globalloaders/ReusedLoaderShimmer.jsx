import { motion } from "motion/react"
const ReusedLoaderShimmer = ({className=''}) => {
  return (
    <div className={`relative overflow-hidden  bg-[#232826] ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
        }}
      />
    </div>
  )
}

export default ReusedLoaderShimmer