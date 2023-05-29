class PlusImg extends Image {
  constructor (src, width, height) {
    super();
  
    if (src) {
      
      if (src instanceof Image) {
      
        return src;
        
      } else if (src instanceof HTMLCanvasElement) {

        this.src = src.toDataURL();
      
      } else if (src instanceof CanvasRenderingContext2D) {

        this.src = src.canvas.toDataURL();
      
      } else {
      
        this.src = src;
        if (width) {
          this.width = width;
        }
        if (height) {
          this.height = height;
        }
      
      }
    
    }
    
    return this;
  }
  
  toDataURL() {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;
    context.drawImage(this, 0, 0);
    return canvas.toDataURL();
  }
  
  crop(x, y, width, height) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, -x, -y);

    this.src = canvas.toDataURL();
  }
}

class PlusCanvas extends HTMLCanvasElement {
  constructor (canvas) {
    if (canvas) {
      return canvas;
    }
  
    return document.createElement("canvas");
  }
  
  toImage() {
    var image = new Image();
    image.src = this.toDataURL();
    return image;
  }
  
  resize(x, y, width, height) {
    if (arguments.length < 4) {
      throw new TypeError("Must have at least 4 arguments; only " + arguments.length + " provided");
    }
  
    var imageData = this.getImageData(0, 0, this.width, this.height);
    
    this.width = width;
    this.height = height;
    
    this.putImageData(imageData, -x, -y);
  }
}