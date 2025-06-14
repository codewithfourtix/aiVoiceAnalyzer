// Mock voice analysis function with simulated processing time and error handling
export const analyzeVoiceFile = async (audioBuffer) => {
  console.log('Starting voice analysis with buffer length:', audioBuffer.length);

  try {
    // Simulate processing delay (1-3 seconds)
    const delay = 1000 + Math.random() * 2000;
    console.log('Simulating processing delay of', delay, 'ms');
    await new Promise(resolve => setTimeout(resolve, delay));

    // Randomly simulate errors (1% chance - reduced for better testing experience)
    if (Math.random() < 0.01) {
      console.log('Simulating random error condition');
      throw new Error("Failed to analyze voice. The audio quality might be too low.");
    }

    // Simulate audio analysis
    const audioLength = audioBuffer.length;
    console.log('Processing audio of length:', audioLength);

    // Mock analysis based on audio characteristics
    let avgAmplitude = 0;
    let peakCount = 0;
    let silenceCount = 0;

    // Sample every 100th byte for performance
    for (let i = 0; i < audioLength; i += 100) {
      const sample = audioBuffer[i] || 0;
      avgAmplitude += Math.abs(sample - 128);

      if (sample > 150) peakCount++;
      if (sample < 110) silenceCount++;
    }

    avgAmplitude = avgAmplitude / (audioLength / 100);
    console.log('Analysis metrics:', { avgAmplitude, peakCount, silenceCount });

    // Determine characteristics
    let paceCategory, pitchCategory, volumeCategory;
    let paceDescription, pitchDescription, volumeDescription;

    // Mock pace analysis (based on silence/speech ratio)
    const speechRatio = 1 - silenceCount / (audioLength / 100);
    console.log('Speech ratio:', speechRatio);
    if (speechRatio > 0.8) {
      paceCategory = "high";
      paceDescription = "The speaker's pace is notably fast, indicating a rapid delivery of words. This might suggest excitement or urgency in their speech.";
    } else if (speechRatio < 0.5) {
      paceCategory = "low";
      paceDescription = "The speaker's pace is quite slow, with noticeable pauses between words. This could imply a thoughtful or deliberate communication style.";
    } else {
      paceCategory = "medium";
      paceDescription = "The speaker maintains a moderate pace, allowing for clear articulation without rushing. This suggests a comfortable and steady speaking rhythm.";
    }

    // Mock pitch analysis (based on peak frequency)
    const peakRatio = peakCount / (audioLength / 100);
    console.log('Peak ratio:', peakRatio);
    if (peakRatio > 0.3) {
      pitchCategory = "high";
      pitchDescription = "The pitch of the speaker's voice is high, which can convey enthusiasm or a heightened emotional state. It adds a distinct quality to their vocal expression.";
    } else if (peakRatio < 0.1) {
      pitchCategory = "low";
      pitchDescription = "The speaker's pitch is low, contributing to a deep and resonant vocal quality. This often lends an air of calmness or authority to their speech.";
    } else {
      pitchCategory = "medium";
      pitchDescription = "The speaker's pitch is in a comfortable mid-range, making their voice sound balanced and natural. This allows for easy listening and clear understanding.";
    }

    // Mock volume analysis (based on average amplitude)
    console.log('Average amplitude:', avgAmplitude);
    if (avgAmplitude > 40) {
      volumeCategory = "high";
      volumeDescription = "The volume of the speaker's voice is high, indicating they are speaking loudly. This might be to emphasize points or to ensure they are heard in a noisy environment.";
    } else if (avgAmplitude < 15) {
      volumeCategory = "low";
      volumeDescription = "The speaker's volume is low, suggesting a soft-spoken delivery. This could be due to a quiet setting or a more intimate conversational tone.";
    } else {
      volumeCategory = "medium";
      volumeDescription = "The speaker maintains a medium volume, which is well-suited for most listening environments. Their voice is clear and easily audible without being overpowering.";
    }

    let confidence;
    let speechDetected = true;

    // Adjust confidence based on speech ratio and average amplitude
    if (speechRatio < 0.3 || avgAmplitude < 10) {
      confidence = Math.floor(10 + Math.random() * 30); // 10-40% for low speech/amplitude
      speechDetected = false;
    } else if (speechRatio < 0.6 || avgAmplitude < 25) {
      confidence = Math.floor(40 + Math.random() * 30); // 40-70% for medium speech/amplitude
    } else {
      confidence = Math.floor(70 + Math.random() * 30); // 70-100% for good speech/amplitude
    }

    const result = {
      pace: speechDetected ? { category: paceCategory, description: paceDescription } : { category: "unclear", description: "Speech not clearly detected, so pace could not be analyzed." },
      pitch: speechDetected ? { category: pitchCategory, description: pitchDescription } : { category: "unclear", description: "Speech not clearly detected, so pitch could not be analyzed." },
      volume: speechDetected ? { category: volumeCategory, description: volumeDescription } : { category: "unclear", description: "Speech not clearly detected, so volume could not be analyzed." },
      confidence,
      speechDetected,
    };

    console.log('Analysis complete. Result:', result);
    return result;
  } catch (error) {
    console.error('Error in voice analysis:', error);
    throw error;
  }
};

// Main analysis function that implements timeout
export const analyzeWithAssemblyAI = async (audioBuffer) => {
  console.log('Starting analysis with timeout protection');
  try {
    // Use the mock analysis function instead of actual API
    const result = await Promise.race([
      analyzeVoiceFile(audioBuffer),
      new Promise((_, reject) => {
        const timeoutMs = 15000;
        console.log(`Setting analysis timeout of ${timeoutMs}ms`);
        setTimeout(() => {
          console.log('Analysis timed out');
          reject(new Error("Analysis timed out. Please try again."));
        }, timeoutMs);
      })
    ]);

    console.log('Analysis completed successfully');
    return result;
  } catch (error) {
    console.error("Voice Analysis Error:", error);
    throw error;
  }
};
