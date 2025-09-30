# Timer Component

A React countdown timer component designed for escape room games.

## Features

- ⏱️ **Countdown Timer**: Counts down from specified minutes to 0
- 🎯 **Customizable Duration**: Default 30 minutes, adjustable via props
- 🔔 **Expiration Callback**: Triggers callback when timer reaches 0
- 📊 **Format Display**: Shows time as mm:ss
- 🎨 **Visual Alerts**: 
  - Red color when less than 1 minute remaining
  - Pulse animation when less than 10 seconds
- ♿ **Accessible**: Includes ARIA attributes for screen readers

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minutes` | `number` | `30` | Duration in minutes |
| `onExpire` | `() => void` | `undefined` | Callback function called when timer reaches 0 |

## Usage

### Basic Example

```tsx
import Timer from "@/components/Timer";

export default function GamePage() {
  const handleTimeUp = () => {
    console.log("Time's up!");
    // Handle game over logic
  };

  return (
    <div>
      <h1>Escape Room Game</h1>
      <Timer minutes={30} onExpire={handleTimeUp} />
    </div>
  );
}
```

### Custom Duration

```tsx
// 10-minute timer
<Timer minutes={10} onExpire={() => alert("Time's up!")} />

// 1-hour timer
<Timer minutes={60} onExpire={handleExpire} />
```

### Without Expiration Callback

```tsx
// Timer will count down but won't trigger any action
<Timer minutes={15} />
```

## Display Format

The timer displays in `mm:ss` format:
- `30:00` - 30 minutes
- `05:30` - 5 minutes 30 seconds
- `00:45` - 45 seconds
- `00:00` - Time's up

## Visual States

1. **Normal** (> 1 minute): Black text (or theme foreground color)
2. **Warning** (≤ 1 minute): Red text
3. **Critical** (≤ 10 seconds): Red text with pulse animation

## Accessibility

The component includes ARIA attributes for screen reader support:

```tsx
<div
  role="timer"
  aria-live="polite"
  aria-atomic="true"
>
  {formatTime(timeLeft)}
</div>
```

## Implementation Details

- Uses React hooks (`useState`, `useEffect`)
- Updates every 1000ms (1 second)
- Automatically cleans up interval on unmount
- Resets when `minutes` prop changes

## Demo

Visit `/timer-demo` to see the Timer component in action with an interactive demo page.
