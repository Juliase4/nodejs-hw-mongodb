export const notFoundHandler = (_req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Route not found',
  });
};
