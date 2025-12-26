'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogOut, LogIn } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/lib/store';
import { useState } from 'react';

export function ProfileModal() {
  const { closeModal } = useUIStore();
  const [isSignedIn] = useState(false);

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

        {/* Modal content - Clean dark with delicate borders */}
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
              <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white/90" />
              </div>
              <h2 className="text-xl font-display font-semibold text-white">
                Profile
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

          {/* Content */}
          <div className="p-6">
            {!isSignedIn ? (
              // Signed out state
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">
                  Not signed in
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                  Sign in to sync your transcriptions across devices and unlock
                  additional features.
                </p>
                <Button className="w-full bg-white text-black hover:bg-white/90">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            ) : (
              // Signed in state
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-white/10">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-medium text-lg mb-1">
                  Demo User
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  user@example.com
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 px-4 bg-white/5 rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      Transcriptions
                    </span>
                    <span className="text-sm text-white">12</span>
                  </div>
                  <div className="flex justify-between py-2 px-4 bg-white/5 rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      Storage
                    </span>
                    <span className="text-sm text-white">2.4 MB</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6 border-white/10 hover:bg-white/5 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
