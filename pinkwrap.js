const canvas = document.getElementById('glassesCanvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('webcam');
const startButton = document.getElementById('startWebcam');

// Placeholder function for face detection
function detectFace() {
  // You can integrate a real face detection algorithm here.
  // We'll assume we get coordinates of the eyes, and we will draw glasses there.
  return { leftEye: { x: 200, y: 175 }, rightEye: { x: 400, y: 175 } };
}

function drawGlasses(faceData) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw glasses frames around detected eye positions
  const { leftEye, rightEye } = faceData;

  ctx.fillStyle = '#3D5AFE';
  ctx.fillRect(leftEye.x - 50, leftEye.y - 25, 100, 50);
  ctx.fillRect(rightEye.x - 50, rightEye.y - 25, 100, 50);

  ctx.beginPath();
  ctx.arc(leftEye.x, leftEye.y, 40, 0, Math.PI * 2);
  ctx.arc(rightEye.x, rightEye.y, 40, 0, Math.PI * 2);
  ctx.strokeStyle = '#FF4081';
  ctx.lineWidth = 8;
  ctx.stroke();
}

function startVideo() {
  // Access the webcam
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error("Error accessing webcam: ", err);
    });
}

function updateCanvas() {
  const faceData = detectFace(); // Simulate detecting face coordinates
  drawGlasses(faceData); // Draw the glasses based on the face data
}

startButton.addEventListener('click', () => {
  startVideo();
  setInterval(updateCanvas, 1000); // Update every second (can be adjusted)
});

document.getElementById('shopnow').addEventListener('click', function () {
    window.location.href = 'https://www.instagram.com/pinkwrap/';
  });

  const maxWords = 250; // Set the maximum number of words
  const textarea = document.getElementById('wordLimitInput');
  const wordCountMessage = document.getElementById('wordCountMessage');
  
  textarea.addEventListener('input', function () {
    let text = textarea.value.trim(); // Get the text, trim to remove extra spaces
    let words = text.split(/\s+/); // Split by spaces to count words
    
    if (words.length > maxWords) {
      // If word count exceeds the limit, truncate the words
      textarea.value = words.slice(0, maxWords).join(' ');
      wordCountMessage.textContent = `You can only write up to ${maxWords} words.`;
    } else {
      wordCountMessage.textContent = `${words.length}/${maxWords} words.`;
    }
  });
  