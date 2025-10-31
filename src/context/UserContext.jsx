import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../auth/supabaseClient";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for session changes (login, logout, refresh)
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    // Fetch the current session on mount
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Convenience hook to access the user context
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
