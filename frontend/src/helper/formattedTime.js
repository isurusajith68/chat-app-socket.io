export const formattedTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
}