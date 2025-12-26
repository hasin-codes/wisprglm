 @roughrough.md  and @commonerrors.md   and make sure you are strictly follwing
@.claude\skills\frontend-design\skill.md   must use Shadcn MCP and all things and components must and strictly be from
 SHADCN. The terminal command is npm install groq-sdk framer-motion zustand && npx shadcn@latest init -y
. Animation will be using Framer. 


I want you to build a real production application called Sweesh - a fast, intuitive voice-to-text idea capture tool. This isn't a conceptual prototype or a design exercise. This is meant to feel like a polished product that users would rely on daily to quickly capture their thoughts through voice and see them transformed into organized, editable text cards.

Think of Sweesh as a quiet, focused workspace. The entire experience should feel calm and intentional, with a dark aesthetic that reduces visual noise while still feeling expressive and modern in the moments that matter. The interface should breathe, with generous spacing and subtle motion that guides the user's attention without overwhelming them.

The visual foundation is built on a carefully constrained dark theme. Use a near-black background rather than pure black to create depth and allow other elements to float naturally above it. The signature accent is a warm red-to-orange gradient, but here's where restraint becomes critical - this gradient should only appear where it truly matters, specifically in the transcription card headers to create visual hierarchy and recognition. Avoid the temptation to repeat this gradient in settings panels, notification overlays, or user profile areas. Those surfaces should explore different treatments entirely - consider glassmorphism with subtle transparency, soft background blurs, or refined dark surfaces with delicate borders. Each modal and overlay should have its own character while still feeling cohesive with the whole.

Typography should feel editorial and confident. Headings should have presence, body text should be neutral and highly readable with excellent contrast ratios. Aim for WCAG AAA compliance where possible, ensuring text maintains at least 7:1 contrast against its background. Avoid bright blues, playful pastels, or excessive use of gradients beyond the defined accent areas.

The application shell is persistent and elegantly simple. At the very top sits a thin custom header bar containing the Sweesh logo on the left, the app name with version text beside it, and window-style control icons on the right that serve as visual polish for the web interface. Below this header, the main content area unfolds.

On the far left edge, floating slightly inward from the screen boundary, lives a vertical icon rail. This rail contains exactly three icons stacked vertically - notifications, settings, and profile. These icons don't expand into a sidebar; clicking them opens centered modal overlays. Each icon should have a subtle hover state with gentle animation, perhaps a slight scale or glow to communicate interactivity.

The main content area opens with a bold heading reading "Your Transcriptions" followed by a smaller, friendly instructional line explaining how to capture voice notes. Below this lives a responsive masonry or grid layout of transcription cards. On mobile, cards stack in a single column. On tablets, they arrange into two or three columns. On desktop displays, up to four columns fill the space. The spacing between cards should be generous, allowing each one to feel distinct and touchable.

Each transcription card has a precise anatomy that you should follow closely. The top features a fixed-height header strip with that signature red-to-orange gradient. This strip should have subtle depth - a soft glow or inner shadow that makes it feel rich rather than flat. Crucially, no text lives inside this gradient strip; it exists purely as a visual accent. Below this, the card body uses a dark gray background with rounded corners and either a very subtle border or a soft shadow to lift it from the canvas.

Inside the card body, information cascades in a clear hierarchy. At the top, display a filename or identifier in muted white, with the full ISO timestamp in smaller text below it. Then comes the content preview - the actual transcribed text, clamped to about three or four lines with a soft fade or elegant cutoff at the bottom that invites the user to click for more. The footer section splits into two zones: on the left, show a large day number with the month label positioned below or beside it, and on the right, place a copy icon and delete icon with clear touch targets.

Hover interactions on these cards are essential to the experience. When a cursor moves over a card, it should lift slightly upward with a smooth transform, the shadow should intensify subtly to reinforce the elevation change, and the cursor should change to indicate the entire card is clickable. Clicking anywhere on the card surface opens a detailed view modal. Be creative with these micro-interactions - maybe add a subtle shimmer that passes across the gradient header on hover, or let the icons bounce slightly when focused.

All secondary interfaces use modal overlays rather than full page navigation, maintaining context and flow. Modals appear centered with a dark, translucent backdrop that blurs the content behind them ever so slightly. The transcription detail modal should have that gradient header matching the card style, displaying the full transcription text with excellent readability. Include an edit button that toggles edit mode, transforming the text into an editable textarea with clear save and cancel actions. Copy and delete actions remain accessible throughout.

For the settings modal, explore glassmorphism - think translucent panels with backdrop blur, subtle borders catching light, and refined dark surfaces that feel modern without relying on the gradient. Keep the layout compact and scrollable, organizing app configuration into clean sections. The notification modal should gracefully handle empty states with helpful messaging, and when notifications exist, present them in a simple, scannable list. The profile modal shows an avatar placeholder, authentication state information, and clear sign-in or sign-out actions. Again, be creative with these surfaces - use different textures, subtle glows, or refined borders rather than defaulting to the gradient treatment.

Voice recording should feel seamless and non-intrusive. Instead of a full-screen overlay when recording is active, place a small, elegant waveform indicator just a few pixels above the bottom of the viewport, contained within a sleek black or dark gray rounded rectangle. This waveform should react dynamically to audio input levels, pulsing and dancing with the user's voice. The animation should be smooth and subtle, using transforms and opacity changes to create organic movement. Consider adding a soft glow around this indicator that intensifies with louder audio input.

**The transcription pipeline has a specific multi-layer architecture that you must implement exactly:**

**Layer 1 - Voice to Text Transcription:**
When recording completes, send the audio file to Groq's WhisperLarge v3 turbo model for initial transcription:

```javascript
import fs from "fs";
import Groq from "groq-sdk";
const groq = new Groq();

async function transcribeAudio(audioFile) {
  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream(audioFile),
    model: "whisper-large-v3-turbo",
    temperature: 0,
    response_format: "verbose_json",
  });
  return transcription.text;
}
```

**Layer 2 - Text Refinement and Cleanup:**
Immediately after receiving the raw transcription from Whisper, pass it through Groq's Llama-3.1-8b-instant model to remove filler words and clean up mid-sentence corrections. This layer should stream the refined output:

```javascript
import { Groq } from 'groq-sdk';
const groq = new Groq();

async function refineTranscription(rawText) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "Remove filler words or if user tries to change talk or idea or concept midway. Your task is to Generate a final text exactly what and how user said it, just removing the fillers and mid words that user changes"
      },
      {
        "role": "user",
        "content": rawText
      }
    ],
    "model": "llama-3.1-8b-instant",
    "temperature": 0.2,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  let refinedText = '';
  for await (const chunk of chatCompletion) {
    refinedText += chunk.choices[0]?.delta?.content || '';
  }
  return refinedText;
}
```

**Layer 3 - Display in Transcription Card:**
Only after the text has been refined by Llama should it be displayed in the transcription card. The complete flow is:
1. User stops recording → audio sent to Whisper
2. Whisper transcription → immediately sent to Llama for cleanup
3. Llama refined text → displayed in the new transcription card

Make sure you use server-side environment variables for the Groq API key. Don't use NEXT_PUBLIC_ prefix - keep the API key secured on the server side only. Store it as GROQ_API_KEY in your .env file.

Show a brief, tasteful processing state during this two-step pipeline - perhaps a subtle shimmer effect on a placeholder card or a refined loading indicator. Once both transcription and refinement finish, the new card should appear at the top of the grid with a satisfying entrance animation, maybe fading in and sliding down slightly to catch the user's attention.

Functionally, users should be able to view all their transcriptions, edit the text of any entry, save or cancel those edits with clear feedback, copy text to clipboard with a confirmation animation, and delete entries with appropriate confirmation to prevent accidents. Persist this data locally using whatever storage mechanism makes sense for a web application - localStorage, IndexedDB, or similar. Keep the feature set focused - no search functionality, no folder organization, no tagging systems, no analytics dashboards.

Throughout the entire interface, embrace subtle animations on every interactive element. Buttons should have gentle hover states with slight scale transforms or glow effects. State changes should ease smoothly rather than snapping instantly. Modal entrances should fade and scale in gracefully, exits should reverse this motion. Card selections, icon activations, text selections - everything should feel responsive and alive without being distracting. Use CSS transforms and opacity changes for performance, keeping animations between 150-300ms for most interactions.

Create this application using whatever modern web framework and approach you prefer. Structure your components with clear responsibilities and maintainable boundaries. Don't over-engineer state management, but ensure data flows logically through the component tree. Write this as if real users will interact with it daily - every feature should work completely, every button should respond correctly, every animation should run smoothly.

Explore different textural treatments throughout - subtle shimmers on interactive elements, soft glows on focus states, refined shadows for depth. But practice restraint - don't overuse any single effect. The goal is a cohesive, modern, ultra-polished interface that feels both sophisticated and approachable. Let each surface breathe with its own character while maintaining visual harmony. Make thoughtful decisions about when to use that signature gradient, when to employ glassmorphism, when to keep things simple with clean dark surfaces.

This is your opportunity to create something that feels genuinely premium and delightful to use. Have 3-4 demo transcription cards pre-populated to showcase the interface. Make sure there are no errors - before running dev, check for lint errors. Make sure toasts don't overlap the recording indicator component at the bottom of the viewport.

You must use shadcn/ui components exclusively for all UI elements throughout this application. Install shadcn components as needed using their CLI:

npx shadcn@latest add [component-name]


Critical: Do NOT import or use Lucide React icons directly in your code. Instead, only use icons through shadcn's installed components. If you need icons, install the specific shadcn components that include them, or install shadcn's icon button/badge components. Never write import { IconName } from 'lucide-react' anywhere in your codebase - this is strictly forbidden.



ULTRATHINK