'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/lib/store';

export function NotificationsModal() {
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

        {/* Modal content - Refined dark surface */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-card border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg">
                <Bell className="h-5 w-5 text-white/90" />
              </div>
              <h2 className="text-xl font-display font-semibold text-white">
                Notifications
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="text-muted-foreground hover:text-white hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Empty state */}
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-white font-medium mb-2">All caught up</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              You have no new notifications. We&apos;ll let you know when something
              important happens.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
