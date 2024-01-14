import tkinter as tk
window = tk.Tk()
window.title("Hi")
window.geometry("1000x570")
label = tk.Label(window, text="Hello world")
label.pack(pady=20)
window.mainloop()
