"use client";

import { getSingleAuthorApi } from "@/api/frontend/aturhos";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useAuthor(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState(null);

  async function loadAuthor() {
    setLoading(true);
    setError(null);
    toast.dismiss();
    try {
      const response = await getSingleAuthorApi(id);

      if (response === null) {
        setError("Something went wrong...");
        toast.error("Failed to load...");
      } else {
        const status = response.status;
        const json = await response.json();

        if (status === 400 || status === 404) {
          setError(json?.msg);
          toast.error("Failed to load.");
        } else if (status !== 200) {
          setError("Somethign went wrong.");
          toast.error("Failed to load.");
        } else {
          setAuthor(json?.author);
        }
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong.");
      setError("Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      loadAuthor();
    }, 10);

    return () => {
      clearTimeout(timeOutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    author,
    setAuthor,
    loadAuthor,
  };
}
