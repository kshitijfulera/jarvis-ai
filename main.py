from voice.wake_word.porcupine_listener import listen_for_wake_word
from voice.stt.whisper_engine import transcribe
from voice.tts.speak import speak

from brain.intent_engine.parser import parse_command
from core.command_router import handle_command
from brain.memory.memory import add_to_memory, get_memory

from api.state import state
import time

print("[MEMORY]", get_memory())

def run_jarvis():
    import time

    while True:
        state["status"] = "waiting"

        # WAIT FOR BUTTON CLICK
        while not state.get("trigger", False):
            time.sleep(0.2)

        print("TRIGGER RECEIVED")  # 🔥 DEBUG

        state["trigger"] = False

        state["status"] = "listening"
        speak("Yes, how can I help?")

        text = transcribe()
        state["user_text"] = text

        if text:
            command = parse_command(text)
            response = handle_command(command)

            state["response"] = response
            state["status"] = "responding"

            print(response)
            speak(response) 