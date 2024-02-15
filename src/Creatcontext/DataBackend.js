import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(""); // Set initial user state to null
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Fetch user data after setting token
      fetchUserData(storedToken);
    }
  }, []);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
    // Fetch user data after setting token
    fetchUserData(serverToken);
  };

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`https://server-ecommerce-two.vercel.app/user/userdetiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.ok) {
        const data = await response.json();
        setUser(data?.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log("userDetails Error", error);
    }
  };

  const LogoutUser = () => {
    setToken("");
    setUser(""); 
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const getProductDataMongo = async () => {
      await fetch(`https://server-ecommerce-two.vercel.app/user/productshow`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    };
    getProductDataMongo();
  }, []);

  const isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedIn", isLoggedIn);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, products , fetchUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
