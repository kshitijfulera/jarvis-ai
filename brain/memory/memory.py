import json
import os

MEMORY_FILE = "brain/memory/memory.json"

# Load memory if exists
if os.path.exists(MEMORY_FILE):
    with open(MEMORY_FILE, "r") as f:
        conversation_history = json.load(f)
else:
    conversation_history = []


def save_memory():
    with open(MEMORY_FILE, "w") as f:
        json.dump(conversation_history, f, indent=4)


def add_to_memory(user, assistant):
    conversation_history.append({
        "user": user,
        "assistant": assistant
    })
    save_memory()


def get_memory():
    return conversation_history[-5:]