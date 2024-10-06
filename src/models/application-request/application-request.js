import { Schema, model } from "mongoose";

const applicationSchema = new Schema({
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
    default: null
  },
  area: {
    type: String, 
    enum: {
      values: ['Area A', 'Area BZ', 'Area H', 'Area F'],
      message: '{VALUE} is not a valid area'  
    },
    required: [true, 'An area must be provided']
  },
  alocatedHouse: { 
    type: Schema.Types.ObjectId,
    ref: 'Houses',
    default: null
  },
  applicationStatus: {
    type: String,
    enum: ['pending', 'rejected', 'allocated'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['application', 'checked'],
    default: 'application'
  },
  dateApplied: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

const ApplicationRequest = model('Applications', applicationSchema);
export default ApplicationRequest;
