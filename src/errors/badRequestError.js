import CustomAPIError from "./cutomAPIError.js";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;