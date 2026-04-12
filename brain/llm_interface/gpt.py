from openai import OpenAI
import os
from dotenv import load_dotenv
from brain.memory.memory import get_memory

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_gpt(prompt: str):
    memory = get_memory()

    messages = [
        {"role": "system", "content": "You are Jarvis, a smart AI assistant."}
    ]

    # Add memory context
    for item in memory:
        messages.append({"role": "user", "content": item["user"]})
        messages.append({"role": "assistant", "content": item["assistant"]})

    # Add current input
    messages.append({"role": "user", "content": prompt})

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )

    return response.choices[0].message.content