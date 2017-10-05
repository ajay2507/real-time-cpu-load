const os = require('os');

const cpuAverage = () => {
    console.log("cpu load");
    // getting all the cpu cores
    const cpus = os.cpus();
    console.log(cpus);
    let totalIdle = 0, totalTick = 0;
    // iterating through all cpu cores
    for (let i = 0, len = cpus.length; i < len; i++) {

        //Select CPU core
        let cpu = cpus[i];

        
        for (type in cpu.times) {
            totalTick += cpu.times[type];
        }

        //sum up the idle time
        totalIdle += cpu.times.idle;
    }
}

module.exports = cpuAverage;