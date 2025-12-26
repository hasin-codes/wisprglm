'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useUIStore } from '@/lib/store';

export function SettingsModal() {
  const { closeModal } = useUIStore();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={closeModal}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal content - Glassmorphism style */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative glass rounded-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-display font-semibold text-white">
              Settings
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="text-muted-foreground hover:text-white hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <ScrollArea className="max-h-[60vh]">
            <div className="p-6 space-y-6">
              {/* Audio Settings */}
              <section>
                <h3 className="text-sm font-medium text-white/90 mb-3">
                  Audio
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      Auto-detect silence
                    </span>
                    <div className="w-11 h-6 bg-white/10 rounded-full relative cursor-pointer hover:bg-white/15 transition-colors">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      Audio quality
                    </span>
                    <span className="text-sm text-white">High</span>
                  </div>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Transcription Settings */}
              <section>
                <h3 className="text-sm font-medium text-white/90 mb-3">
                  Transcription
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      Auto-refine text
                    </span>
                    <div className="w-11 h-6 bg-white/10 rounded-full relative cursor-pointer hover:bg-white/15 transition-colors">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      Language
                    </span>
                    <span className="text-sm text-white">Auto-detect</span>
                  </div>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Appearance */}
              <section>
                <h3 className="text-sm font-medium text-white/90 mb-3">
                  Appearance
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <span className="text-sm text-white">Dark</span>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
