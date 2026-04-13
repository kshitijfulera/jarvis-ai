from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from threading import Thread

from api.state import state
from main import run_jarvis

# ✅ CREATE APP FIRST
app = FastAPI()

# ✅ CORS (important for UI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ START JARVIS IN BACKGROUND
@app.on_event("startup")
def start_jarvis():
    thread = Thread(target=run_jarvis, daemon=True)
    thread.start()

# ✅ STATE ENDPOINT
@app.get("/state")
def get_state():
    return state

# ✅ ACTIVATE ENDPOINT
@app.post("/activate")
def activate():
    print("ACTIVATE API CALLED")

    state["trigger"] = True
    return {"message": "Jarvis activated"}