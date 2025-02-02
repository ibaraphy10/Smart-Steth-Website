from flask import Flask, request, jsonify, send_from_directory, session
import os
import numpy as np
import wave
import sqlite3

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Needed for user sessions
UPLOAD_FOLDER = "recordings"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize the database
def init_db():
    with sqlite3.connect("database.db") as conn:
        c = conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            )
        """)
        c.execute("""
            CREATE TABLE IF NOT EXISTS recordings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                filename TEXT,
                remark TEXT,
                timestamp TEXT,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        """)
        conn.commit()

init_db()

# Ideal heartbeat example (for comparison)
ideal_heartbeat = np.sin(np.linspace(0, 2 * np.pi, 1000))

# Function to analyze heartbeat audio
#def analyze_heartbeat(file_path):
    #with wave.open(file_path, 'rb') as wf:
        #frames = wf.readframes(-1)
        #audio_signal = np.frombuffer(frames, dtype=np.int16)
        #similarity = np.corrcoef(audio_signal[:1000], ideal_heartbeat)[0, 1]
        #return "Normal" if similarity > 0.7 else "Irregular"

def analyze_heartbeat(file_path):
    with wave.open(file_path, 'rb') as wf:
        frames = wf.readframes(-1)
        audio_signal = np.frombuffer(frames, dtype=np.int16).astype(np.float32)  # Convert to float for scaling

        # Normalize amplitude (bring it to the same range as ideal heartbeat)
        max_amplitude = np.max(np.abs(audio_signal))  # Find max value
        if max_amplitude > 0:
            audio_signal = audio_signal / max_amplitude  # Scale between -1 and 1

        # Scale to match ideal heartbeat amplitude
        ideal_max = np.max(np.abs(ideal_heartbeat))
        audio_signal *= ideal_max  # Bring it to the same amplitude level as the ideal heartbeat

        # Compare with ideal heartbeat using correlation
        similarity = np.corrcoef(audio_signal[:1000], ideal_heartbeat)[0, 1]

        return "Normal" if similarity > 0.7 else "Irregular"


# User Registration
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    with sqlite3.connect("database.db") as conn:
        c = conn.cursor()
        try:
            c.execute("INSERT INTO users (username, password) VALUES (?, ?)", 
                      (data["username"], data["password"]))
            conn.commit()
            return jsonify({"message": "User registered successfully"})
        except sqlite3.IntegrityError:
            return jsonify({"error": "Username already exists"}), 400

# User Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    with sqlite3.connect("database.db") as conn:
        c = conn.cursor()
        c.execute("SELECT id FROM users WHERE username = ? AND password = ?", 
                  (data["username"], data["password"]))
        user = c.fetchone()
        if user:
            session["user_id"] = user[0]
            return jsonify({"message": "Login successful"})
        return jsonify({"error": "Invalid credentials"}), 401

# Upload and Analyze Audio
@app.route("/upload", methods=["POST"])
def upload():
    if "audio" not in request.files or "remark" not in request.form:
        return jsonify({"error": "Missing data"}), 400
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    file = request.files["audio"]
    remark = request.form["remark"]
    filename = f"user_{session['user_id']}_{file.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    result = analyze_heartbeat(filepath)
    timestamp = request.form.get("timestamp", "Unknown")

    with sqlite3.connect("database.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO recordings (user_id, filename, remark, timestamp) VALUES (?, ?, ?, ?)", 
                  (session["user_id"], filename, remark, timestamp))
        conn.commit()

    return jsonify({"message": "File uploaded", "result": result})

# Fetch User's Recordings
@app.route("/recordings", methods=["GET"])
def get_recordings():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    with sqlite3.connect("database.db") as conn:
        c = conn.cursor()
        c.execute("SELECT filename, remark, timestamp FROM recordings WHERE user_id = ?", 
                  (session["user_id"],))
        recordings = c.fetchall()

    return jsonify({"recordings": [{"filename": r[0], "remark": r[1], "timestamp": r[2]} for r in recordings]})

# Download Audio File
@app.route("/download/<filename>", methods=["GET"])
def download(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)
