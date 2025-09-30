/**
 * Payload interface for room HTML generation
 */
export interface RoomPayload {
  title: string;
  timerMinutes?: number;
  stages: {
    id: string;
    name: string;
    description: string;
    completed?: boolean;
  }[];
  theme?: "light" | "dark";
}

/**
 * Generates a complete HTML page with inline CSS and JavaScript
 * Includes a countdown timer and list of stages
 */
export function generateRoomHTML(payload: RoomPayload): string {
  const {
    title,
    timerMinutes = 30,
    stages,
    theme = "light",
  } = payload;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-color: ${theme === "dark" ? "#0a0a0a" : "#ffffff"};
      --text-color: ${theme === "dark" ? "#ededed" : "#171717"};
      --card-bg: ${theme === "dark" ? "#1a1a1a" : "#f9f9f9"};
      --border-color: ${theme === "dark" ? "#333" : "#e0e0e0"};
      --accent-color: #3b82f6;
      --success-color: #10b981;
      --warning-color: #ef4444;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: var(--bg-color);
      color: var(--text-color);
      padding: 20px;
      min-height: 100vh;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 40px;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: var(--text-color);
    }

    .timer-container {
      background: var(--card-bg);
      border: 2px solid var(--border-color);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: center;
    }

    .timer-label {
      font-size: 0.9rem;
      color: var(--text-color);
      opacity: 0.7;
      margin-bottom: 10px;
    }

    .timer {
      font-size: 3rem;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      color: var(--accent-color);
      transition: color 0.3s ease;
    }

    .timer.warning {
      color: var(--warning-color);
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .stages-container {
      margin-top: 30px;
    }

    .stages-title {
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: var(--text-color);
    }

    .stage-list {
      list-style: none;
    }

    .stage-item {
      background: var(--card-bg);
      border: 2px solid var(--border-color);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .stage-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .stage-item.completed {
      border-color: var(--success-color);
      background: ${theme === "dark" ? "#0a2f1a" : "#f0fdf4"};
    }

    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .stage-name {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .stage-status {
      font-size: 1.5rem;
    }

    .stage-description {
      color: var(--text-color);
      opacity: 0.8;
      line-height: 1.5;
    }

    .completed-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--success-color);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: bold;
    }

    .progress-bar {
      margin-top: 30px;
      background: var(--border-color);
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--success-color);
      transition: width 0.5s ease;
    }

    .progress-text {
      text-align: center;
      margin-top: 10px;
      font-size: 0.9rem;
      opacity: 0.7;
    }

    *:focus-visible {
      outline: 2px solid var(--accent-color);
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .timer {
        font-size: 2.5rem;
      }

      .stage-name {
        font-size: 1.1rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${escapeHtml(title)}</h1>
    </header>

    <div class="timer-container">
      <div class="timer-label">Time Remaining</div>
      <div id="timer" class="timer" role="timer" aria-live="polite" aria-atomic="true">
        ${formatTime(timerMinutes * 60)}
      </div>
    </div>

    <div class="stages-container">
      <h2 class="stages-title">Stages</h2>
      <ul class="stage-list" role="list">
        ${stages
          .map(
            (stage) => `
        <li class="stage-item ${stage.completed ? "completed" : ""}" data-stage-id="${escapeHtml(stage.id)}">
          ${stage.completed ? '<span class="completed-badge">COMPLETED</span>' : ""}
          <div class="stage-header">
            <h3 class="stage-name">${escapeHtml(stage.name)}</h3>
            <span class="stage-status" aria-label="${stage.completed ? "Completed" : "Incomplete"}">
              ${stage.completed ? "✅" : "⭕"}
            </span>
          </div>
          <p class="stage-description">${escapeHtml(stage.description)}</p>
        </li>
        `
          )
          .join("")}
      </ul>

      <div class="progress-bar" role="progressbar" aria-valuenow="${getCompletedCount(stages)}" aria-valuemin="0" aria-valuemax="${stages.length}">
        <div class="progress-fill" style="width: ${getProgressPercentage(stages)}%"></div>
      </div>
      <div class="progress-text">
        ${getCompletedCount(stages)} of ${stages.length} stages completed
      </div>
    </div>
  </div>

  <script>
    let timeLeft = ${timerMinutes * 60};
    const timerElement = document.getElementById('timer');

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    }

    function updateTimer() {
      if (timeLeft <= 0) {
        timerElement.textContent = '00:00';
        timerElement.classList.add('warning');
        clearInterval(timerInterval);
        handleTimeExpired();
        return;
      }

      timerElement.textContent = formatTime(timeLeft);
      
      if (timeLeft <= 60) {
        timerElement.classList.add('warning');
      }

      timeLeft--;
    }

    function handleTimeExpired() {
      alert('⏰ Time\\'s up! The escape room challenge has ended.');
    }

    const timerInterval = setInterval(updateTimer, 1000);

    const stageItems = document.querySelectorAll('.stage-item');
    stageItems.forEach(item => {
      item.addEventListener('click', function() {
        const stageId = this.getAttribute('data-stage-id');
        console.log('Stage clicked:', stageId);
      });

      item.setAttribute('tabindex', '0');
      item.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    console.log('Room loaded:', {
      title: '${escapeHtml(title)}',
      timerMinutes: ${timerMinutes},
      stages: ${JSON.stringify(stages)}
    });
  </script>
</body>
</html>`;
}

/**
 * Helper function to escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Helper function to format time as mm:ss
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Helper function to get completed stages count
 */
function getCompletedCount(
  stages: RoomPayload["stages"]
): number {
  return stages.filter((stage) => stage.completed).length;
}

/**
 * Helper function to calculate progress percentage
 */
function getProgressPercentage(
  stages: RoomPayload["stages"]
): number {
  if (stages.length === 0) return 0;
  return Math.round((getCompletedCount(stages) / stages.length) * 100);
}
