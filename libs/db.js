import { Model } from "mongoose";

/**
 *
 * @param {Model} model
 * @param {string} searchText
 * @param {number} perPage
 * @returns {{totalDocuments:string,totalPages:string}}
 */
export async function totalDocumentsAndPage(
  model,
  searchText = "",
  perPage = 5
) {
  const totalDocuments = await model.countDocuments({
    name: { $regex: searchText, $options: "i" },
  });
  const totalPages = Math.ceil(totalDocuments / perPage);

  return { totalDocuments, totalPages };
}
