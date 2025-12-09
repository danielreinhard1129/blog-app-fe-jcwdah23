"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Blog } from "@/types/blog";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedValue] = useDebounceValue(search, 500);

  const { data: blogs, isPending } = useQuery({
    queryKey: ["blogs", page, debouncedValue],
    queryFn: async () => {
      const blogs = await axiosInstance.get<PageableResponse<Blog>>("/blogs", {
        params: { page, search: debouncedValue },
      });
      return blogs.data;
    },
  });

  const onClickPagination = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div className="mb-16 flex justify-center">
        <Input
          placeholder="Search..."
          className="max-w-xl"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <div className="container mx-auto grid grid-cols-3 gap-8 p-4">
        {isPending && (
          <div className="col-span-3 my-16 text-center">
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        )}

        {blogs?.data.map((blog) => {
          return <BlogCard key={blog.id} blog={blog} />;
        })}
      </div>

      {blogs?.meta && (
        <PaginationSection meta={blogs.meta} onClick={onClickPagination} />
      )}
    </>
  );
};

export default BlogList;
