from faster_whisper import WhisperModel
import sounddevice as sd
import numpy as np

# Load model once (important for performance)
model = WhisperModel("tiny", compute_type="int8")  # use "tiny" if slow

SAMPLE_RATE = 16000
DURATION = 4 # seconds


def record_audio(duration=DURATION, fs=SAMPLE_RATE):
    print("🎤 Listening...")

    audio = sd.rec(
        int(duration * fs),
        samplerate=fs,
        channels=1,
        dtype="float32"
    )
    sd.wait()

    return np.squeeze(audio)


def transcribe():
    audio = record_audio()

    segments, _ = model.transcribe(
        audio,
        language="en",          # force English (improves accuracy)
        beam_size=5             # better decoding
    )

    text = " ".join([segment.text for segment in segments]).strip()

    print(f"[DEBUG] Raw input: {text}")

    return text