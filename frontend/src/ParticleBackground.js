import { useEffect } from "react";

class Particle {
  constructor(colors) {
    this.colors = colors;
    this.reset(0, 0, 0, 0);
  }

  reset(x, y, speedX = 0, speedY = 0) {
    this.x = x;
    this.y = y;

    this.size = Math.random() * 3 + 1.5;
    this.color = this.colors[(Math.random() * this.colors.length) | 0];

    this.speedX = speedX || (Math.random() - 0.5) * 1.5;
    this.speedY = speedY || (Math.random() - 0.5) * 1.5;

    this.life = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.02;
  }

  draw(ctx) {
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function ParticleBackground() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";

    document.body.appendChild(canvas);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      "#031989",
      "#010d3a",
      "#46aff3",
      "#114af6",
      "#045c82",
      "rgb(255, 255, 255)",
      "#878787",
      "#00355e",
      "#ff00aa"
    ];

    const MAX = 60;

    const particles = [];
    let index = 0;

    let mouseX = 0;
    let mouseY = 0;

    for (let i = 0; i < MAX; i++) {
      particles.push(new Particle(colors));
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      particles[index].reset(mouseX, mouseY);
      index = (index + 1) % MAX;
    };

    const handleClick = (e) => {
      const cx = e.clientX;
      const cy = e.clientY;

      const explosionCount = 15;

      for (let i = 0; i < explosionCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;

        const speedX = Math.cos(angle) * speed;
        const speedY = Math.sin(angle) * speed;

        particles[index].reset(cx, cy, speedX, speedY);
        index = (index + 1) % MAX;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.update();

      
        if (p.life <= 0) continue;

        p.draw(ctx);
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}

export default ParticleBackground;