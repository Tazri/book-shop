"use server";

import { redirect } from "next/navigation";
import { URLSearchParams } from "url";

export async function topSearchAction(formData) {
  console.log(Object.fromEntries(formData.entries()));
}

export async function authorsSearchAction(formData) {
  const queryObj = new URLSearchParams();

  const searchData = formData.get("search");

  const searchQuery = searchData
    ?.trim()
    ?.toLowerCase()
    ?.split(" ")
    ?.filter((char) => char)
    ?.join(" ");

  if (!searchQuery) {
    return redirect("/authors");
  }

  queryObj.delete("search");
  queryObj.set("search", searchQuery);

  return redirect("/authors?" + queryObj.toString());
}

export async function publishersSearchAction(formData) {
  const queryObj = new URLSearchParams();

  const searchData = formData.get("search");

  const searchQuery = searchData
    ?.trim()
    ?.toLowerCase()
    ?.split(" ")
    ?.filter((char) => char)
    ?.join(" ");

  if (!searchQuery) {
    return redirect("/publishers");
  }

  queryObj.delete("search");
  queryObj.set("search", searchQuery);

  return redirect("/publishers?" + queryObj.toString());
}
