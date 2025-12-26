'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeaderBar } from '@/components/header-bar';
import { IconRail } from '@/components/icon-rail';
import { TranscriptionGrid } from '@/components/transcription-grid';
import { VoiceRecorder } from '@/components/voice-recorder';
import { ModalManager } from '@/components/modal-manager';
import { useTranscriptionsStore } from '@/lib/store';
import { useStore } from 'zustand';

const demoTranscriptions = [
  {
    id: 'demo-1',
    filename: 'Voice Note 09:30 AM',
    text: 'The key insight from the meeting was that we need to focus on user retention rather than just acquisition. The data shows our churn rate is higher than industry average, especially in the first thirty days. We should implement a comprehensive onboarding flow with tooltips, progressive disclosure, and proactive check-ins.',
    timestamp: '2024-12-27T09:30:00.000Z',
    date: 'Dec',
    month: 'December',
    day: 27,
  },
  {
    id: 'demo-2',
    filename: 'Voice Note 02:15 PM',
    text: 'Quick idea for the new feature: what if we added a voice command interface for power users? They could record shortcuts, create custom voice triggers for common actions, and maybe even chain commands together. It would differentiate us from competitors.',
    timestamp: '2024-12-26T14:15:00.000Z',
    date: 'Dec',
    month: 'December',
    day: 26,
  },
  {
    id: 'demo-3',
    filename: 'Voice Note 11:45 AM',
    text: 'Need to schedule time with the design team to review the new dashboard mockups. The color palette looks good but the information density might overwhelm new users. Consider progressive disclosure of advanced metrics.',
    timestamp: '2024-12-25T11:45:00.000Z',
    date: 'Dec',
    month: 'December',
    day: 25,
  },
  {
    id: 'demo-4',
    filename: 'Voice Note 04:20 PM',
    text: 'Customer feedback from the beta test has been overwhelmingly positive. Users love the simplicity and the dark mode implementation. The main request is for cloud sync across devices, which aligns with our roadmap for Q2.',
    timestamp: '2024-12-24T16:20:00.000Z',
    date: 'Dec',
    month: 'December',
    day: 24,
  },
];

export default function Home() {
  const { transcriptions, addTranscription } = useTranscriptionsStore();
  const hasInitialized = useRef(false);
  const hasHydrated = useStore(useTranscriptionsStore, (state) =>
    // @ts-expect-error - zustand persist middleware adds this
    state.__persist?.hasHydrated ?? true
  );

  useEffect(() => {
    // Add demo transcriptions only after zustand has hydrated from localStorage
    // and only if we haven't initialized yet
    if (!hasInitialized.current && hasHydrated) {
      hasInitialized.current = true;
      const existingIds = new Set(transcriptions.map((t) => t.id));
      demoTranscriptions.forEach((t) => {
        if (!existingIds.has(t.id)) {
          addTranscription(t);
        }
      });
    }
  }, [hasHydrated, transcriptions, addTranscription]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderBar />
      <IconRail />
      <ModalManager />
      <VoiceRecorder />

      <main className="flex-1 pt-8 pb-32 px-4 max-w-screen-2xl mx-auto w-full">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center pl-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
            Your Transcriptions
          </h1>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Click the record button to capture your voice. Your ideas will be
            transcribed and saved automatically.
          </p>
        </motion.div>

        {/* Transcription grid */}
        <TranscriptionGrid />
      </main>
    </div>
  );
}
