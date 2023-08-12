const { feedbackServices } = require('./../databaseServices');
const { validateFeedback } = require('./../utility/utils');
const feedbackController = {};

feedbackController.postFeedback = async (req, res) => {
  const feedback = new Feedback({
    stars: req.body.stars,
    comment: req.body.comment,
  });

  const response = await validateFeedback(feedback);
  if (!response.success) {
    res.json(response);
    return;
  }

  try {
    const newFeedback = await feedbackServices.createFeedback(feedback);
    response.message = 'Feedback successfully sent!';
    response.feedback = newFeedback;
    res.status(201).json(response);
  } catch (err) {
    response.message = err.message;
    res.status(400).json(response);
  }
};

module.exports = feedbackController;
