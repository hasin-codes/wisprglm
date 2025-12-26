Common Errors
1. All Transcription card's size has to be same size no matter how many texts are inside the card so we have a proper Consistency.
2. 
## Error Type
Console Error

## Error Message
Encountered two children with the same key, ``. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.


    at VoiceRecorder (components/voice-recorder.tsx:203:5)
    at Home (app/page.tsx:41:7)

## Code Frame
  201 |
  202 |   return (
> 203 |     <AnimatePresence>
      |     ^
  204 |       {/* Fixed bottom recording indicator */}
  205 |       {(isRecording || isProcessing) && (
  206 |         <motion.div

Next.js version: 16.1.1 (Turbopack)

## Error Type
Console Error

## Error Message
Transcription failed


    at processAudio (components/voice-recorder.tsx:118:15)
    at async mediaRecorder.onstop (components/voice-recorder.tsx:59:9)

## Code Frame
  116 |
  117 |       if (!response.ok) {
> 118 |         throw new Error('Transcription failed');
      |               ^
  119 |       }
  120 |
  121 |       const data = await response.json();

Next.js version: 16.1.1 (Turbopack)
