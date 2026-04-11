import { useEffect } from "react";

function ParticleBackground() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    const colors = [
      "#00fffc",
      "#00fff0",
      "#068ec7",
      "#ecaa14",
      "#f91717",
      "#f611ae",
      "#11f639",
      "#088592",
      "#46aff3",
    ];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleMouseMove = (e) => {
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.update();
        p.draw();

        if (p.opacity <= 0) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}

export default ParticleBackground;