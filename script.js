/*let mediaRecorder;
let audioChunks = [];

document.getElementById('startRecording').addEventListener('click', async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    
    document.getElementById('startRecording').disabled = true;
    document.getElementById('stopRecording').disabled = false;

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };
});

document.getElementById('stopRecording').addEventListener('click', () => {
    mediaRecorder.stop();

    mediaRecorder.onstop = () => {
        let audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        let audioUrl = URL.createObjectURL(audioBlob);
        let audio = document.getElementById('audioPlayback');
        audio.src = audioUrl;
        audioChunks = [];
    };

    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
});*/


/*let mediaRecorder;
let audioChunks = [];

document.getElementById('startRecording').addEventListener('click', async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    
    document.getElementById('startRecording').disabled = true;
    document.getElementById('stopRecording').disabled = false;
    document.getElementById('analyzeRecording').disabled = true;

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };
});

document.getElementById('stopRecording').addEventListener('click', () => {
    mediaRecorder.stop();

    mediaRecorder.onstop = () => {
        let audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        let audioUrl = URL.createObjectURL(audioBlob);
        let audio = document.getElementById('audioPlayback');
        audio.src = audioUrl;
        audioChunks = [];

        // Enable Analyze button after recording is stopped
        document.getElementById('analyzeRecording').disabled = false;
    };

    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
});

// 🧠 Heartbeat Analysis with 'Fetching results' + Saving History
document.getElementById('analyzeRecording').addEventListener('click', () => {
    let analysisResult = document.getElementById("analysisResult");
    
    // Show 'Fetching results' message
    analysisResult.textContent = "Fetching results... ⏳";
    analysisResult.style.color = "blue";

    setTimeout(() => {
        let bpm = Math.floor(Math.random() * (110 - 50) + 50); // Simulated heart rate (50-110 BPM)
        let status = bpm >= 60 && bpm <= 100 ? "Normal" : "Irregular";

        // Update with final result
        analysisResult.textContent = Heart Rate: ${bpm} BPM - Status: ${status};
        analysisResult.style.color = status === "Normal" ? "green" : "red";

        // Save Result in Local Storage
        saveResult(bpm, status);

        // Show History
        displayHistory();

    }, 3000);
});

// 💾 Function to Save Results in Local Storage
function saveResult(bpm, status) {
    let history = JSON.parse(localStorage.getItem("heartbeatHistory")) || [];
    let timestamp = new Date().toLocaleString();

    history.push({ bpm, status, timestamp });

    localStorage.setItem("heartbeatHistory", JSON.stringify(history));
}

// 📜 Function to Display Saved Results
function displayHistory() {
    let historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "<h3>Previous Results:</h3>";

    let history = JSON.parse(localStorage.getItem("heartbeatHistory")) || [];

    history.forEach((entry, index) => {
        let entryDiv = document.createElement("p");
        entryDiv.textContent = ${entry.timestamp} - Heart Rate: ${entry.bpm} BPM - Status: ${entry.status};
        entryDiv.style.color = entry.status === "Normal" ? "green" : "red";
        historyContainer.appendChild(entryDiv);
    });
}

// 🛠️ Load History on Page Load
window.onload = displayHistory;*/

//top had 9 errors 

/*let mediaRecorder;
let audioChunks = [];

document.getElementById('startRecording').addEventListener('click', async () => {
    if (!window.MediaRecorder) {
        alert("Your browser does not support MediaRecorder API.");
        return;
    }

    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
        console.error("Error accessing audio: ", err);
        alert("Could not access microphone. Please check your permissions.");
        return;
    }

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    document.getElementById('startRecording').disabled = true;
    document.getElementById('stopRecording').disabled = false;
    document.getElementById('analyzeRecording').disabled = true;

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onerror = (error) => {
        console.error("Error occurred while recording: ", error);
        alert("An error occurred while recording.");
    };
});

document.getElementById('stopRecording').addEventListener('click', () => {
    mediaRecorder.stop();

    mediaRecorder.onstop = () => {
        let audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        let audioUrl = URL.createObjectURL(audioBlob);
        let audio = document.getElementById('audioPlayback');
        if (audio) {
            audio.src = audioUrl;
        } else {
            console.error("Audio element not found!");
        }

        audioChunks = [];
        mediaRecorder.stream.getTracks().forEach(track => track.stop());

        document.getElementById('startRecording').disabled = false;
        document.getElementById('stopRecording').disabled = true;
        document.getElementById('analyzeRecording').disabled = false;
    };
});

document.getElementById('analyzeRecording').addEventListener('click', () => {
    let analysisResult = document.getElementById("analysisResult");

    analysisResult.textContent = "Fetching results... ⏳";
    analysisResult.style.color = "blue";

    setTimeout(() => {
        let bpm = Math.floor(Math.random() * (110 - 50) + 50); 
        let status = bpm >= 60 && bpm <= 100 ? "Normal" : "Irregular";

        analysisResult.textContent = `Heart Rate: ${bpm} BPM - Status: ${status}`;
        analysisResult.style.color = status === "Normal" ? "green" : "red";

        saveResult(bpm, status);

        displayHistory();

    }, 3000);
});

function saveResult(bpm, status) {
    let history = JSON.parse(localStorage.getItem("heartbeatHistory")) || [];
    let timestamp = new Date().toLocaleString();

    history.push({ bpm, status, timestamp });

    localStorage.setItem("heartbeatHistory", JSON.stringify(history));
}

/*not a part of this code 
function displayHistory() {
    let historyContainer = document.getElementById("history");
    if (historyContainer) {
        historyContainer.innerHTML = "<h3>Previous Results:</h3>";
    } else {
        console.error("History container not found!");
    }

    let history = JSON.parse(localStorage.getItem("heartbeatHistory")) || [];

    history.forEach((entry, index) => {
        let entryDiv = document.createElement("p");
        entryDiv.textContent = `${entry.timestamp} - Heart Rate: ${entry.bpm} BPM - Status: ${entry.status}`;
        entryDiv.style.color = entry.status === "Normal" ? "green" : "red";
        historyContainer.appendChild(entryDiv);
    });
}

window.onload = displayHistory;*/

/*continuation of the code
function displayHistory() {
    let historyContainer = document.getElementById("history");
    if (!historyContainer) {
        console.error("No History Found!");
        return;
    }

    historyContainer.innerHTML = "<h3>Previous Results:</h3>";

    let history = JSON.parse(localStorage.getItem("heartbeatHistory")) || [];

    history.forEach((entry) => {
        let entryDiv = document.createElement("p");
        entryDiv.textContent = `${entry.timestamp} - Heart Rate: ${entry.bpm} BPM - Status: ${entry.status}`;
        entryDiv.style.color = entry.status === "Normal" ? "green" : "red";
        historyContainer.appendChild(entryDiv);
    });
}*/

let mediaRecorder;
let audioChunks = [];

// Show the demo when the page loads
window.onload = function() {
    setTimeout(function() {
        document.getElementById("demoPopup").classList.add("show");
    }, 1000); // Popup appears after 1 second
};

// Close the demo when the user clicks the "Got it, Let's Start" button
document.getElementById("closeDemo").addEventListener('click', () => {
    document.getElementById("demoPopup").classList.remove("show");
});

document.getElementById('startRecording').addEventListener('click', async () => {
    if (!window.MediaRecorder) {
        alert("Your browser does not support MediaRecorder API.");
        return;
    }

    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
        console.error("Error accessing audio: ", err);
        alert("Could not access microphone. Please check your permissions.");
        return;
    }

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    document.getElementById('startRecording').disabled = true;
    document.getElementById('stopRecording').disabled = false;
    document.getElementById('analyzeRecording').disabled = true;

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onerror = (error) => {
        console.error("Error occurred while recording: ", error);
        alert("An error occurred while recording.");
    };
});

document.getElementById('stopRecording').addEventListener('click', () => {
    mediaRecorder.stop();

    mediaRecorder.onstop = () => {
        let audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        let audioUrl = URL.createObjectURL(audioBlob);
        let audio = document.getElementById('audioPlayback');
        if (audio) {
            audio.src = audioUrl;
        } else {
            console.error("Audio element not found!");
        }

        audioChunks = [];
        mediaRecorder.stream.getTracks().forEach(track => track.stop());

        document.getElementById('startRecording').disabled = false;
        document.getElementById('stopRecording').disabled = true;
        document.getElementById('analyzeRecording').disabled = false;
    };
});

document.getElementById('analyzeRecording').addEventListener('click', () => {
    let analysisResult = document.getElementById("analysisResult");

    analysisResult.textContent = "Fetching results... ⏳";
    analysisResult.style.color = "blue";

    setTimeout(() => {
        let bpm = Math.floor(Math.random() * (110 - 50) + 50); 
        let status = bpm >= 60 && bpm <= 100 ? "Normal" : "Irregular";

        analysisResult.textContent = `Heart Rate: ${bpm} BPM - Status: ${status}`;
        analysisResult.style.color = status === "Normal" ? "green" : "red";

        saveResult(bpm, status);

        displayHistory();

    }, 3000);
});

function saveResult(bpm, status) {
    let history = JSON.parse(localStorage.getItem("heartbeatHistory")) || [];
    let timestamp = new Date().toLocaleString();

    history.push({ bpm, status, timestamp });

    localStorage.setItem("heartbeatHistory", JSON.stringify(history));
}

function displayHistory() {
    let historyContainer = document.getElementById("history");
    if (!historyContainer) {
        console.error("No History Found!");
        return;
    }

    historyContainer.innerHTML = "<h3>Previous Results:</h3>";

    let history = JSON.parse(localStorage.getItem("heartbeatHistory")) || [];

    history.forEach((entry) => {
        let entryDiv = document.createElement("p");
        entryDiv.textContent = `${entry.timestamp} - Heart Rate: ${entry.bpm} BPM - Status: ${entry.status}`;
        entryDiv.style.color = entry.status === "Normal" ? "green" : "red";
        historyContainer.appendChild(entryDiv);
    });
}



