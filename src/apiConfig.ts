const getApiUrl = (): string => {
  return process.env.REACT_APP_API_URL || "http://localhost:5001";
};

export default getApiUrl;
