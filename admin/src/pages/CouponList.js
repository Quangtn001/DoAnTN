import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  getCoupon,
  deleteACoupon,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Expiry Date",
    dataIndex: "date",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState();
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupon());
  }, [dispatch]);
  const couponData = useSelector((state) => state.coupon.coupons);
  const data = [];
  for (let i = 0; i < couponData.length; i++) {
    data.push({
      key: i + 1,
      name: couponData[i].name,
      date: new Date(couponData[i].expiry).toLocaleString(),
      discount: couponData[i].discount,
      action: (
        <>
          <Link to={`/admin/coupon/${couponData[i]._id}`} className=" fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(couponData[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = async (e) => {
    try {
      await dispatch(deleteACoupon(e));
      setOpen(false);
      dispatch(getCoupon());
      toast.success("🦄 Delete coupon successfully!");
    } catch (error) {
      // Xử lý lỗi
      console.log(error);
      toast.error("🦄 Delete coupon failed!");
    }
  };
  return (
    <div>
      <h3 className="mb-4">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data} />;
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(couponId);
        }}
        title="Are you sure you want to delete this coupon?"
      />
    </div>
  );
};

export default CouponList;
