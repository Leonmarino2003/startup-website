const Feedback = require('./feedback/feedback');

const createFeedback = async (feedback) => {
  feedback = new Feedback(feedback);

  await feedback.save();
  return feedback;
};

module.exports = feedbackServices = {
  createFeedback,
};
