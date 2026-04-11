def parse_command(text: str):
    text = text.lower()

    # OPEN APP
    if "open" in text:
        if "chrome" in text or "browser" in text:
            return {"intent": "open_app", "app": "chrome"}

        elif "notepad" in text or "note" in text:
            return {"intent": "open_app", "app": "notepad"}

    # SHUTDOWN
    if "shutdown" in text or "shut down" in text:
        return {"intent": "shutdown"}

    return {"intent": "unknown", "text": text}