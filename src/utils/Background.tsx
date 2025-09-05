'use client'
import React from 'react'
import { AnimatePresence, motion } from "motion/react";

export default function Background({ hoveredIndex, idx }: { hoveredIndex: number | null, idx: number }) {
    return (
        <AnimatePresence>
            {hoveredIndex === idx && (
                <motion.span
                    className="absolute inset-0 rounded-xl bg-primary z-0"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: [0.2, 0, 0.2, 1],
                    }}
                />
            )}
        </AnimatePresence>
    )
}
