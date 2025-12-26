import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transcription {
  id: string;
  filename: string;
  text: string;
  timestamp: string;
  date: string;
  month: string;
  day: number;
}

interface TranscriptionsState {
  transcriptions: Transcription[];
  addTranscription: (transcription: Transcription) => void;
  updateTranscription: (id: string, text: string) => void;
  deleteTranscription: (id: string) => void;
  getTranscription: (id: string) => Transcription | undefined;
}

interface RecordingState {
  isRecording: boolean;
  isProcessing: boolean;
  setRecording: (isRecording: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
}

interface UIState {
  activeModal: 'settings' | 'notifications' | 'profile' | 'detail' | null;
  selectedTranscriptionId: string | null;
  openModal: (modal: 'settings' | 'notifications' | 'profile' | 'detail', transcriptionId?: string) => void;
  closeModal: () => void;
}

export const useTranscriptionsStore = create<TranscriptionsState>()(
  persist(
    (set, get) => ({
      transcriptions: [],
      addTranscription: (transcription) =>
        set((state) => ({
          transcriptions: [transcription, ...state.transcriptions],
        })),
      updateTranscription: (id, text) =>
        set((state) => ({
          transcriptions: state.transcriptions.map((t) =>
            t.id === id ? { ...t, text } : t
          ),
        })),
      deleteTranscription: (id) =>
        set((state) => ({
          transcriptions: state.transcriptions.filter((t) => t.id !== id),
        })),
      getTranscription: (id) => get().transcriptions.find((t) => t.id === id),
    }),
    {
      name: 'sweesh-transcriptions',
    }
  )
);

export const useRecordingStore = create<RecordingState>((set) => ({
  isRecording: false,
  isProcessing: false,
  setRecording: (isRecording) => set({ isRecording }),
  setProcessing: (isProcessing) => set({ isProcessing }),
}));

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  selectedTranscriptionId: null,
  openModal: (modal, transcriptionId) =>
    set({ activeModal: modal, selectedTranscriptionId: transcriptionId || null }),
  closeModal: () =>
    set({ activeModal: null, selectedTranscriptionId: null }),
}));
