require('express-async-errors')
const express = require('express');
const app = express();
const commentRoute = require('./routes/commentRoute')
const err = require('./error/index');
const { initMiddlewares } = require("./middlewares/index");

/**
 * Initialze middlewares
 */

initMiddlewares(app);

/**
 * Initialize Routes
 */

app.use('/api/comments', commentRoute);

/**
 * Initialize error handlers
 */

app.use(err.iRouteHandler);
app.use(err.errorHandler);

/**
 * Start server
 */

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
