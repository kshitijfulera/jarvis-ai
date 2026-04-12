def listen_for_wake_word():
    try:
        user_input = input("Type 'jarvis' to activate: ").lower()

        if "jarvis" in user_input:
            print("Wake word detected!")
            return True

    except KeyboardInterrupt:
        print("\nExiting Jarvis...")
        exit()