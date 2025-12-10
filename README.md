# ReAdiFy_V3_ExTenTion_


https://github.com/user-attachments/assets/161e266b-bc17-405a-af16-168b7435c4f9


**Download Link:**  
https://github.com/NandakishorNaiR/ReAdiFy_V3_ExTenTion_/archive/refs/tags/v3.0.zip

---

# Readify – Chrome Text-to-Speech Extension

Readify is a lightweight Chrome extension that converts on-screen text into speech using built-in browser voices. It offers multiple voice options, adjustable reading speed, and full playback controls, making reading easier, faster, and more accessible.

---

## 🛠️ Technologies Used
- JavaScript (Core logic)
- Chrome Extension APIs  
  - `chrome.tts` (Text-to-Speech)  
  - `chrome.runtime` & `chrome.tabs`
- HTML/CSS (Popup UI)
- Background Service Worker
- Content Script (Text extraction)
- Manifest V3

---

## 🎙️ Features

### 1. Text-to-Speech Reader  
Reads selected or auto-detected text on a webpage with clear, natural speech.

### 2. Multiple Voice Options  
Choose from available browser voices (Google voices, Microsoft voices, etc.).

### 3. Adjustable Speed  
Custom slider allows slow, normal, or fast reading.

### 4. Full Playback Controls  
Start • Pause • Resume • Stop

### 5. Clean & Simple Popup UI  
Buttons, dropdowns, and sliders for easy interaction.

---

## 📂 Project Structure

```text
READIFY_CHROME_STABLE_V3/
│
├── background.js
├── content.js
├── manifest.json
├── popup.css
├── popup.html
├── popup.js
│
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## ⚙️ How It Works (Functionality Overview)

### 1. Content Script (`content.js`)
- Extracts selected or visible webpage text  
- Sends it to the background worker  

### 2. Background Script (`background.js`)
- Uses `chrome.tts` to read text aloud  
- Handles play, pause, resume, stop, speed, and voice selection  

### 3. Popup UI (`popup.js`, `popup.html`, `popup.css`)
- Provides UI to:  
  - Choose voice  
  - Adjust speed  
  - Start/Pause/Resume/Stop reading  

### 4. Manifest V3 (`manifest.json`)
- Declares permissions, icons, scripts, and metadata  

---

## 📦 Setup & Installation (Developer Mode)

### 1. Download the ZIP  
Extract the downloaded folder.

### 2. Open Chrome Extensions  
```
chrome://extensions/
```

### 3. Enable Developer Mode  
Toggle on **Developer mode** (top right)

### 4. Load Unpacked  
Click **Load unpacked** → Select:  
```
READIFY_CHROME_STABLE_V3/
```

Your extension is now installed! 🎉

---

## 🚀 Usage Guide

### 1. Pin the Extension  
Extensions icon → Pin **Readify**

### 2. Open Popup  
Select a voice, adjust speed, use the buttons.

### 3. Select Text  
Highlight text and click **Start**.

### 4. Full Page Mode  
If no text is selected, Readify reads visible content.

---

## 🛠️ Customization

### UI Styling  
Edit `popup.css`

### HTML Layout  
Modify `popup.html`

### TTS Logic  
Change `background.js`

### Text Extraction  
Edit `content.js`

---

## ❗ Troubleshooting

**Not speaking?**
- Try changing the voice  
- Ensure TTS engines are available  

**No text detected?**
- Some websites block scripts → select manually  

**Buttons not working?**
- Check console logs  
- Validate `manifest.json`

---

## 📄 License  
MIT License  

---

## 👨‍💻 Author  
Built with ❤️ under the **Knoxy Nexus** ecosystem.
