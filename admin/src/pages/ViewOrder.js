import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser } from "../features/auth/authSlice";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
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

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);
  const orderData = useSelector((state) => state.auth.orderbyuser.products);
  console.log(orderData);
  const data = [];
  for (let i = 0; i < orderData.length; i++) {
    data.push({
      key: i + 1,
      name: orderData[i].product.title,
      name: orderData[i].product.title,

      //   amount: orderData[i].paymentIntent.amount,
      //   date: new Date(orderData[i].createdAt).toLocaleString(),
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
      <h3 className="mb-4">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;
