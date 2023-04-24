import React from "react";
import Chart from "../components/Chart";
import TableOrder from "../components/TableOrder";

const Dashboard = () => {
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-4 ">
              <div>
                <p className="mb-0">Total</p>
                <h4 className="mb-0">$1000</h4>
              </div>
              <div className="d-flex flex-column align-items-end">
                <h6>32%</h6>
                <p className="mb-0">Compared To April 2023</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3 ">
            <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-4 ">
              <div>
                <p className="mb-0">Total</p>
                <h4 className="mb-0">$1000</h4>
              </div>
              <div className="d-flex flex-column align-items-end">
                <h6>32%</h6>
                <p className="mb-0">Compared To April 2023</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-4">
              <div>
                <p className="mb-0">Total</p>
                <h4 className="mb-0">$1000</h4>
              </div>
              <div className="d-flex flex-column align-items-end">
                <h6>32%</h6>
                <p className="mb-0">Compared To April 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-md-flex justify-content-between align-items-center gap-3 flex-column flex-md-row">
        <div className="mt-4 flex-grow-1">
          <h3 className="mb-4">Income Statics</h3>
          <div>
            <Chart />
          </div>
        </div>
        <div className="mt-4 flex-grow-1">
          <h3 className="mb-4">Recent Orders</h3>
          <div className="table-responsive">
            <TableOrder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
