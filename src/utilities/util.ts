/*
    Method to generate randon 6 digit ID
*/
export function generateRandomID(): string {
    return String(Math.floor(100000 + Math.random() * 900000))
}