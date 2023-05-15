exports.index = (req, res) => {
  res.render("about");
  return;
};

exports.policy = (req, res) => {
  res.render("politica");
  return;
};

exports.analytics = (req, res) => {
  res.render("analytics");
};
