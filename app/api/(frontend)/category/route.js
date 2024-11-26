import connectDB from "@/database/connectDB";
import { CategoryModel } from "@/database/models";
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
    // connect with db
    await connectDB();
    const url = new URL(req.url);

    const searchParams = url.searchParams;
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const paramsPage = parseInt(searchParams.get("page"));
    const paramsPerPage = parseInt(searchParams.get("perPage"));
    const selectObject = {
      _id: true,
      name: true,
      description: true,
      imgUrl: true,
      totalBooks: true,
    };
    const checkPerPage = paramsPerPage > 0 ? paramsPerPage : null;

    if (!checkPerPage) {
      const allCategory = await CategoryModel.find().select(selectObject);

      return NextResponse.json({
        categories: allCategory,
        totalCategory: allCategory.length,
      });
    }

    const perPage = Number.isInteger(checkPerPage) ? checkPerPage : 5;
    const totalCategory = await CategoryModel.countDocuments();
    const page = paramsPage > 0 ? paramsPage : 1;
    const totalPage = Math.ceil(totalCategory / perPage);

    // if out of page.
    if (page > totalPage) {
      return NextResponse.json(
        {
          msg: "Out of page.",
          categories: [],
          totalCategory,
          pagination: {
            perPage,
            activePage: page,
            totalPage,
            totalCategory: totalCategory,
            links: [],
            firstPage: baseURL + `/api/category?perPage=${perPage}&page=${1}`,
            lastPage:
              baseURL + `/api/category?perPage=${perPage}&page=${totalPage}`,
          },
        },
        {
          status: 200,
        }
      );
    }

    // get pagination links
    const links = generatePaginationLinks(page, totalPage, perPage);

    // get all category
    const categories = await CategoryModel.find({})
      .skip(perPage * (page - 1))
      .limit(perPage)
      .select(selectObject);

    return NextResponse.json(
      {
        msg: "Your all category",
        categories,
        totalCategory,
        pagination: {
          activePage: page,
          perPage: perPage,
          totalPage,
          totalCategory,
          links,
          firstPage: baseURL + `/api/category?perPage=${perPage}&page=${1}`,
          lastPage:
            baseURL + `/api/category?perPage=${perPage}&page=${totalPage}`,
        },
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err.message);

    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}

function generatePaginationLinks(activePage, totalPage, perPage) {
  const paginationArr = getPagination(totalPage, activePage, 1);
  const searchParams = new URLSearchParams();
  searchParams.set("perPage", perPage);
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
      link: baseURL + "/api/category?" + queryStr,
    };
    links.push(link);
  }

  return links;
}
