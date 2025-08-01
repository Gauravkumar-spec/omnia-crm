import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  image: String,
});

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
