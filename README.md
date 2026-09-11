# 🖥️ Useless Computer Simulator

> *"It looks and feels like a functional desktop computer, but absolutely nothing useful should ever happen."*

A stunning, interactive simulated desktop operating system built with React, Tailwind CSS, Lucide icons, and the Web Audio API where every familiar computer action intentionally fails, wastes time, or responds with a sarcastic message.

---

## ✨ Features

- **Desktop Experience**: Sleek dark-mode wallpaper, movable windows, glassmorphic taskbar, desktop icon grid.
- **10 Guaranteed Useless Core Interactions**:
  1. 🖨️ **Print**: *"Wasting some ink..."* with live animated progress and mechanical sound effects.
  2. 📄 **My Files**: *"Better luck next time."*
  3. 📁 **Important Stuff**: Shakes vigorously and refuses to open (*"Better luck next time."*).
  4. 🗑️ **Recycle Bin**: *"Here is the place where stuff goes to disappear."* — filled with items like *Motivation.dll* (0 KB) and *Productivity.docx* (0 KB).
  5. 📊 **Taskbar**: *"I'm the multi-tasking disaster bar."* (reports 0 productive tasks running).
  6. 🚀 **Start Menu**: *"Click here and hope."*
  7. ⚙️ **Settings**: *"Fix it yourself zone."* with non-functional sliders and humorous toggles.
  8. 🔍 **Search**: *"Where is it?"* with sarcastic results (*"We looked everywhere."*, *"Definitely not here."*).
  9. 🔔 **Notifications**: *"Attention please, there is no messages for you."*
  10. 📶 **Network**: *"The network isn't networking."* (*Signal: Emotionally unavailable*).
- **Simulated Apps**:
  - **Calculator**: *"2 + 2 = Please don't ask difficult questions."*
  - **Notepad**: Auto-saved to `/dev/null` (*"Your note has been successfully forgotten."*).
  - **Useless Browser**: *"The internet is currently hiding."*
  - **Paint**: *"Artistic ability not detected."*
  - **Music Player**: *"Playing silence in ultra-HD."*
  - **Camera**: *"Camera successfully detected absolutely nothing."*
  - **Weather**: *"Weather: probably something."*
  - **Task Manager**: Live CPU graph with `Uselessness.exe` at 97% and `Productivity.exe` at 0%.
  - **Productivity Destroyer**: Annihilate hours of work with a single click.
  - **Definitely Not Malware**: 100% legitimate background helper.
- **Easter Eggs & Secrets**:
  - Clicking the clock: *"Time is passing. You are still here."*
  - Clicking the desktop wallpaper: *"Excellent choice. You clicked the wallpaper."*
  - 10-Click Streak: Confetti celebration and *"Achievement unlocked: Professional Button Clicker."*
  - BSOD: Blue Screen of Death (`CRITICAL_LACK_OF_PURPOSE`) triggerable from Start Menu restart.
- **Sound Engine**: 100% in-browser Web Audio API synthesizer for clicks, chimes, error beeps, and printer sounds (with taskbar mute toggle).

---

## 🚀 How to Run

Simply open `index.html` in any modern web browser, or serve it using any static HTTP server:

```powershell
# Using PowerShell built-in server:
.\start_server.ps1

# Or with Python:
python -m http.server 8080

# Or with npx:
npx serve .
```

Open your browser at `http://localhost:8080/`.
