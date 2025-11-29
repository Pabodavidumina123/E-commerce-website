// Collection.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products = [], Search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value));
    } else {
      setSubCategory(prev => [...prev, value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = Array.isArray(products) ? [...products] : [];

    // search filter (only when search UI is active and there's a query)
    if (showSearch && Search) {
      productsCopy = productsCopy.filter(item =>
        item.name?.toLowerCase().includes(Search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    // work on a copy of current filtered products
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

      case 'relevant':
      default:
        // leave order as-is (re-run filters if needed)
        applyFilters();
        return;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory, Search, showSearch, products]);

  useEffect(() => {
    sortProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, filterProducts.length]); // re-run when sort type changes or new filtered list arrives

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter option */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category filter */}
        <div className={`border border-gray-300 p-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Men" onChange={toggleCategory} checked={category.includes('Men')} /> Men
            </label>

            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Women" onChange={toggleCategory} checked={category.includes('Women')} /> Women
            </label>

            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Kids" onChange={toggleCategory} checked={category.includes('Kids')} /> Kids
            </label>
          </div>
        </div>

        {/* Sub-Category filter */}
        <div className={`border border-gray-300 p-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Topwear" onChange={toggleSubCategory} checked={subCategory.includes('Topwear')} /> Topwear
            </label>

            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} checked={subCategory.includes('Bottomwear')} /> Bottomwear
            </label>

            <label className="flex gap-2 items-center">
              <input type="checkbox" value="Winterwear" onChange={toggleSubCategory} checked={subCategory.includes('Winterwear')} /> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTION" />

          {/* sort */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={item._id ?? index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
