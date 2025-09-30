# HTML Room Generator

A utility function to generate complete, standalone HTML pages for escape room games.

## Overview

The `generateRoomHTML` function creates a fully self-contained HTML page with:
- **Inline CSS**: No external stylesheets required
- **Inline JavaScript**: Timer functionality and interactions built-in
- **Responsive Design**: Works on desktop and mobile
- **Accessibility**: ARIA attributes and keyboard support
- **Theme Support**: Light and dark modes

## Installation

The generator is already included in this project at:
```
src/lib/generator.ts
```

## Usage

### Basic Example

```typescript
import { generateRoomHTML, RoomPayload } from "@/lib/generator";

const payload: RoomPayload = {
  title: "Escape Room Challenge",
  timerMinutes: 30,
  theme: "light",
  stages: [
    {
      id: "stage-1",
      name: "Format Code",
      description: "Click the button to format the messy code",
      completed: false,
    },
    {
      id: "stage-2",
      name: "Debug Code",
      description: "Find and fix the bug in the code",
      completed: true,
    },
  ],
};

const htmlString = generateRoomHTML(payload);
// Returns a complete HTML document as a string
```

### API Route Example

```typescript
// app/api/generate-room/route.ts
import { NextResponse } from "next/server";
import { generateRoomHTML } from "@/lib/generator";

export async function POST(request: Request) {
  const payload = await request.json();
  const html = generateRoomHTML(payload);
  
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
```

### Saving to File (Node.js)

```typescript
import fs from "fs";
import { generateRoomHTML } from "@/lib/generator";

const html = generateRoomHTML(payload);
fs.writeFileSync("escape-room.html", html);
```

## RoomPayload Interface

```typescript
interface RoomPayload {
  title: string;              // Page title
  timerMinutes?: number;      // Timer duration (default: 30)
  stages: {
    id: string;               // Unique stage identifier
    name: string;             // Stage name/title
    description: string;      // Stage description
    completed?: boolean;      // Completion status (default: false)
  }[];
  theme?: "light" | "dark";   // Visual theme (default: "light")
}
```

## Generated Features

### 1. Countdown Timer
- Displays time in `mm:ss` format
- Updates every second
- Visual warning when < 1 minute (red color)
- Pulse animation when < 10 seconds
- Triggers alert when time expires

### 2. Stage List
- Displays all stages with name and description
- Shows completion status (✅ or ⭕)
- Completed stages have green border
- "COMPLETED" badge for finished stages
- Click handlers for stage interaction

### 3. Progress Bar
- Visual progress indicator
- Shows X/Y stages completed
- Smooth animation on updates
- ARIA progressbar attributes

### 4. Styling
- Clean, modern design
- Responsive layout (mobile-friendly)
- Hover effects on interactive elements
- Smooth transitions

### 5. Accessibility
- Semantic HTML structure
- ARIA attributes (`role`, `aria-live`, `aria-label`)
- Keyboard navigation support
- Focus-visible styles
- Screen reader friendly

## Inline JavaScript Features

The generated HTML includes JavaScript for:

1. **Timer Countdown**
   - `setInterval` updates every second
   - Auto-stops at 0
   - Shows alert on expiration

2. **Stage Interaction**
   - Click event listeners
   - Keyboard support (Enter/Space)
   - Console logging for debugging

3. **Time Formatting**
   - Converts seconds to `mm:ss`
   - Zero-padded display

## Theme Support

### Light Theme
```typescript
{
  theme: "light",
  // White background, dark text
}
```

### Dark Theme
```typescript
{
  theme: "dark",
  // Dark background, light text
}
```

## Security

The generator includes HTML escaping for all user-provided content:
- Title
- Stage names
- Stage descriptions
- Stage IDs

This prevents XSS attacks when generating HTML from user input.

## Helper Functions

### `escapeHtml(text: string): string`
Escapes HTML special characters to prevent XSS.

### `formatTime(seconds: number): string`
Formats seconds as `mm:ss` string.

### `getCompletedCount(stages): number`
Returns count of completed stages.

### `getProgressPercentage(stages): number`
Calculates completion percentage (0-100).

## Demo

Visit `/generator-demo` to see an interactive demo where you can:
- Configure the payload
- Generate HTML in real-time
- Preview the output
- Copy to clipboard
- Download as `.html` file
- Open in new tab

## API Endpoints

### GET /api/generate-room
Returns example HTML with default payload.

### POST /api/generate-room
Accepts custom `RoomPayload` JSON and returns generated HTML.

**Request Body:**
```json
{
  "title": "My Room",
  "timerMinutes": 15,
  "theme": "dark",
  "stages": [...]
}
```

**Response:**
```html
<!DOCTYPE html>
<html lang="en">
...
</html>
```

## Use Cases

1. **Static Site Generation**: Generate HTML files for deployment
2. **Email Templates**: Embed game challenges in emails
3. **Offline Games**: Create downloadable HTML games
4. **Print to PDF**: Generate printable escape room sheets
5. **Archival**: Save game states as HTML snapshots
6. **Testing**: Generate test HTML for E2E tests

## Browser Compatibility

The generated HTML works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Zero Dependencies**: No external resources to load
- **Inline Everything**: Single file, instant load
- **Minimal JavaScript**: ~50 lines of vanilla JS
- **Optimized CSS**: Small, efficient styles
- **File Size**: Typically < 10KB

## Customization

To modify the generated HTML, edit the template in `src/lib/generator.ts`:
- **Styles**: Update the `<style>` section
- **JavaScript**: Modify the `<script>` section
- **Layout**: Change the HTML structure
- **Features**: Add new interactive elements

## Testing

```bash
# Run the demo
npm run dev
# Visit http://localhost:3000/generator-demo

# Test API endpoint
curl http://localhost:3000/api/generate-room

# Test with custom payload
curl -X POST http://localhost:3000/api/generate-room \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Room","timerMinutes":10,"stages":[...]}'
```

## License

Part of the CSE3CWA Assignment 2 project.
