import { Schema, model } from "mongoose";

const maintenanceSchema = new Schema({
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  houseSpecified: {
    type: Schema.Types.ObjectId,
    ref: 'Houses',
  },
  complaints: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['maintenance', 'checked'],
    default: 'maintenance'
  },
  requestDate: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

const MaintenanceRequest = model('Maintenance', maintenanceSchema);
export default MaintenanceRequest;
