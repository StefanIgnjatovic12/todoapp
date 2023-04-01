export const readJsonData = (key) => {
  try {
    const fileContents = localStorage.getItem(key);
    return JSON.parse(fileContents);
  } catch (err) {
    return undefined;
  }
};

export const writeJsonData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data, null, 2));
};
