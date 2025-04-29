import React, { useCallback, useEffect, useState } from "react";

import { CartSkeleton, CategorySlekeloton } from "@/components/skeleton";
import { publicRequest } from "@/config/axios.config";
import Cart from "@/components/cart";
import HomeModal from "@/components/homeModal";
import { FaChevronDown } from "react-icons/fa";
const RegulerMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [regulerFood, setRegulerFood] = useState([]);
  const [regLoading, setRegLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");
  const [categoryLoading, setcategoryLoading] = useState(true);
  const handleModal = async (id) => {
    setModal(true); // Open modal immediately

    try {
      const res = await publicRequest.get(`cook/${id}`);
      setDetail(res?.data?.data);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };
  console.log(categories);
  const handleCategoryChange = async (id, name) => {
    setSelectedItem(name);

    setRegLoading(true);
    try {
      const res = await publicRequest.get(`category/${id}?page=${currentPage}`);
      if (res.status === 200) {
        setRegulerFood(res?.data?.data?.cooks || []);
        setCurrentPage(res?.data?.data?.pagination?.current_page);
        console.log(res?.data?.data?.pagination?.current_page);
        setLastPage(res?.data?.data?.pagination?.last_page);
        setRegLoading(false);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
    setSelectedCategory(id);
  };
  const fetchCategories = useCallback(async () => {
    setcategoryLoading(true);
    try {
      const res = await publicRequest.get("category");
      if (res.status === 200) {
        setCategories(res?.data?.data);
        console.log(res?.data?.data);
        setcategoryLoading(true);
      }
    } catch (error) {}
  }, []);

  // Fetch detail=====================================================
  const fetchFood = useCallback(async () => {
    setRegLoading(true);
    try {
      const res = await publicRequest.get(`cook?page=${currentPage}`);
      if (res.status === 200) {
        console.log(res?.data?.data?.data);
        setRegulerFood(res?.data?.data?.data);
        setCurrentPage(res?.data?.data?.current_page);
        setLastPage(res?.data?.data?.last_page);
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
    } finally {
      setRegLoading(false);
    }
  }, [currentPage]);

  const closeModal = () => {
    setModal(false);
    setDetail([]);
  };

  useEffect(() => {
    fetchFood();
    fetchCategories();
  }, [fetchFood]);
  return (
    <main>
      <section className="container-custom ">
        <div className="flex justify-between relative items-center">
          <h1 className="text-2xl md:text-4xl font-bold font-bubblegum lg:w-full md:text-center py-5 w-3/5">
            Our Reguler Menu Pack
          </h1>
          <div className="md:hidden absolute top-3 right-0 z-10">
            <button
              className="font-bubblegum border border-primary flex items-center justify-between gap-2 px-5 py-2 rounded-full hover:bg-primary w-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              {selectedItem} <FaChevronDown />
            </button>

            {dropdownOpen && (
              <div
                className="mt-2 border border-primary rounded-lg shadow-lg bg-white"
                role="listbox"
                aria-labelledby="dropdown-button"
              >
                {categories?.map((category, index) => (
                  <button
                    key={category?.category_id || index}
                    id={`category-${category?.category_id}`} // Unique ID for accessibility
                    className={`block w-full text-left font-bubblegum border-b last:border-none border-gray-300 px-5 py-2 hover:bg-primary ${
                      selectedCategory === category?.category_id
                        ? "bg-primary text-white"
                        : ""
                    }`}
                    role="option"
                    aria-selected={selectedCategory === category?.category_id}
                    onClick={() => {
                      handleCategoryChange(
                        category?.category_id,
                        category?.category_name
                      );
                      setDropdownOpen(false); // Close dropdown after selection
                    }}
                  >
                    {category?.category_name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="py-5">
          {/* Regular buttons for larger screens */}
          {categoryLoading ? (
            <div className="hidden md:flex justify-center gap-2 ">
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  fetchFood();
                }}
                className={`font-bubblegum border border-primary px-5 py-2 rounded-full 
      ${
        selectedCategory === "All"
          ? "bg-primary text-white"
          : "hover:bg-primary"
      }
    `}
              >
                All
              </button>

              {categories?.map((category) => (
                <button
                  onClick={() => handleCategoryChange(category?.category_id)}
                  key={category?.category_id}
                  className={`font-bubblegum border border-primary px-5 py-2 rounded-full hover:bg-primary ${
                    selectedCategory == category?.category_id
                      ? "bg-primary"
                      : ""
                  }`}
                >
                  {category?.category_name}
                </button>
              ))}
            </div>
          ) : (
            <CategorySlekeloton />
          )}
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-5 gap-3">
          {regLoading ? (
            // Skeleton Loader
            Array.from({ length: 5 }).map((_, index) => (
              <CartSkeleton key={index} />
            ))
          ) : regulerFood?.length > 0 ? (
            regulerFood.map((item, index) => (
              <Cart key={index} handleModal={handleModal} food={item} />
            ))
          ) : (
            <p className="text-lg text-center font-semibold col-span-full">
              Not Available
            </p>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition 
        ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
            >
              Previous
            </button>

            <span className="px-4 py-2 text-sm font-medium text-gray-700">
              {currentPage} / {lastPage}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, lastPage))
              }
              disabled={currentPage === lastPage}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition 
        ${
          currentPage === lastPage
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      {modal && <HomeModal detail={detail} closeModal={closeModal} />}
    </main>
  );
};

export default RegulerMenu;
