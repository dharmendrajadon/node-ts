import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
    res.send('Welcome to ProCM Server');
};
