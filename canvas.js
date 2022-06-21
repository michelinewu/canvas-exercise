const images = [];
let selectedImage, offsetX, offsetY = null;

window.onload = function() {
  const imageWidth = window.innerWidth / 10;
  const imageHeight = imageWidth;

  const onMouseDown = (event) => {
    // check if mouse event coordinates
    // fall on an image
    selectedImage = getSelectedImage(event);
    if (selectedImage) {
      offsetX = event.x - selectedImage.x;
      offsetY = event.y - selectedImage.y;
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.strokeRect(selectedImage.x+1, selectedImage.y+1, imageWidth - 2, imageHeight - 2);
    }
  }

  const onMouseUp = (event) => {
    // removes the green border
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    images.map((image) => {
      ctx.drawImage(image.image, image.x, image.y, imageWidth, imageHeight);
    })
    selectedImage = null;
    offsetX = null;
    offsetY = null;
  }

  const onMouseMove = (event) => {
    if (selectedImage) {
      const { image } = selectedImage;
      selectedImage.x = event.x - offsetX;
      selectedImage.y = event.y - offsetY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      images.map((canvasImage) => {
        if (canvasImage.id !== image.id) {
          ctx.drawImage(canvasImage.image, canvasImage.x, canvasImage.y, imageWidth, imageHeight);
        }
      });
      ctx.drawImage(image, selectedImage.x , selectedImage.y, imageWidth, imageHeight);
      ctx.strokeRect(selectedImage.x+1, selectedImage.y+1, imageWidth - 2, imageHeight - 2);
    }
  }

  const getSelectedImage = (event) => {
    const selected = images.find((imageElement) => {
      const image = imageElement.image;
      if (event.x > imageElement.x && event.x < (imageElement.x + image.width) && event.y > imageElement.y && event.y < (imageElement.y + image.height)) {
        return image;
      }
    })
    if (selected) {
      // append image to the end of the array
      // for correct z-index
      const index = images.indexOf(selected);
      images.splice(index,1);
      images.push(selected);
      ctx.drawImage(selected.image, selected.x , selected.y, imageWidth, imageHeight);
      return selected;
    }
    return null;
  }

  // set up the canvas
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = (canvas.width * 9) / 16;
  const ctx = canvas.getContext('2d');
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  // add event listeners to canvas
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);

  // load all images from images directory
  // and add to canvas
  $.ajax({
    url: 'images/',
    success: function (data) {
      $(data).find("a:contains(png)").each(function (index) {
        const filename = this.href.replace(window.location.host, "").replace("http://", "");
        const image = new Image();
        image.src = filename;
        image.setAttribute('id', this.title.split('.')[0]);
        image.onload = () => {
          ctx.drawImage(image, index * imageWidth, 0, imageWidth, imageHeight);
        };
        images.push({
          image,
          x: index * imageWidth,
          y: 0
        });
      });
    }
  });
}
