'use client';

import { motion } from 'framer-motion';
import { Copy, Trash2, Edit } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranscriptionsStore, useUIStore } from '@/lib/store';
import { toast } from 'sonner';
import { useState } from 'react';

interface TranscriptionCardProps {
  id: string;
  filename: string;
  text: string;
  timestamp: string;
  date: string;
  day: number;
}

export function TranscriptionCard({
  id,
  filename,
  text,
  timestamp,
  date,
  day,
}: TranscriptionCardProps) {
  const { deleteTranscription } = useTranscriptionsStore();
  const { openModal } = useUIStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTranscription(id);
    toast.success('Transcription deleted');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal('detail', id);
  };

  const handleClick = () => {
    openModal('detail', id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card
        className={`group overflow-hidden bg-card border-border/50 transition-all duration-300 ${
          isHovered
            ? '-translate-y-1 shadow-xl shadow-red-900/10 border-red-900/30'
            : 'shadow-md'
        }`}
      >
        {/* Fixed-height gradient header strip */}
        <div className="relative h-2 gradient-header">
          {/* Subtle shimmer effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
        </div>

        {/* Card body with consistent height */}
        <div className="p-5 flex flex-col min-h-[220px]">
          {/* Filename */}
          <h3 className="text-white font-medium text-base mb-2 truncate">
            {filename}
          </h3>

          {/* Timestamp */}
          <p className="text-xs text-muted-foreground font-mono mb-4">
            {new Date(timestamp).toLocaleString()}
          </p>

          {/* Content preview - consistent height */}
          <div className="flex-1 mb-4">
            <p className="text-secondary-foreground text-sm leading-relaxed line-clamp-3">
              {text}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            {/* Date display */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white/90">{day}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {date}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/5"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/5"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
