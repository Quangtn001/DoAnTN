import React from "react";
import { Table } from "antd";
// import { BiEdit } from "react-icons/bi";
// import { BsFillTrash3Fill } from "react-icons/bs";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}
const ProductList = () => {
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
