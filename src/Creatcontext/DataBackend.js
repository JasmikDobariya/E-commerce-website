import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);

        try {
          const response = await fetch(
            `http://localhost:5000/user/userdetiles`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUser(data.userData);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.log("userDetails Error", error);
        }
      }
    };

    checkAuthStatus();
  }, []);

 

  useEffect(() => {
    const getProductDataMongo = async () => {
      await fetch(`http://localhost:5000/user/productshow`)
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
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, products }}
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
