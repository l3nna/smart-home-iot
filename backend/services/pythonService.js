const { exec } = require("child_process");

function runPython(command) {
  return new Promise((resolve, reject) => {
    exec(`python3 ../hardware/main.py ${command}`, (err, stdout, stderr) => {
      if (err) {
        console.error("Error:", err);
        reject(err);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

module.exports = { runPython };