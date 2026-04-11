import subprocess

def open_app(app_name):
    if app_name == "chrome":
        subprocess.Popen("start chrome", shell=True)

    elif app_name == "notepad":
        subprocess.Popen("notepad.exe", shell=True)