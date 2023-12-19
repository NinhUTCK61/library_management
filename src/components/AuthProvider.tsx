import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type AuthPropType = {
  user: any;
  setUser: Dispatch<SetStateAction<null>>;
} | null;

const AuthContext = createContext<AuthPropType>(null);
// new line custom hook

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return { ...context };
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
