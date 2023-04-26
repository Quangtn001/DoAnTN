import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../features/Enquiry/enquirySlice";
import { toast } from "react-toastify";

const ViewEnq = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getEnqId = location.pathname.split("/")[3];
  const EnqData = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = EnqData;

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId, dispatch]);

  const goBack = () => {
    navigate(-1);
  };
  const setEquiryStatus = async (e, i) => {
    const data = { id: i, enqData: e };
    try {
      await dispatch(updateAEnquiry(data));
      dispatch(getAEnquiry(getEnqId));
      dispatch(resetState());
      toast.success("🦄 Changed status successfully!");
    } catch (error) {
      console.log(error);
      toast.error("🦄 Changed status failed!");
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">View Enquiry</h3>
            <button className="btn btn-danger h-50" onClick={goBack}>
              <i className="bi bi-arrow-left"></i> Go back
            </button>
          </div>
          <div className="bg-white p-4 rounded-3">
            <div className="mb-3">
              <h5 className="mb-0">Name:</h5>
              <p className="mb-0">{enqName}</p>
            </div>
            <div className="mb-3">
              <h5 className="mb-0">Mobile:</h5>
              <p className="mb-0">{enqMobile}</p>
            </div>
            <div className="mb-3">
              <h5 className="mb-0">Email:</h5>
              <p className="mb-0">{enqEmail}</p>
            </div>
            <div className="mb-3">
              <h5 className="mb-0">Comment:</h5>
              <p className="mb-0">{enqComment}</p>
            </div>
            <div className="mb-3">
              <h5 className="mb-0">Status:</h5>
              <p className="mb-0">{enqStatus}</p>
            </div>
            <div className="mb-3">
              <h5 className="mb-0">Change status:</h5>
              <div className="d-flex align-items-center">
                <select
                  className="form-select"
                  value={enqStatus ? enqStatus : "Submitted"}
                  onChange={(e) => setEquiryStatus(e.target.value, getEnqId)}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
