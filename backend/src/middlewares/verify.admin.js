const verifyAdmin = (req, res, next) => {
    const data = req.user;
    if(!data || data.role != "admin" ) return res.json({ ok : false, message :"unauthorized"})
    console.log(data);
    next();
    
}

export default verifyAdmin