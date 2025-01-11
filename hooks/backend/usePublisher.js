"use client";

import { getSinglePublisherApi } from "@/api/frontend/publishers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function usePublisher(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publisher, setPublisher] = useState(null);

  async function loadPublisher() {
    if (loading) return;
    setLoading(true);
    setError(null);
    toast.dismiss();
    try {
      const response = await getSinglePublisherApi(id);

      if (response === null) {
        setError("Something went wrong...");
        toast.error("Failed to load");
      } else {
        const status = response.status;
        const json = await response.json();

        if (status === 400 || status === 404) {
          setError(json?.msg);
          toast.error("Failed to load.");
        } else if (status !== 200) {
          setError("Something went wrong.");
          toast.error("Failed to load.");
        } else {
          setPublisher(json?.publisher);
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
      loadPublisher();
    }, 10);

    return () => {
      clearTimeout(timeOutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    publisher,
    setPublisher,
    loadPublisher,
  };
}
