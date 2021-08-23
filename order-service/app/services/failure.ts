import config from "../config"

export type CallbackFunction = (success: boolean, delay: number) => void

export const badQuantityFunction = (callback: CallbackFunction) => {
    const delay = randomIntFromInterval(0, config.maxDelaySec);
    const randomFactor = Math.random();

    setTimeout(() => {
        callback(!(randomFactor <= config.failureFactor), delay);
    }, delay * 1000);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}