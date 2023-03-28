export const readJsonData = (key) => {
  try {
    const fileContents = localStorage.getItem(key);
    return JSON.parse(fileContents);
  } catch (err) {
    console.error(`Error reading JSON file ${key}:`, err);
    return undefined;
  }
};

export const writeJsonData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing JSON file ${key}:`, err);
  }
};
