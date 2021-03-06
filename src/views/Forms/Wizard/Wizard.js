import React from "react";
// react component used to create charts
import SweetAlert from "react-bootstrap-sweetalert";
// react component that creates a form divided into multiple steps
import ReactWizard from "react-bootstrap-wizard";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import Step1 from "./Step1.js";
import Step2 from "./Step2.js";
import Step3 from "./Step3.js";

const steps = [
  { stepName: "Product Type", component: Step1 },
  { stepName: "Product", component: Step2 },
  { stepName: "Upload Document", component: Step3 },
];

function Wizard() {
  const [alertState, setAlertState] = React.useState(false);
  return (
    <>
      <Container fluid className="mt-5 ">
        <Row>
          <Col className="m-auto " md="8">
            <ReactWizard
              steps={steps}
              navSteps
              title="Awesome Wizard"
              description="Split a complicated flow in multiple steps"
              headerTextCenter
              validate
              color="blue"
              previousButtonText="Back"
              nextButtonText="Next"
              finishButtonClasses="btn-info btn-wd"
              nextButtonClasses="btn-info btn-wd"
              previousButtonClasses="btn-wd"
              finishButtonClick={() => {
                setAlertState(
                  <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Good job!"
                    onConfirm={() => setAlertState(null)}
                    onCancel={() => setAlertState(null)}
                    confirmBtnBsStyle="info"
                  >
                    You clicked the finish button!
                  </SweetAlert>
                );
              }}
            />
          </Col>
        </Row>
      </Container>
      {alertState}
    </>
  );
}

export default Wizard