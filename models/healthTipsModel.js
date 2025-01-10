const mongoose = require('mongoose');

const healthTipsSchema = new mongoose.Schema({
    age_group: {
      type: String,
      required: true,
    }
  });

module.exports = mongoose.model('HealthTips', healthTipsSchema);
