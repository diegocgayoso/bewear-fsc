const CategoryList = () => {
  const categories = [
    "T-shirts",
    "Pants",
    "Shoes",
    "Accessories",
    "Shorts",
    "Jackets and sweatshirts",
  ];

  return (
    <>
      <div className="m-4 rounded-2xl bg-[#F4EFFF] p-4">
        <ul className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <li key={category} className="text-xs text-center font-semibold bg-white py-2 px-4 max-h-10  max-w-[148.5px] rounded-2xl flex-1/2 flex items-center justify-center">
              {category}
            </li>
          ))}
        </ul>   
      </div>
    </>
  );
};

export default CategoryList;
