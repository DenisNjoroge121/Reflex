export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  return decodeToken(token);
};

export const getUserRole = () => {
  const user = getUserFromToken();

  return user?.role || null;
};

export const isRider = () => {
  return getUserRole() === "Rider";
};

export const isDispatcher = () => {
  return getUserRole() === "Dispatcher";
};

export const isRetailer = () => {
  return getUserRole() === "Retailer";
};

export const getUserId = () => {
  const user = getUserFromToken();

  return user?.userId || null;
};