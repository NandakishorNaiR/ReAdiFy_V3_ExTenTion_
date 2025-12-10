# ReAdiFy_V3_ExTenTion_
downloadlink:- https://github.com/NandakishorNaiR/ReAdiFy_V3_ExTenTion_/archive/refs/tags/v3.0.zip
Readify – Chrome Text-to-Speech Extension

Readify is a lightweight Chrome extension that converts on-screen text into speech using built-in browser voices. It offers multiple voice options, adjustable reading speed, and full playback controls, making reading easier, faster, and more accessible.

🛠️ Technologies Used

JavaScript (Core logic)

Chrome Extension APIs

chrome.tts (Text-to-Speech)

chrome.runtime & chrome.tabs

HTML/CSS (Popup UI)

Background Service Worker

Content Script (To extract webpage text)

Manifest V3

🎙️ Features
1. Text-to-Speech Reader

Reads selected or auto-detected text on a webpage with clear, natural speech.

2. Multiple Voice Options

Users can choose from available browser voices (e.g., Microsoft David, Google US English, etc.).

3. Adjustable Speed

A custom slider allows slow, normal, or fast reading.

4. Full Playback Controls

Start

Pause

Resume

Stop

5. Clean & Simple Popup UI

Buttons, dropdowns, and sliders for easy interaction.

📂 Project Structure
READIFY_CHROME_STABLE_V3/
│
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── background.js
├── content.js
├── manifest.json
│
├── popup.html
├── popup.css
└── popup.js


⚙️ How It Works (Functionality Overview)
1. Content Script (content.js)

Extracts selected text or visible text from the DOM.

Sends text to the background service worker.

2. Background Script (background.js)

Uses chrome.tts to read the text aloud.

Handles play, pause, resume, stop, and voice selection.

3. Popup UI (popup.js, popup.html, popup.css)

Lets the user:

Select voice

Adjust speed

Start/Pause/Resume/Stop reading

Sends commands to the background script.

4. Manifest.json (MV3)

Configures permissions, scripts, icons, and extension metadata.

📦 Setup & Installation (Developer Mode)
1. Download the ZIP

Download the Readify extension ZIP and extract it.

2. Open Chrome Extensions

Go to:

chrome://extensions/

3. Enable Developer Mode

Top-right toggle → Developer mode ON

4. Load Unpacked

Click Load unpacked
Select the folder:

READIFY_CHROME_STABLE_V3/


Your extension is now installed.

🚀 Usage Guide
1. Pin the Extension

Click the puzzle icon → pin Readify to the toolbar.

2. Open Popup

Click the Readify icon to see:

Voice selector

Speed slider

Start/Pause/Resume/Stop buttons

3. Select Text

Highlight any text on a webpage → click Start.

4. Full-page Mode

If no text is highlighted, Readify attempts to read visible page content.

🛠️ Customization
UI Styling

Modify popup.css.

Popup Layout

Edit popup.html.

TTS Logic / Voice APIs

Modify background.js.

Text Extraction Logic

Edit content.js.

❗ Troubleshooting
Extension not speaking?

Check if your browser has TTS voices installed.

Try selecting another voice from the dropdown.

No text detected?

Some websites block script access—select text manually.

Buttons not responding?

Make sure:

manifest.json is valid

Scripts are linked properly

Console shows no errors (Inspect popup)

📄 License

MIT License (recommended for open distribution).

👨‍💻 Author

Built with ❤️ under the Knoxy Nexus ecosystem.
