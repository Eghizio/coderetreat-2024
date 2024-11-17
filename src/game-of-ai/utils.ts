import { randomInt as cryptoRandomInt } from "node:crypto";

export const randomInt = (max: number = 300) => cryptoRandomInt(0, max);
