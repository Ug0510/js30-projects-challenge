const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// Get access to the video stream
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);

      // Assign the media stream directly to the video element
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

// Paint the video stream to the canvas at regular intervals
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // Get the image data (pixels)
    let pixels = ctx.getImageData(0, 0, width, height);

    // Apply the RGB split effect to the pixels
    pixels = rgbSplit(pixels);

    // Apply the green screen effect based on the input values
    pixels = greenScreen(pixels);

    // Put the modified pixels back onto the canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

// Take a photo by capturing the canvas and displaying it in a new element
function takePhoto() {
  // Play the camera snap sound
  snap.currentTime = 0;
  snap.play();

  // Take the data out of the canvas as a JPEG image
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

// Apply the RGB split effect to the pixels
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // Red manipulation: Increase red value
    pixels.data[i + 0] = pixels.data[i + 0] + 150;
    // Green manipulation: Decrease green value
    pixels.data[i + 1] = pixels.data[i + 1] - 100;
    // Blue manipulation: Decrease blue value
    pixels.data[i + 2] = pixels.data[i + 2] - 150;
  }
  return pixels;
}

// Apply the green screen effect to the pixels
function greenScreen(pixels) {
  const levels = {
    rmin: document.querySelector('input[name="rmin"]').value,
    rmax: document.querySelector('input[name="rmax"]').value,
    gmin: document.querySelector('input[name="gmin"]').value,
    gmax: document.querySelector('input[name="gmax"]').value,
    bmin: document.querySelector('input[name="bmin"]').value,
    bmax: document.querySelector('input[name="bmax"]').value,
  };

  // Loop through each pixel
  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i + 0];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    const alpha = pixels.data[i + 3];

    // If the pixel is within the range of the green screen, make it transparent
    if (red >= levels.rmin && red <= levels.rmax
      && green >= levels.gmin && green <= levels.gmax
      && blue >= levels.bmin && blue <= levels.bmax) {
      pixels.data[i + 3] = 0; // Make the pixel transparent
    }
  }

  return pixels;
}

// Start the video stream
getVideo();

// Start painting to canvas when the video is ready
video.addEventListener('canplay', paintToCanvas);
