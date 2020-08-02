import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import ChartWrapper from "./ChartWrapper";
import "./ModalComponent.css";

export default function CostumModal(props) {
  //   const [data, setData] = useState(null);

  //   const chartInfo = useSelector((state) => state.modalReducer.ChartInfo);
  const productName = useSelector((state) => state.modalReducer.productName);
  const percentile = useSelector((state) => state.modalReducer.percentile);
  //   console.log(percentile);

  return (
    <Modal
      dialogClassName="modal-size"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Product: {productName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChartWrapper percentile={percentile}></ChartWrapper>
      </Modal.Body>
    </Modal>
  );
}
