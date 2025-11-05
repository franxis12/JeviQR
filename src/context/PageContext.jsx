import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export function PageContextProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("/");
  const [tap, setTap] = useState("editor");

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, tap, setTap }}>
      {children}
    </PageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePage() {
  return useContext(PageContext);
}
