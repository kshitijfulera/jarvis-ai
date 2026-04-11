from voice.wake_word.porcupine_listener import listen_for_wake_word
from voice.stt.whisper_engine import transcribe
from voice.tts.speak import speak

from brain.intent_engine.parser import parse_command
from core.command_router import handle_command

def run_jarvis():
    while True:
        listen_for_wake_word()

        speak("Yes, how can I help?")
        
        text = transcribe()

        if text:
            command = parse_command(text)
            response = handle_command(command)

            print(response)
            speak(response)

if __name__ == "__main__":
    run_jarvis()