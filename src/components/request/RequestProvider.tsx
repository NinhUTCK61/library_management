import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type RequestPropType = {
  requestForm: any;
  setRequestForm: Dispatch<SetStateAction<null>>;

  bookIds: any[];
  handleBookIds: (bookIds: any[]) => void;

  requests: any[];
  setRequests: Dispatch<SetStateAction<any[]>>;

  title: string;
  setTitle: Dispatch<SetStateAction<string>>;

  selectRequest: any;
  handleSelectRequest: (selectRequest: any[]) => void;
} | null;

const RequestContext = createContext<RequestPropType>(null);
// new line custom hook

export const useRequestContext = () => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return { ...context };
};

export default function RequestProvider({ children }: { children: ReactNode }) {
  const [requestForm, setRequestForm] = useState(null);
  const [bookIds, setBookIds] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [requests, setRequests] = useState<any[]>([]);
  const [selectRequest, setSelectRequest] = useState<any[]>([]);

  const handleBookIds = useCallback((bookIds: any[]) => {
    setBookIds(bookIds);
  }, []);

  const handleSelectRequest = useCallback((selectRequest: any[]) => {
    setSelectRequest(selectRequest);
  }, []);
  return (
    <RequestContext.Provider
      value={{
        requestForm,
        setRequestForm,
        bookIds,
        handleBookIds,
        title,
        setTitle,
        requests,
        setRequests,
        selectRequest,
        handleSelectRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}
