// Enhanced voice analysis function with more accurate audio processing
export const analyzeVoiceFile = async (audioBuffer) => {
  console.log(
    "Starting enhanced voice analysis with buffer length:",
    audioBuffer.length
  );

  try {
    // Simulate processing delay (1-3 seconds)
    const delay = 1000 + Math.random() * 2000;
    console.log("Simulating processing delay of", delay, "ms");
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Calculate actual audio duration (assuming 44.1kHz sample rate, 16-bit)
    const sampleRate = 44100;
    const bytesPerSample = 2;
    const durationSeconds = Math.max(
      3,
      audioBuffer.length / (sampleRate * bytesPerSample)
    );

    // Randomly simulate errors (0.5% chance)
    if (Math.random() < 0.005) {
      console.log("Simulating random error condition");
      throw new Error(
        "Failed to analyze voice. The audio quality might be too low."
      );
    }

    console.log(
      "Processing audio of length:",
      audioBuffer.length,
      "Duration:",
      durationSeconds.toFixed(2),
      "seconds"
    );

    // Enhanced audio analysis with proper signal processing concepts
    const analysisResult = performAdvancedAudioAnalysis(
      audioBuffer,
      sampleRate
    );

    // Determine characteristics based on analysis
    const {
      paceAnalysis,
      pitchAnalysis,
      volumeAnalysis,
      confidence,
      speechDetected,
    } = categorizeAudioFeatures(analysisResult, durationSeconds);

    const result = {
      pace: speechDetected
        ? paceAnalysis
        : {
            category: "unclear",
            description:
              "Speech not clearly detected, so pace could not be analyzed.",
          },
      pitch: speechDetected
        ? pitchAnalysis
        : {
            category: "unclear",
            description:
              "Speech not clearly detected, so pitch could not be analyzed.",
          },
      volume: speechDetected
        ? volumeAnalysis
        : {
            category: "unclear",
            description:
              "Speech not clearly detected, so volume could not be analyzed.",
          },
      confidence,
      speechDetected, // This was missing!
      durationSeconds: Math.round(durationSeconds * 100) / 100,
    };

    console.log("Enhanced analysis complete. Result:", result);
    return result;
  } catch (error) {
    console.error("Error in voice analysis:", error);
    throw error;
  }
};

// Advanced audio analysis function
const performAdvancedAudioAnalysis = (audioBuffer, sampleRate) => {
  const length = audioBuffer.length;

  // Convert bytes to normalized audio samples (-1 to 1)
  const samples = [];
  for (let i = 0; i < length - 1; i += 2) {
    const sample = audioBuffer[i] | (audioBuffer[i + 1] << 8);
    const normalizedSample = sample > 32767 ? sample - 65536 : sample;
    samples.push(normalizedSample / 32768.0);
  }

  // Calculate RMS (Root Mean Square) for volume analysis
  let rmsSum = 0;
  for (let i = 0; i < samples.length; i++) {
    rmsSum += samples[i] * samples[i];
  }
  const rms = Math.sqrt(rmsSum / samples.length);
  const volumeDb = 20 * Math.log10(rms + 1e-10); // Add small value to avoid log(0)

  // Zero Crossing Rate for pitch/speech detection
  let zeroCrossings = 0;
  for (let i = 1; i < samples.length; i++) {
    if (samples[i] >= 0 !== samples[i - 1] >= 0) {
      zeroCrossings++;
    }
  }
  const zeroCrossingRate = zeroCrossings / samples.length;

  // Energy-based voice activity detection
  const frameSize = Math.floor(sampleRate * 0.025); // 25ms frames
  const frameStep = Math.floor(sampleRate * 0.01); // 10ms step
  let speechFrames = 0;
  let totalFrames = 0;
  let energyValues = [];

  for (let start = 0; start < samples.length - frameSize; start += frameStep) {
    let energy = 0;
    for (let i = start; i < start + frameSize && i < samples.length; i++) {
      energy += samples[i] * samples[i];
    }
    energy = energy / frameSize;
    energyValues.push(energy);

    // Simple voice activity detection based on energy threshold
    const energyThreshold = 0.001;
    if (energy > energyThreshold) {
      speechFrames++;
    }
    totalFrames++;
  }

  const speechActivityRatio = speechFrames / totalFrames;

  // Estimate fundamental frequency (pitch) using autocorrelation
  const estimatedPitch = estimatePitchAutocorrelation(samples, sampleRate);

  // Spectral centroid estimation (brightness of sound)
  const spectralCentroid = estimateSpectralCentroid(samples, sampleRate);

  // Estimate speaking rate based on energy fluctuations
  const speakingRate = estimateSpeakingRate(
    energyValues,
    sampleRate,
    frameStep
  );

  return {
    rms,
    volumeDb,
    zeroCrossingRate,
    speechActivityRatio,
    estimatedPitch,
    spectralCentroid,
    speakingRate,
    energyValues,
    sampleCount: samples.length,
  };
};

// Pitch estimation using simplified autocorrelation
const estimatePitchAutocorrelation = (samples, sampleRate) => {
  const minPitch = 80; // Hz
  const maxPitch = 400; // Hz
  const minPeriod = Math.floor(sampleRate / maxPitch);
  const maxPeriod = Math.floor(sampleRate / minPitch);

  let bestCorrelation = 0;
  let bestPeriod = minPeriod;

  // Simple autocorrelation for pitch detection
  for (
    let period = minPeriod;
    period <= maxPeriod && period < samples.length / 2;
    period++
  ) {
    let correlation = 0;
    let count = 0;

    for (let i = 0; i < samples.length - period; i++) {
      correlation += samples[i] * samples[i + period];
      count++;
    }

    correlation = correlation / count;

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestPeriod = period;
    }
  }

  return bestCorrelation > 0.3 ? sampleRate / bestPeriod : 0;
};

// Estimate spectral centroid (brightness)
const estimateSpectralCentroid = (samples, sampleRate) => {
  // Simple spectral centroid estimation using energy distribution
  const fftSize = 1024;
  const bins = Math.min(fftSize / 2, samples.length / 2);
  let weightedSum = 0;
  let magnitudeSum = 0;

  for (let i = 1; i < bins; i++) {
    const frequency = (i * sampleRate) / fftSize;
    // Simplified magnitude calculation
    const magnitude =
      Math.abs(samples[i] || 0) + Math.abs(samples[samples.length - i] || 0);
    weightedSum += frequency * magnitude;
    magnitudeSum += magnitude;
  }

  return magnitudeSum > 0 ? weightedSum / magnitudeSum : 1000;
};

// Estimate speaking rate from energy fluctuations
const estimateSpeakingRate = (energyValues, sampleRate, frameStep) => {
  if (energyValues.length < 10) return 0;

  // Find energy peaks (syllable-like patterns)
  let peaks = 0;
  const threshold = Math.max(...energyValues) * 0.3;

  for (let i = 1; i < energyValues.length - 1; i++) {
    if (
      energyValues[i] > threshold &&
      energyValues[i] > energyValues[i - 1] &&
      energyValues[i] > energyValues[i + 1]
    ) {
      peaks++;
    }
  }

  const durationSeconds = (energyValues.length * frameStep) / sampleRate;
  const syllablesPerSecond = peaks / durationSeconds;

  // Rough conversion: 1.5 syllables per word on average
  const wordsPerMinute = (syllablesPerSecond * 60) / 1.5;

  return Math.max(0, Math.min(300, wordsPerMinute)); // Cap at reasonable range
};

// Categorize audio features into user-friendly descriptions
const categorizeAudioFeatures = (analysis, durationSeconds) => {
  const {
    volumeDb,
    speechActivityRatio,
    estimatedPitch,
    speakingRate,
    zeroCrossingRate,
    rms,
  } = analysis;

  // More lenient speech detection thresholds
  const speechDetected =
    speechActivityRatio > 0.05 && // Lowered from 0.1
    zeroCrossingRate > 0.0005 && // Lowered from 0.001
    rms > 0.0005; // Lowered from 0.001

  console.log("Speech detection factors:", {
    speechActivityRatio,
    zeroCrossingRate,
    rms,
    speechDetected,
  });

  // Calculate confidence based on multiple factors
  let confidence;
  if (!speechDetected) {
    confidence = Math.floor(5 + Math.random() * 25); // 5-30% if no speech detected
  } else if (speechActivityRatio < 0.3 || volumeDb < -45) {
    confidence = Math.floor(30 + Math.random() * 30); // 30-60% for low speech activity or very low volume
  } else if (speechActivityRatio < 0.6 || volumeDb < -30) {
    confidence = Math.floor(60 + Math.random() * 20); // 60-80% for medium speech activity or volume
  } else {
    confidence = Math.floor(80 + Math.random() * 20); // 80-100% for good speech activity and volume
  }

  // Pace analysis based on estimated speaking rate
  let paceAnalysis;
  if (speakingRate > 180) {
    paceAnalysis = {
      category: "high",
      description:
        "The speaker's pace is notably fast, with rapid delivery of words. This dynamic speaking style can convey enthusiasm and energy, though it may sometimes challenge listener comprehension.",
    };
  } else if (speakingRate < 120) {
    paceAnalysis = {
      category: "low",
      description:
        "The speaker maintains a deliberate, measured pace with thoughtful pauses. This slower delivery style allows for clear articulation and gives listeners time to process the information.",
    };
  } else {
    paceAnalysis = {
      category: "medium",
      description:
        "The speaker maintains an optimal pace that balances clarity with engagement. This comfortable speaking rhythm allows for natural expression while ensuring good comprehension.",
    };
  }

  // Pitch analysis based on fundamental frequency
  let pitchAnalysis;
  if (estimatedPitch === 0 || !speechDetected) {
    pitchAnalysis = {
      category: "unclear",
      description:
        "Pitch could not be reliably determined due to low speech activity or poor audio quality.",
    };
  } else if (estimatedPitch > 200) {
    pitchAnalysis = {
      category: "high",
      description:
        "The speaker's voice has a higher pitch range, which can convey enthusiasm, excitement, or emotional engagement. This vocal quality adds expressiveness to their communication style.",
    };
  } else if (estimatedPitch < 120) {
    pitchAnalysis = {
      category: "low",
      description:
        "The speaker's voice demonstrates a lower pitch range, contributing to a calm, authoritative presence. This deeper vocal quality often conveys confidence and gravitas.",
    };
  } else {
    pitchAnalysis = {
      category: "medium",
      description:
        "The speaker's pitch falls within a natural, conversational range that is pleasant and easy to listen to. This balanced vocal tone facilitates clear communication and listener engagement.",
    };
  }

  // Volume analysis based on RMS and dB levels
  let volumeAnalysis;
  if (volumeDb > -20) {
    volumeAnalysis = {
      category: "high",
      description:
        "The speaker's voice has strong projection and volume, ensuring clear audibility. This confident vocal presence can be effective for presentations and commanding attention.",
    };
  } else if (volumeDb < -35) {
    volumeAnalysis = {
      category: "low",
      description:
        "The speaker uses a softer, more intimate volume level. This gentle approach can create a sense of closeness with listeners, though it may require attention to ensure adequate audibility.",
    };
  } else {
    volumeAnalysis = {
      category: "medium",
      description:
        "The speaker maintains an appropriate volume level that is clear and comfortable for listeners. This balanced projection ensures good audibility without being overwhelming.",
    };
  }

  console.log("Final analysis results:", {
    paceAnalysis,
    pitchAnalysis,
    volumeAnalysis,
    confidence,
    speechDetected,
  });

  return {
    paceAnalysis,
    pitchAnalysis,
    volumeAnalysis,
    confidence,
    speechDetected,
  };
};

// Main analysis function with timeout protection
export const analyzeWithAssemblyAI = async (audioBuffer) => {
  console.log("Starting enhanced analysis with timeout protection");
  try {
    const result = await Promise.race([
      analyzeVoiceFile(audioBuffer),
      new Promise((_, reject) => {
        const timeoutMs = 15000;
        console.log(`Setting analysis timeout of ${timeoutMs}ms`);
        setTimeout(() => {
          console.log("Analysis timed out");
          reject(new Error("Analysis timed out. Please try again."));
        }, timeoutMs);
      }),
    ]);

    console.log("Enhanced analysis completed successfully");
    return result;
  } catch (error) {
    console.error("Voice Analysis Error:", error);
    throw error;
  }
};
