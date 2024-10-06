import CustomAPIError from "./cutomAPIError.js";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;