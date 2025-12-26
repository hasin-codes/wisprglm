'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TranscriptionCard } from '@/components/transcription-card';
import { useTranscriptionsStore } from '@/lib/store';

export function TranscriptionGrid() {
  const { transcriptions } = useTranscriptionsStore();

  const columns = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1536) return 4; // 2xl
    if (width >= 1024) return 3; // lg
    if (width >= 768) return 2; // md
    return 1; // mobile
  }, []);

  if (transcriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-display font-semibold text-white mb-2">
          No transcriptions yet
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Start capturing your ideas by clicking the record button. Your voice
          notes will appear here.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={`grid gap-6 pl-20 pr-4`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      <AnimatePresence mode="popLayout">
        {transcriptions.map((transcription) => (
          <TranscriptionCard key={transcription.id} {...transcription} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
