import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineAccountCircle, MdContactless } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { BiAddToQueue } from "react-icons/bi";
import {
  BsFillGridFill,
  BsClipboardPlus,
  BsCardList,
  BsCartCheckFill,
} from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="logo text-white f">
          <h4 className="px-4">HOME DECOR.</h4>
        </div> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <MdOutlineAccountCircle className="fs-4" />,
              label: "Customers",
            },
            {
              key: "Catelog",
              icon: <BsFillGridFill className="fs-4" />,
              label: "Catelog",
              children: [
                {
                  key: "product",
                  icon: <BsClipboardPlus className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <BsCardList className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <BsCardList className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "Coupon",
              icon: <RiCoupon2Line className="fs-4" />,
              label: "Coupon",
              children: [
                {
                  key: "coupon",
                  icon: <BiAddToQueue className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <BsCardList className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "orders",
              icon: <BsCartCheckFill className="fs-4" />,
              label: "Orders",
            },
            {
              key: "enquiries",
              icon: <MdContactless className="fs-4" />,
              label: "Enquiry",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: "#001529" }}
          className="d-flex justify-content-between ps-3 pe-5"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "#fff",
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={40}
                  height={40}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                  className="rounded-circle"
                />
              </div>
              <div
                type="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="d-flex align-items-center gap-3"
              >
                <div>
                  <h5 className="text-white mb-0">Quang</h5>
                  <p className="mb-0 text-white ">quangtn001@gmail.com</p>
                </div>
                <div className="dropdown-toggle text-white "></div>
              </div>
              <div className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                  >
                    Sign Out
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
