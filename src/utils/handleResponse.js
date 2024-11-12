// src/utils/responseHandler.js
export const handleResponse = (res, status, data) => {
    res.status(status).json({ status, data });
  };
  