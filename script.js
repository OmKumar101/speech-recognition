// Get the file input element
const fileInput = document.querySelector('#file-input');

// Get the transcribe button element
const transcribeButton = document.querySelector('#transcribe-button');

// Get the transcribed text element
const transcribedText = document.querySelector('#transcribed-text');

// Create a progress bar element
const progressBar = document.createElement('progress');
progressBar.classList.add('progress-bar');

// Add the progress bar to the DOM
document.body.appendChild(progressBar);

// Add a listener to the transcribe button
transcribeButton.addEventListener('click', async () => {

// Disable the transcribe button
transcribeButton.disabled = true;

// Show the progress bar
progressBar.hidden = false;

// Get the selected file
const file = fileInput.files[0];

// Create a new FileReader object
const reader = new FileReader();

// Read the file as a binary string
reader.readAsArrayBuffer(file);

// When the file has been read, transcribe it to text
reader.onload = async () => {

try {

// Get the transcribed text
const transcribedText = await transcribeAudio(reader.result);

// Display the transcribed text
transcribedText.textContent = transcribedText;

} catch (error) {

// Handle the error
console.log(error);

}

// Re-enable the transcribe button
transcribeButton.disabled = false;

// Hide the progress bar
progressBar.hidden = true;

};

});

// Transcribes the given audio/video file to text
async function transcribeAudio(audioBuffer) {

// Create a new SpeechRecognition object
const recognizer = new SpeechRecognition();

// Set the language of the recognizer
recognizer.lang = 'en-US';

// Add a listener to the recognizer's `result` event
recognizer.addEventListener('result', (event) => {

// Get the transcribed text
const transcribedText = event.results[0][0].transcript;

// Add the transcribed text to the textarea element
transcribedText.textContent += transcribedText;

});

// Add a listener to the recognizer's `error` event
recognizer.addEventListener('error', (event) => {

// Handle the error
console.log(event.error);

});

// Start the recognition process
recognizer.start(audioBuffer);

// Return a promise that resolves when the recognition process is complete
return new Promise((resolve, reject) => {

recognizer.addEventListener('end', () => {

resolve(transcribedText);

});

});

}