const jwt =require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token provided' })
    }
    const token = authHeader.split(' ')[1]

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware