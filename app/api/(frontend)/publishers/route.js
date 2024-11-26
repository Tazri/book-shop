import connectDB from "@/database/connectDB";
import { PublisherModel } from "@/database/models";
import { totalDocumentsAndPage } from "@/libs/db";
import { getPagination } from "@/libs/lib";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const paramsPage = parseInt(searchParams.get("page"));
    const paramsPerPage = parseInt(searchParams.get("perPage"));
    const checkPerPage = paramsPerPage > 0 ? paramsPerPage : null;
    const searchText = searchParams.get("search") || "";

    if (!checkPerPage) {
      const allPublishers = await PublisherModel.find({
        name: { $regex: searchText, $options: "i" },
      });

      return NextResponse.json(
        {
          allPublishers: allPublishers,
          totalPublishers: allPublishers.length,
          searchText,
        },
        { status: 200 }
      );
    }

    const perPage = Number.isInteger(checkPerPage) ? checkPerPage : 5;
    const page = paramsPage > 0 ? paramsPage : 1;
    const allPublishers = await findPublisherBySearchText(
      searchText,
      page,
      perPage
    );
    const { totalDocuments: totalPublishers, totalPages } =
      await totalDocumentsAndPage(PublisherModel, searchText, perPage);

    const paginationLinks = generatePaginationLinks(
      page,
      totalPages,
      perPage,
      searchText
    );

    return NextResponse.json(
      {
        activePage: page,
        msg: "Success to get all",
        totalPublishers,
        allPublishers,
        totalPublishersInThisPage: allPublishers.length,
        searchText: searchText,
        pagination: {
          searchText,
          activePage: page,
          perPage: perPage,
          totalPages,
          totalPublishers,
          links: paginationLinks,
          firstPage: baseURL + `/api/publishers?perPage=${perPage}&page=${1}`,
          lastPage:
            baseURL + `/api/publishers?perPage=${perPage}&page=${totalPages}`,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);

    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}

async function findPublisherBySearchText(searchText, page = 1, perPage = 5) {
  try {
    const selectObject = {
      _id: true,
      name: true,
      description: true,
      imgUrl: true,
      totalBooks: true,
    };
    const publishers = await PublisherModel.find(
      {
        name: { $regex: searchText, $options: "i" },
      },
      selectObject
    )
      .skip((page - 1) * perPage)
      .limit(perPage);

    return publishers;
  } catch (error) {
    return null;
  }
}

function generatePaginationLinks(
  activePage,
  totalPage,
  perPage,
  searchText = ""
) {
  const paginationArr = getPagination(totalPage, activePage, 1);
  const searchParams = new URLSearchParams();
  searchParams.set("perPage", perPage);
  if (searchText) {
    searchParams.set("search", searchText);
  }
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const links = [];

  for (const pageNumber of paginationArr) {
    if (!Number.isInteger(pageNumber)) {
      links.push("...");
      continue;
    }

    searchParams.set("page", pageNumber);
    const queryStr = searchParams.toString();
    const link = {
      page: pageNumber,
      link: baseURL + "/api/authors?" + queryStr,
    };
    links.push(link);
  }

  return links;
}
