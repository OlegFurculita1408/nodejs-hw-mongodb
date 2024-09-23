export const notFoundAnythingMiddlewares = (req, res, next) => {
    next( res.status(404).json({ message: 'Route not found'}));
}