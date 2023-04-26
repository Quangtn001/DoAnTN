import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from "../features/Enquiry/enquirySlice";
import { BiTrash } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
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
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },

  {
    title: "Status",
    dataIndex: "status",
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

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState();
  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);
  const enquiryData = useSelector((state) => state.enquiry.enquiries);
  const data = [];
  for (let i = 0; i < enquiryData.length; i++) {
    data.push({
      key: i + 1,
      name: enquiryData[i].name,
      email: enquiryData[i].email,
      mobile: enquiryData[i].mobile,
      status: (
        <>
          <select
            className="form-select"
            defaultValue={
              enquiryData[i].status ? enquiryData[i].status : "Submitted"
            }
            onChange={(e) =>
              setEquiryStatus(e.target.value, enquiryData[i]._id)
            }
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),

      date: enquiryData[i].createdAt,
      action: (
        <>
          <Link
            to={`/admin/enquiries/${enquiryData[i]._id}`}
            className="ms-3 fs-4 text-black"
          >
            <AiFillEye />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiryData[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }
  const setEquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    toast.success("🦄 Changed status successfully!");
  };
  const deleteEnq = async (e) => {
    try {
      await dispatch(deleteAEnquiry(e));
      setOpen(false);
      dispatch(getEnquiries());
      toast.success("🦄 Delete Enquiry successfully!");
    } catch (error) {
      // Xử lý lỗi
      console.log(error);
      toast.error("🦄 Delete Enquiry failed!");
    }
  };
  return (
    <div>
      <h3 className="mb-4">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data} />;
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enquiryId);
        }}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
