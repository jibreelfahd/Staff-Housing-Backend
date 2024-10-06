import { Schema, model } from "mongoose";

const retirementSchema = new Schema({
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  houseSpecified: {
    type: Schema.Types.ObjectId,
    ref: 'Houses',
    required: true
  },
  status: {
    type: String,
    enum: ['retirement', 'checked'],
    default: 'retirement'
  },
  requestData: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

const RetirementRequest = model('Retirement', retirementSchema);
export default RetirementRequest;
