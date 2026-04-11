const { exec } = require("child_process");

function runPython(command) {
    return new Promise((resolve, reject) => {
        exec('python ../hardware/main.py ${command}', (error, stdout, stderr) => {
             if (err) {
        console.error("Error:", err);
        reject(err);
            }
            else {
                resolve(stdout);
            } });
    });
}

module.exports = { runPython };