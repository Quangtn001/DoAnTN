import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <div>
      {" "}
      <Modal
        title="Comfirmation"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>{title}</p>
      </Modal>
    </div>
  );
};

export default CustomModal;
