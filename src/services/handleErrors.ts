import { message } from "antd";

const unauthorizedCode = [401, 403, 410];

export const handleErrors = (errorResponse: any) => {
  if (unauthorizedCode.includes(errorResponse.status_code)) {
    message.error("Unauthorized");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return;
  }
  if (errorResponse.status_code === 101) {
    message.error("Outdated Version");
    message.info("Please refresh the page to update the app");
    return;
  }
  if (
    errorResponse.data &&
    errorResponse.data.errors &&
    (errorResponse.status_code === 409 || errorResponse.status_code === 400)
  ) {
    const errors = errorResponse.data.errors;
    Object.keys(errors).forEach((field) => {
      errors[field].forEach((error: string) => {
        message.error(error);
      });
    });
  }

  if (errorResponse.status_code === 404) {
    message.error("Not Found");
  }

  if (errorResponse.status_code === 500) {
    message.error("Internal Server Error");
  }

  if (errorResponse.status_code === 508) {
    message.error("Time Out");
  }
  if (errorResponse.status_code === 400) {
    message.error(errorResponse.data);
  }
};
