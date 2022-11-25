export function hoursToDurationString(hours) {
    const hour = Math.floor(hours);
    const minutes = (hours * 60) % 60;

    return `${hour}h ${minutes}m`;
}