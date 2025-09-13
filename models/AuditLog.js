const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true }, // e.g., "login", "document_upload", "user_created"
  resource: { type: String }, // e.g., "Document", "User", "Organization"
  resourceId: { type: mongoose.Schema.Types.ObjectId },
  details: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
