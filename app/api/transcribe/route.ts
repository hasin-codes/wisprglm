import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 60;

interface TranscribeRequest {
  audioData: string; // base64 encoded audio
}

// Layer 1: Voice to Text Transcription (Whisper)
async function transcribeAudio(audioBase64: string): Promise<string> {
  // Convert base64 to buffer
  const base64Data = audioBase64.split(',')[1] || audioBase64;
  const buffer = Buffer.from(base64Data, 'base64');

  // Create a File object from the buffer
  const file = new File([buffer], 'audio.webm', { type: 'audio/webm' });

  const transcription = await groq.audio.transcriptions.create({
    file: file,
    model: 'whisper-large-v3-turbo',
    temperature: 0,
    response_format: 'verbose_json',
  });

  return transcription.text;
}

// Layer 2: Text Refinement and Cleanup (Llama)
async function refineTranscription(rawText: string): Promise<string> {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
  role: 'system',
  content: 'You are a transcription cleanup assistant. Your task is to remove filler words (um, uh, like, you know, so, actually, etc.) and resolve mid-sentence changes or corrections made by the speaker. When the speaker changes their mind or corrects themselves (e.g., "Monday at 3pm. Actually no, Tuesday at 2pm"), keep only their FINAL intended statement. Preserve all the actual content, meaning, and natural wording - do NOT shorten, summarize, or rephrase what they said. Only remove the verbal disfluencies and the abandoned/corrected portions. If there are no fillers or corrections, return the text almost unchanged. Your job is cleaning, not condensing.'
},
      {
        role: 'user',
        content: rawText,
      },
    ],
    model: 'llama-3.1-8b-instant',
    temperature: 0.2,
    top_p: 1,
    stream: false,
  });

  return chatCompletion.choices[0]?.message?.content || rawText;
}

export async function POST(request: NextRequest) {
  try {
    const body: TranscribeRequest = await request.json();
    const { audioData } = body;

    if (!audioData) {
      return NextResponse.json(
        { error: 'No audio data provided' },
        { status: 400 }
      );
    }

    // Layer 1: Transcribe audio using Whisper
    const rawTranscription = await transcribeAudio(audioData);

    // Layer 2: Refine text using Llama
    const refinedText = await refineTranscription(rawTranscription);

    return NextResponse.json({
      text: refinedText,
      rawText: rawTranscription,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Transcription failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
