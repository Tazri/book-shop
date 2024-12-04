"use client";
import { getSingleCategoryApi } from "@/api/frontend/category";
import { useEffect, useState } from "react";
import AdminSingleCategoryEdit from "./AdminSingleCategoryEdit";
import AdminSingleCatgoryDisplay from "./AdminSingleCatgoryDisplay";
import AdmingSingleCategoryImgDisplay from "./AdmingSingleCategoryImgDisplay";
import Line from "../shared/display/Line";
import AdminSingleCategoryUpdateImg from "./AdminSingleCategoryUpdateImg";
import AdminSingleCategoryDelete from "./AdminSingleCategoryDelete";

function AdminSingleCategoryLoad({ id }) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isImgEdit, setIsImgEdit] = useState(false);

  async function loadCategory() {
    setLoading(true);
    setError(null);
    setCategory(null);
    try {
      const response = await getSingleCategoryApi(id);
      const status = response.status;
      const json = await response.json();

      if (status === 400) {
        setError(json.msg);
      } else if (status === 404) {
        setError(json.msg);
      } else if (status === 200) {
        setCategory(json.category);
        setError(null);
      } else {
        setError("Something went wrong. Check your internet connection.");
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <h3 className="text-xl text-center text-gray-700 uppercase animate-pulse">
        Category is loading
      </h3>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-2xl text-center text-red-500 uppercase">
          Category failed to load
        </h3>
        <p className="text-lg my-1 text-gray-700">Reason : {error}</p>

        <button
          disabled={loading}
          onClick={loadCategory}
          className="bg-primary text-white py-1 px-3 text-xl mt-2 rounded-sm"
        >
          Try to Load Again
        </button>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center">
        <h3 className="text-2xl text-center text-gray-700 uppercase">
          Category Not Loaded Yet
        </h3>

        <button
          disabled={loading}
          onClick={loadCategory}
          className="bg-primary text-white py-1 px-3 text-xl mt-2 rounded-sm"
        >
          Load Category
        </button>
      </div>
    );
  }

  return (
    <>
      {isEdit ? (
        <AdminSingleCategoryEdit
          category={category}
          cancel={() => setIsEdit(false)}
          setCategory={setCategory}
        />
      ) : (
        <AdminSingleCatgoryDisplay
          category={category}
          edit={() => setIsEdit(true)}
        />
      )}
      <Line />
      {isImgEdit ? (
        <AdminSingleCategoryUpdateImg
          category={category}
          setCategory={setCategory}
          cancel={() => setIsImgEdit(false)}
        />
      ) : (
        <AdmingSingleCategoryImgDisplay
          updateButton={() => setIsImgEdit(true)}
          category={category}
        />
      )}
      <Line />
      <AdminSingleCategoryDelete category={category} />
    </>
  );
}

export default AdminSingleCategoryLoad;
