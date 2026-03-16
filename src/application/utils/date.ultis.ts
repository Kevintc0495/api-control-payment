export const formateDate = (date?: Date) => {
  const createdAt = new Date(date || "");
  const day = createdAt.getDate().toString().padStart(2, "0");
  const month = (createdAt.getMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0-11
  const year = createdAt.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getDateToday = () => {
  const limaTimeZone = "America/Lima";
  const today = new Date().toLocaleString("en-US", { timeZone: limaTimeZone });
  const limaDate = new Date(today);
  return limaDate.toISOString().split("T")[0];
};

export const getHour = (date?: Date) => {
  const utcDate = new Date(date || "");

  const offsetMilliseconds = -5 * 60 * 60 * 1000;
  const localDate = new Date(utcDate.getTime() + offsetMilliseconds);

  const hours = localDate.getUTCHours().toString().padStart(2, "0");
  const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
