export const time = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
};

export const greet = () => {
  let date = new Date();
  let hours = date.getHours();

  if (hours < 12) return "Good Morning!";
  else if (hours >= 12 && hours <= 17) return "Good Afternoon!";
  else return "Good Evening!";
};
