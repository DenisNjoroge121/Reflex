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

export const getStoredUser = () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    return null;
  }
};

export const getUserRole = () => {
  const user = getUserFromToken();
  return user?.role || null;
};

export const getUserId = () => {
  const user = getUserFromToken();
  return user?.userId || null;
};

export const getFirstName = () => {
  const user = getStoredUser();

  if (!user?.full_name) return "";

  return user.full_name.trim().split(" ")[0];
};

export const getLastName = () => {
  const user = getStoredUser();

  if (!user?.full_name) return "";

  const names = user.full_name.trim().split(" ");

  return names.length > 1 ? names.slice(1).join(" ") : "";
};

export const isRider = () => getUserRole() === "Rider";

export const isDispatcher = () => getUserRole() === "Dispatcher";

export const isRetailer = () => getUserRole() === "Retailer";