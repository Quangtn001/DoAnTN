import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
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
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Created At",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderData = useSelector((state) => state.auth.orders);
  const data = [];
  for (let i = 0; i < orderData.length; i++) {
    data.push({
      key: i + 1,
      name:
        orderData[i].orderby.firstname + " " + orderData[i].orderby.lastname,
      product: orderData[i].products?.map((i) => {
        return (
          <ul key={i.product._id}>
            <li>{i.product.title}</li>
          </ul>
        );
      }),
      amount: orderData[i].paymentIntent.amount,
      date: new Date(orderData[i].createdAt).toLocaleString(),
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
      <h3 className="mb-4">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />;
      </div>
    </div>
  );
};

export default Order;
