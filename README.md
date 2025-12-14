# Tone.js Music Player

A browser-based music application built with Tone.js that combines melody, drums, and bass into a complete musical experience.

## Features
Music Components
- Melody Synth: AM (Amplitude Modulation) synthesizer playing a C major scale pattern
- Drum Kit: Complete percussion section with kick, snare, and hi-hat
- Bass Line: Punchy monophonic bass synth with two pattern options

## Controls
- Start Audio: Initialize audio context and play a test note
- Play Melody: Play the complete arrangement (melody + drums + bass)
- Stop All: Stop all playing sequences and notes

## Technical Features
- Sequenced Patterns: All instruments use Tone.js Sequence for precise timing
- Tempo Control: Fixed at 120 BPM (easily adjustable)
- Real-time Playback: All sequences sync to Tone.Transport
- Error Handling: User-friendly alerts for audio context issues

## Project Structure
```text
your-project/
├── index.html          # Main HTML file
├── spp.js           # Tone.js music code (this file)
└── README.md           # This documentation
```
## License
This project is open source and available under the MIT License.

## Acknowledgments
- Built with [Tone.js](https://tonejs.github.io/).
