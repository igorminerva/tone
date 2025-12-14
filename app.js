// Wait for Tone.js to load
window.addEventListener('load', function () {
    console.log('Tone.js loaded:', typeof Tone);

    


    // Make functions global so HTML buttons can access them
    window.startAudio = async function () {
        try {
            await Tone.start();
            console.log('Audio started, state:', Tone.context.state);
            // Play a single note
            synth.triggerAttackRelease("C4", "8n");
        } catch (error) {
            console.error('Error starting audio:', error);
            alert('Error starting audio. Check console.');
        }
    };


    // Basic synth
    const synth = new Tone.AMSynth().toDestination();
    const scale = ["C4", "D4", "E4", "C4", "C4", "E4", "E4"];

    const drums = {
        kick: new Tone.MembraneSynth().toDestination(),
        snare: new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
        }).toDestination(),
        hihat: new Tone.MetalSynth({
            frequency: 200,
            envelope: { attack: 0.001, decay: 0.1 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5
        }).toDestination()
    };
    // Create bass synth with punchy sound
    const bassSynth = new Tone.MonoSynth({
        oscillator: { type: 'sawtooth' },
        filter: { type: 'lowpass', frequency: 300, Q: 1 },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.4, release: 0.8 },
        filterEnvelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.5,
            release: 0.8,
            baseFrequency: 200,
            octaves: 3
        }
    }).toDestination();

    // Different bass patterns
    const bassPatterns = {
        simple: ["C2", "C2", "G2", "G2", "F2", "F2", "G2", "G2"],
        walking: ["C2", "E2", "G2", "A2", "C2", "E2", "G2", "A2"],
    };

    // Create bass sequence
    let bassSequence = new Tone.Sequence((time, note) => {
        if (note) {
            bassSynth.triggerAttackRelease(note, note === null ? "8n" : "8n", time);
        }
    }, bassPatterns.simple, "8n");

    // Create a sequence
    const melodySequence = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, "8n", time);
    }, scale, "8n");

    const kickSequence = new Tone.Sequence((time, step) => {
        if (step === 1) drums.kick.triggerAttackRelease("C2", "8n", time);
    }, [1, 0, 0, 0, 1, 0, 0, 0], "8n");

    const snareSequence = new Tone.Sequence((time, step) => {
        if (step === 1) drums.snare.triggerAttackRelease("8n", time);
    }, [0, 0, 1, 0, 0, 0, 1, 0], "8n");

    const hihatSequence = new Tone.Sequence((time, step) => {
        if (step === 1) drums.hihat.triggerAttackRelease("32n", time);
    }, [1, 1, 1, 1, 1, 1, 1, 1], "8n");

    // Play a melody
    window.playMelody = function () {
        console.log('Trying to play melody, state:', Tone.context.state);

        // Check if audio is started
        if (Tone.context.state !== 'running') {
            alert('Click "Click to Start Audio" first!');
            return;
        }

        // Stop everything
        Tone.Transport.stop();
        melodySequence.stop();
        bassSequence.stop();
        kickSequence.stop();
        snareSequence.stop();
        hihatSequence.stop();

        Tone.Transport.bpm.value = 120;
        // Start all sequences
        melodySequence.start(0);
        bassSequence.start(0);
        kickSequence.start(0);
        snareSequence.start(0);
        hihatSequence.start(0);


        // Start transport
        Tone.Transport.start();

        console.log('Playing melody with drums!');

    };

    window.stopAll = function () {
        Tone.Transport.stop();
        melodySequence.stop();
        kickSequence.stop();
        snareSequence.stop();
        hihatSequence.stop();
        synth.triggerRelease();
        console.log('All stopped');
    };


    console.log('Functions registered');
});