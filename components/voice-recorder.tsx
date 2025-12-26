'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { useRecordingStore } from '@/lib/store';
import { useTranscriptionsStore } from '@/lib/store';
import { toast } from 'sonner';

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const audioChunksRef = useRef<Blob[]>([]);

  const { isRecording: isRecordingState, setRecording, setProcessing } = useRecordingStore();
  const { addTranscription } = useTranscriptionsStore();

  // Audio level visualization
  useEffect(() => {
    if (!isRecording) return;

    const updateAudioLevels = () => {
      if (analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Take 32 samples for visualization
        const samples: number[] = [];
        for (let i = 0; i < 32; i++) {
          samples.push(dataArray[i] / 255);
        }
        setAudioLevels(samples);

        animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
      }
    };

    updateAudioLevels();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Set up audio context for visualization
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);

        // Cleanup
        stream.getTracks().forEach((track) => track.stop());
        if (audioContext.state !== 'closed') {
          await audioContext.close();
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecording(true);
      toast.success('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecording(false);
      setProcessing(true);
      toast.info('Processing transcription...');
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;

        // Send to API for transcription
        const response = await fetch('/api/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audioData: base64Audio }),
        });

        if (!response.ok) {
          throw new Error('Transcription failed');
        }

        const data = await response.json();

        // Create transcription object
        const now = new Date();
        const date = now.toLocaleDateString('en-US', { month: 'short' });
        const day = now.getDate();
        const timestamp = now.toISOString();

        const transcription = {
          id: crypto.randomUUID(),
          filename: `Voice Note ${new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}`,
          text: data.text,
          timestamp,
          date,
          month: date,
          day,
        };

        addTranscription(transcription);
        setProcessing(false);
        toast.success('Transcription complete!');
      };
    } catch (error) {
      console.error('Error processing audio:', error);
      setProcessing(false);
      toast.error('Transcription failed. Please try again.');
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <AnimatePresence>
      {/* Always-visible record button when not recording */}
      {!isRecordingState && !isRecording && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 h-16 w-16 rounded-full bg-white hover:bg-white/90 text-black shadow-2xl flex items-center justify-center transition-all hover:shadow-white/20"
          aria-label="Start recording"
        >
          <Mic className="h-7 w-7" />
        </motion.button>
      )}

      {/* Recording/processing indicator */}
      {(isRecordingState || isRecording) && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 bg-black/95 border border-white/10 rounded-full px-5 py-3 shadow-2xl">
            {/* Waveform visualization */}
            <div className="flex items-center gap-[2px] h-8">
              {isRecording ? (
                audioLevels.map((level, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-red-600 to-orange-500 rounded-full"
                    initial={{ height: 4 }}
                    animate={{
                      height: 8 + level * 24,
                    }}
                    transition={{
                      duration: 0.05,
                      ease: 'linear',
                    }}
                  />
                ))
              ) : (
                // Processing animation
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-3 bg-white/60 rounded-full"
                    />
                  ))}
                </motion.div>
              )}
            </div>

            <div className="w-px h-6 bg-white/10" />

            {/* Record/Stop button */}
            <Button
              onClick={handleClick}
              size="icon"
              className="h-10 w-10 rounded-full bg-white hover:bg-white/90 text-black"
            >
              {isRecording ? (
                <Square className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>

            {/* Status text */}
            <span className="text-sm font-medium text-white/90 min-w-[100px]">
              {isRecording ? 'Recording...' : 'Processing...'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
