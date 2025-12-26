'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Trash2, Edit, Check } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUIStore, useTranscriptionsStore } from '@/lib/store';
import { toast } from 'sonner';

export function DetailModal() {
  const { closeModal, selectedTranscriptionId } = useUIStore();
  const { getTranscription, updateTranscription, deleteTranscription } =
    useTranscriptionsStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  const transcription = selectedTranscriptionId
    ? getTranscription(selectedTranscriptionId)
    : null;

  // Reset edited text when transcription changes or modal opens
  if (!isEditing && transcription && editedText !== transcription.text) {
    setEditedText(transcription.text);
  }

  if (!transcription) return null;

  const handleSave = () => {
    updateTranscription(transcription.id, editedText);
    setIsEditing(false);
    toast.success('Changes saved');
  };

  const handleCancel = () => {
    setEditedText(transcription.text);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcription.text);
    toast.success('Copied to clipboard');
  };

  const handleDelete = () => {
    deleteTranscription(transcription.id);
    closeModal();
    toast.success('Transcription deleted');
  };

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

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-card rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Gradient header strip matching card style */}
          <div className="h-2 gradient-header" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-display font-semibold text-white">
                {transcription.filename}
              </h2>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {new Date(transcription.timestamp).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="text-muted-foreground hover:text-white hover:bg-white/5"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="text-muted-foreground hover:text-white hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="max-h-[60vh]">
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="min-h-[300px] bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-white/20"
                    placeholder="Edit your transcription..."
                  />
                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="border-white/10 hover:bg-white/5"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="group relative">
                  <p className="text-secondary-foreground text-base leading-relaxed whitespace-pre-wrap">
                    {transcription.text}
                  </p>
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    variant="ghost"
                    className="mt-4 text-muted-foreground hover:text-white hover:bg-white/5"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
