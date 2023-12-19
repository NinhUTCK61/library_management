import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type AppPropType = {
  dataUpdate: any[];
  setDataUpdate: Dispatch<SetStateAction<any[]>>;
  handleDataUpdate: (data: any[]) => void;
} | null;

const AppContext = createContext<AppPropType>(null);
// new line custom hook

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return { ...context };
};

export default function AppProvider({ children }: { children: ReactNode }) {
  const [dataUpdate, setDataUpdate] = useState<any[]>([]);
  const handleDataUpdate = (data: any[]) => {
    setDataUpdate([...dataUpdate.concat(data)]);
  };

  return (
    <AppContext.Provider
      value={{ dataUpdate, setDataUpdate, handleDataUpdate }}
    >
      {children}
    </AppContext.Provider>
  );
}
