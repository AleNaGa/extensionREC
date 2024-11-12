const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
let mediaRecorder;
let recordedChunks = [];

chrome.runtime.onMessage.addListener(async (request) => {
    if (request.action === 'startRecording') {
      startScreenCapture();
    } else if (request.action === 'stopRecording') {
      stopRecording();
    }
  });


async function startScreenCapture() {
    const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
  }
  
  function stopRecording() {
    mediaRecorder.stop();
  }
  
  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  }

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screencast.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
