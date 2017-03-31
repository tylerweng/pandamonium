window.human = false;

let canvasEl = document.getElementById('fireworks');
let ctx = canvasEl.getContext('2d');
let numberOfParticles = 30;
let tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
let colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
let pointerX = 0;
let pointerY = 0;

canvasEl.width = 800;
canvasEl.height = 800;
canvasEl.style.width = 800;
canvasEl.style.height = 800;
canvasEl.getContext('2d').scale(2, 2);

function setParticleDirection(p) {
  let angle = anime.random(0, 360) * Math.PI / 180;
  let value = anime.random(50, 180);
  let radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function updatePointer(e) {
  console.log(e);
  pointerX = e.layerX;
  pointerY = e.layerY;
}

function createParticle(x,y) {
  let p = {};
  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = anime.random(6, 12);
  p.endPos = setParticleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  return p;
}

function createCircle(x, y) {
  let p = {};
  p.x = x;
  p.y = y;
  p.color = '#FFF';
  p.radius = 0.1;
  p.alpha = .5;
  p.lineWidth = 6;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  return p;
}

function renderParticle(anim) {
  for (let i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

function animateParticles(x, y) {
  let circle = createCircle(x, y);
  let particles = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(createParticle(x, y));
  }
  anime.timeline().add({
    targets: particles,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticle
  })
    .add({
    targets: circle,
    radius: anime.random(80, 160),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: anime.random(600, 800),
    },
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticle,
    offset: 0
  });
}

let render = anime({
  duration: Infinity,
  update: function() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }
});

document.addEventListener(tap, function(e) {
  updatePointer(e);
  animateParticles(pointerX / 2, pointerY / 2);
}, false);
