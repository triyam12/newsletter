const mongoose = require("mongoose");

const suscriberSchema = new mongoose.Schema(
  {
    name: {
      type: String,

    },
    email: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Suscriber = mongoose.model("suscriber", suscriberSchema);

module.exports = Suscriber;