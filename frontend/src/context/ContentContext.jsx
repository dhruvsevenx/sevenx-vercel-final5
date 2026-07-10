import React, { createContext, useContext } from "react";
import * as indiaMock from "../mock/mock";
import * as globalMock from "../mock/mockGlobal";

const ContentContext = createContext({ ...indiaMock, region: "india" });

export function ContentProvider({ region = "india", children }) {
  const value = region === "global"
    ? { ...globalMock, region: "global" }
    : { ...indiaMock, region: "india" };
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
