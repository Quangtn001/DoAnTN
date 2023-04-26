import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";
import { Link } from "react-router-dom";
// import { BiEdit } from "react-icons/bi";
// import { BsFillTrash3Fill } from "react-icons/bs";
import { BiEdit, BiTrash } from "react-icons/bi";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productsData = useSelector((state) => state.product.products);
  const data = [];
  for (let i = 0; i < productsData.length; i++) {
    data.push({
      key: i + 1,
      title: productsData[i].title,
      category: productsData[i].category,
      price: `${productsData[i].price}`,
      action: (
        <>
          <Link className=" fs-4">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-4 text-danger">
            <BiTrash />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data} />;
      </div>
    </div>
  );
};

export default ProductList;
