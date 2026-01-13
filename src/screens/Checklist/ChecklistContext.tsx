// context/ChecklistContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Checklist } from "../types/Checklist";

type ChecklistContextType = {
  checklists: Checklist[];
  addChecklist: (checklist: Checklist) => void;
};

const ChecklistContext = createContext<ChecklistContextType | null>(null);

export const ChecklistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [checklists, setChecklists] = useState<Checklist[]>([]);

  const addChecklist = (checklist: Checklist) => {
    setChecklists((prev) => [...prev, checklist]);
  };

  return (
    <ChecklistContext.Provider value={{ checklists, addChecklist }}>
      {children}
    </ChecklistContext.Provider>
  );
};

export const useChecklist = () => {
  const context = useContext(ChecklistContext);
  if (!context) {
    throw new Error("useChecklist must be used inside ChecklistProvider");
  }
  return context;
};
