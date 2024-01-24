const Subscription = require("../models/web-browser-subscription");

exports.createSubscription = async (req, res, next) => {
  const endpoint = req.body.endpoint;
  const auth = req.body.keys.auth;
  const p256dh = req.body.keys.p256dh;

  try {
    const browserSubscription = new Subscription({
      endpoint,
      keys: {
        auth,
        p256dh,
      },
    });
    await browserSubscription.save();

    res.status(201).json({
      message: "Browser  created successfully !",
      post,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
