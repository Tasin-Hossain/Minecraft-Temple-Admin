//(async/await error wrapper)
export const asyncHandler = (fn) => (req, res, next) => {
  console.log("asyncHandler called");
  Promise.resolve(fn(req, res, next)).catch(next);
  console.log("asyncHandler finished");
};
