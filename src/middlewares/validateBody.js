import createError from 'http-errors';

export default function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });

      next();
    } catch (error) {
      console.log(error.details);
      next(
        createError(400, error.details.map((err) => err.message).join(', ')),
      );
    }
  };
}
