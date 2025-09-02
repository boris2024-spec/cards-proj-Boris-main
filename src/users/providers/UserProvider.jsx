import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getToken, getUser } from "../services/localStorageService";
import { buildApiUrl } from "../services/userApiServicece";
import axios from "axios";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());

  // Function to get user by id and token
  const fetchUserById = async (userId, token) => {
    try {
      const response = await axios.get(
        buildApiUrl(`users/${userId}`),
        {
          headers: {
            "x-auth-token": token
          }
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error getting user:", error.response?.data || error.message);
      setUser(null);
    }
  };

  useEffect(() => {
    // If token and userId exist, fetch fresh user data
    if (token) {
      const decoded = getUser();
      if (decoded && decoded._id) {
        fetchUserById(decoded._id, token);
      }
    }
    // If no token, reset user
    if (!token) {
      setUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within provider");
  }

  return context;
};
