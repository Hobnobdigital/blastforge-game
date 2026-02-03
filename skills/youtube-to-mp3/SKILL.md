# YouTube to MP3 Converter Skill

Convert YouTube videos to MP3 audio files using browser automation with ytmp3.gg.

## Overview

This skill uses browser automation to convert YouTube videos to high-quality MP3 files (up to 320kbps) through the ytmp3.gg service.

## Requirements

- Browser automation capability (clawd profile)
- Internet connection

## Usage

### Basic Conversion

1. User provides a YouTube URL
2. Open browser to https://ytmp3.gg
3. Enter the YouTube URL in the input field
4. Select quality (128kbps, 320kbps, etc.)
5. Click Convert
6. Wait for conversion (shows "Analyzing video details...")
7. Extract download URL from the Download button's `data-url` attribute
8. Use curl to download the MP3 file

### Step-by-Step Process

```javascript
// 1. Navigate to ytmp3.gg
browser.navigate("https://ytmp3.gg")

// 2. Type YouTube URL in the input field (ref=e21)
browser.act({ kind: "type", ref: "e21", text: "https://youtu.be/VIDEO_ID" })

// 3. Select 320kbps quality (ref=e30)
browser.act({ kind: "select", ref: "e30", values: ["MP3 - 320kbps"] })

// 4. Click Convert button (ref=e46)
browser.act({ kind: "click", ref: "e46" })

// 5. Wait ~5 seconds for conversion
sleep(5)

// 6. Extract download URL from Download button
browser.act({
  kind: "evaluate",
  fn: "() => { const btns = Array.from(document.querySelectorAll('button')); const downloadBtn = btns.find(b => b.textContent.includes('Download')); return downloadBtn?.getAttribute('data-url') || 'not-found'; }"
})

// 7. Download with curl
curl -L "{download_url}" -o "output.mp3"
```

## Quality Options

| Format | Quality | Use Case |
|--------|---------|----------|
| MP3 - 128kbps | Standard | Small file size |
| MP3 - 320kbps | High | Best audio quality |
| M4A | Variable | Apple devices |
| OGG | Variable | Open format |
| WAV | Lossless | Professional audio |
| Opus | Variable | Modern format |

## Troubleshooting

### "Analyzing video details..." stuck
- Wait longer (up to 30 seconds for long videos)
- Refresh and try again

### Download URL not found
- Check if conversion completed (Download button visible)
- The `data-url` attribute only appears after successful conversion

### Bot detection
- Use ytmp3.gg via browser automation (not direct API calls)
- Don't make too many requests in quick succession

## Notes

- Respect copyright laws - only download content you have rights to
- ytmp3.gg is free and ad-free
- Supports videos up to 3 hours long
- Works with YouTube Shorts too

## Example Output

```
Title: O'Kenneth - YIMAYƐ [Official Music Video]
Artist: O'Kenneth  
Format: MP3 320kbps
Size: ~6.5MB (for 3-4 min video)
```
