"use client";
import usePublisher from "@/hooks/backend/usePublisher";
import React from "react";
import AdminPublisherDataDisplayer from "./AdminPublisherDataDisplayer";
import Line from "../shared/display/Line";

function AdminPublisherLoader({ id }) {
  const { loading, loadPublisher, setPublisher, publisher, error } =
    usePublisher(id);

  if (loading) {
    return <LoadingPublisher />;
  }

  if (error) {
    return <ErrorMessage message={error} onClick={loadPublisher} />;
  }
  return (
    <div>
      <AdminPublisherDataDisplayer
        publisher={publisher}
        setPublisher={setPublisher}
      />

      <Line />
    </div>
  );
}

function LoadingPublisher() {
  return (
    <h1 className="text-center animate-pulse text-gray-500 text-xl">
      Publisher Loading
    </h1>
  );
}

function ErrorMessage({ onClick = () => {}, message }) {
  return (
    <div className="text-center">
      <h2 className="text-red-600 text-2xl">Failed to Load</h2>
      {message && <p className="text-red-400">{message}</p>}
      <button
        className="py-1 px-2 bg-primary text-white mt-1 hover:opacity-95 duration-75"
        type="button"
        onClick={onClick}
      >
        Try Load Data Again.
      </button>
    </div>
  );
}

export default AdminPublisherLoader;
