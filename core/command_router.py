from automation.app_control.launcher import open_app
from automation.system_control.system import shutdown
from brain.llm_interface.gpt import ask_gpt

def handle_command(command):
    intent = command.get("intent")

    if intent == "open_app":
        open_app(command.get("app"))
        return f"Opening {command.get('app')}"

    elif intent == "shutdown":
        shutdown()
        return "Shutting down system"

    elif intent == "unknown":
        try:
            return ask_gpt(command.get("text"))
        except Exception as e:
            print("[GPT ERROR]", e)
            return f"You said: {command.get('text')}, but AI is offline right now."

    else:
        return "Something went wrong"