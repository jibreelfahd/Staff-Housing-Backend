import { Schema, model } from "mongoose";

const houseSchema = new Schema(
  {
    area: {
      type: String,
      emum: ["Area A", "Area BZ", "Area H", "Area F"],
      required: true,
    },
    houses: [
      {
        houseNumber: {
          type: Number,
          unqiue: true,
          required: true,
        },
        status: {
          type: String,
          enum: ["vacant", "occupied", "retirement"],
          default: "vacant",
        },
        occupiedBy: {
          type: Schema.Types.ObjectId,
          ref: "Staff",
          default: null,
        },
        tenancyHistory: [
          {
            staff: {
              type: Schema.Types.ObjectId,
              ref: "Staff",
            },
            startDate: Date,
            endDate: Date,
          },
        ],
        maintenaceRequests: [
          {
            type: Schema.Types.ObjectId,
            ref: "Maintenance",
          },
        ],
        dateApplied: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Houses = model("Houses", houseSchema);
export default Houses;
