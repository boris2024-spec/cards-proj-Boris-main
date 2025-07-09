import { createContext, useContext } from "react";

//step 1: create the context
const MessageContext = createContext();

//step 2: create the provider
export default function MessageProvider({ children }) {
  const specialMessage = "SPECIAL";

  return (
    <MessageContext.Provider value={specialMessage}>
      {children}
    </MessageContext.Provider>
  );
}

//step 3: create custom hook for using the context (optional)

export const useSpecialMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("You used the message context out of the message provider");
  }
  return context;
};
