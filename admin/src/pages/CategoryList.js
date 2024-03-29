import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  deleteACategory,
  getCategories,
  resetState,
} from "../features/category/categorySlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
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

const CategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const categoryData = useSelector((state) => state.category.categories);

  const data = [];
  for (let i = 0; i < categoryData.length; i++) {
    data.push({
      key: i + 1,
      name: categoryData[i].title,
      date: new Date(categoryData[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to={`/admin/category/${categoryData[i]._id}`} className=" fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(categoryData[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = async (e) => {
    try {
      await dispatch(deleteACategory(e));
      setOpen(false);
      dispatch(getCategories());
      toast.success("🦄 Delete category successfully!");
    } catch (error) {
      // Xử lý lỗi
      console.log(error);
      toast.error("🦄 Delete category failed!");
    }
  };

  return (
    <div>
      <h3 className="mb-4">CategoryList</h3>
      <div>
        <Table columns={columns} dataSource={data} />;
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(categoryId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default CategoryList;
