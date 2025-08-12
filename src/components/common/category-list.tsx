import { db } from "@/db";
import Link from "next/link";

const CategoryList = async () => {
  const categories = await db.query.categoryTable.findMany();

  return (
    <>
      <div className="m-4 rounded-2xl bg-[#F4EFFF] p-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex max-h-10 max-w-[148.5px] flex-1/2 items-center justify-center rounded-2xl bg-white px-4 py-2 text-center text-xs font-semibold"
            >
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
