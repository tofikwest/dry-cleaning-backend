const wrapper = (ctrll) => {
  return async (req, res, next) => {
    try {
      await ctrll(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
module.exports = wrapper;
