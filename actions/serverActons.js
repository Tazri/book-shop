"use server";

export async function topSearchAction(formData) {
  console.log(Object.fromEntries([...formData.entries()]));
}
