import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RequestDetail } from "./RequestDetail";
import { RequestForm } from "./RequestForm";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRequestContext } from "./RequestProvider";
import axios from "axios";
import { useAppContext } from "../AppProvider";

const steps = ["Tạo phiếu", "Tạo chi tiết phiếu"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <RequestForm />;
    case 1:
      return <RequestDetail />;
    default:
      throw new Error("Unknown step");
  }
}

export const Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { requestForm, title, bookIds, setRequests, selectRequest, requests } =
    useRequestContext();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [dataRequest, setDataRequest] = useState<any[]>([]);
  const { setDataUpdate, handleDataUpdate } = useAppContext();

  const onCreateRequest = useCallback(async () => {
    const data = await axios.post(
      `http://localhost:4001/qltv/api/v1/request-create`,
      {
        type: requestForm?.value,
        id_user: user?.user?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }
    );

    if (data.data.type === "success") {
      setRequests?.([requests, ...data?.data?.results]);
      setActiveStep(activeStep + 1);
    }
  }, [
    requestForm?.value,
    user?.access_token,
    user?.user?.id,
    setRequests,
    activeStep,
    requests,
  ]);

  const handleNext = async () => {
    if (dataRequest.length === 0) {
      alert("Bạn chưa có phiếu yêu cầu nào");
      return;
    }
    if (
      activeStep === 1 &&
      title?.trim() !== "" &&
      bookIds?.length !== 0 &&
      selectRequest?.id !== ""
    ) {
      const results = await axios.post(
        `http://localhost:4001/qltv/api/v1/request-create-detail`,
        {
          title,
          nhanbansach: bookIds,
          quantity: bookIds?.length,
          id_request_form: selectRequest?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      handleDataUpdate?.(results?.data?.results as any[]);
    }
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const fetchDataRequest = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:4001/qltv/api/v1/request-getAll`,
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
        params: {
          id: user.id,
        },
      }
    );

    setRequests?.(res.data.results);
    setDataRequest(res.data.results);
  }, [user.id, user?.access_token, setRequests]);

  useEffect(() => {
    fetchDataRequest();
  }, [fetchDataRequest]);

  return (
    <Fragment>
      <Container component="main" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Đơn yêu cầu
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom align="center">
                Tạo đơn thành công.
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 ? (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Trở lại
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={onCreateRequest}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Tạo
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Tạo" : "Tiếp tục"}
                </Button>
              </Box>
            </Fragment>
          )}
        </Paper>
      </Container>
    </Fragment>
  );
};
