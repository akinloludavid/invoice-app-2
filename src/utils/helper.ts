export const getRandomId = (): string => {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const randomLetters =
    characters[Math.floor(Math.random() * characters.length - 1)] +
    characters[Math.floor(Math.random() * characters.length - 1)];
  let randomNumber = Math.floor(Math.random() * 10000);

  return randomLetters + String(randomNumber);
};

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
