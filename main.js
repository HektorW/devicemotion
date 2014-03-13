

var graphs = [];

function init() {
  graphs.push(new Graph('alpha', 'Alpha'));
  graphs.push(new Graph('beta', 'Beta'));
  graphs.push(new Graph('gamma', 'Gamma'));

  graphs.push(new Graph('acc1', 'Acceleration.x'));
  graphs.push(new Graph('acc2', 'Acceleration.y'));
  graphs.push(new Graph('acc3', 'Acceleration.z'));

  graphs.push(new Graph('accgrav1', 'Acceleration Gravity.x'));
  graphs.push(new Graph('accgrav2', 'Acceleration Gravity.y'));
  graphs.push(new Graph('accgrav3', 'Acceleration Gravity.z'));

  graphs.push(new Graph('rotrate1', 'RotationRate Alpha'));
  graphs.push(new Graph('rotrate2', 'RotationRate Beta'));
  graphs.push(new Graph('rotrate3', 'RotationRate Gamma'));
  
  graphs.push(new Graph('interval', 'Interval'));
  


  window.addEventListener('deviceorientation', function(event) {
    graphs[0].setValue(event.alpha);
    graphs[1].setValue(event.beta);
    graphs[2].setValue(event.gamma);
  }, false);

  window.addEventListener('devicemotion', function(event) {
    graphs[3].setValue(event.acceleration.x);
    graphs[4].setValue(event.acceleration.y);
    graphs[5].setValue(event.acceleration.z);

    graphs[6].setValue(event.accelerationIncludingGravity.x);
    graphs[7].setValue(event.accelerationIncludingGravity.y);
    graphs[8].setValue(event.accelerationIncludingGravity.z);

    graphs[9].setValue(event.rotationRate.alpha);
    graphs[10].setValue(event.rotationRate.beta);
    graphs[11].setValue(event.rotationRate.gamma);

    graphs[12].setValue(event.interval);

  }, false);
}


function render(t) {
  window.requestAnimationFrame(render);

  for(var i = graphs.length; i--; ) {
    graphs[i].draw();
  }
}


function Graph(id, name) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext('2d');

  this.name = name || id;

  this.width = this.canvas.width;
  this.height = this.canvas.height;

  this.maxvalues = 240;
  this.values = new Array(this.maxvalues);
}

Graph.prototype.setValue = function(val) {
  if (this.values.length >= this.maxvalues) {
    this.values.splice(0, 1);
  }
  this.values.push(val);
};

Graph.prototype.draw = function(time) {
  var ctx = this.ctx;
  ctx.clearRect(0, 0, this.width, this.height);

  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';

  var m = maxabs(this.values);
  ctx.fillText('+' + m.toFixed(2), 0, 10);
  ctx.fillText('-' + m.toFixed(2), 0, this.height);
  var namelen = ctx.measureText(this.name);
  ctx.fillText(this.name, (this.width / 2) - (namelen.width / 2), 10);



  var dx = this.width / this.maxvalues;
  var dy = (this.height * 0.4) / m;
  var values = this.values;
  var x = this.width;
  ctx.beginPath();
  ctx.moveTo(x, (this.height * 0.5) - (this.values[0] * dy));
  for (var i = values.length; i--; ) {
    x -= dx;
    ctx.lineTo(x, (this.height * 0.5) - (values[i] * dy));
  }
  ctx.stroke();
};

function maxabs(array) {
  var m=-1, a, i, abs = Math.abs;
  for(i = array.length; i--; ){
    m = ((a = abs(array[i])) > m) ? a : m;
  }
  return m;
}


init();
render();