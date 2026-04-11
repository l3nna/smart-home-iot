import { useEffect } from "react";

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
      "#00fffc",
      "#00fff0",
      "#46aff3",
      "#f611ae",
      "#ff3b3b",
      "#ffe600",
      "#7c4dff",
      "#00ff6a",
      "#ff7a00",
      "#ff00aa"
    ];

    const MAX = 30; // 🔥 LOWER = smoother

    let particles = [];
    let index = 0;

    let mouseX = 0;
    let mouseY = 0;

    class Particle {
      constructor() {
        this.reset(0, 0);
      }

      reset(x, y) {
        this.x = x;
        this.y = y;

        this.size = Math.random() * 3 + 1.5;

        this.color = colors[(Math.random() * colors.length) | 0];

        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;

        this.life = 1; // instead of opacity (FASTER)
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.life -= 0.02;
      }

      draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // pool
    for (let i = 0; i < MAX; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      particles[index].reset(mouseX, mouseY);
      index = (index + 1) % MAX;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // 🔥 IMPORTANT: reset alpha once per frame
      ctx.globalAlpha = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.update();

        if (p.life <= 0) {
          p.reset(mouseX, mouseY);
        }

        p.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}

export default ParticleBackground;