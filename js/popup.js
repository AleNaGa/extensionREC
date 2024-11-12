const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

document.getElementById('start').addEventListener('click', async () => {
    //chrome.runtime.sendMessage({ action: 'startRecording' });
    startBtn.disabled = true;
    startBtn.classList.add('active');
    stopBtn.classList.remove('active');
    stopBtn.disabled = false;
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    //chrome.runtime.sendMessage({ action: 'stopRecording' });
    startBtn.disabled = false;
    startBtn.classList.remove('active');
    stopBtn.classList.add('active');
    stopBtn.disabled = true;
  });