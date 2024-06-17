import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    if(!req.session?.jwt) {//!req.session.jwt || !req.session
        return res.send({currentUser: null})
    }
});

export { router as currentUserRouter }; 