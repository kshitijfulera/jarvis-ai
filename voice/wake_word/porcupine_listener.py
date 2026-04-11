def listen_for_wake_word():
    user_input = input("Type 'jarvis' to activate: ").lower()

    if "jarvis" in user_input:
        print("Wake word detected!")
        return True