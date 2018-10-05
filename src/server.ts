import 'reflect-metadata';
import app from './App';

/**
 * Start Express server.
 */
const server = app.listen(process.env.APP_PORT, () => {
    console.log(
        `  App is running at ${process.env.APP_HOST}:${process.env.APP_PORT} in ${process.env.APP_ENV} mode`);
    console.log('  Press CTRL-C to stop\n');
});

export default server;
