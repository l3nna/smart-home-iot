const { exec } = require("child_process");
function runPython(command) {
    return new Promise((resolve, reject) => {
        exec('python ../hardware/main.py ${command}', (error, stdout) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(stdout);
            } });
    });
}

module.exports = { runPython };