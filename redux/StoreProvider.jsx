"use client";
import { useRef } from "react";
import { makeStore } from "./store";
import { Provider } from "react-redux";

function StoreProvider({ children }) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
