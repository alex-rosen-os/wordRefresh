import express from "express";

const authRouter = express.Router();

authRouter.get("/auth",  (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === "password") {
    next();
  } else {
    res.status(401);
    res.send("access forbidden");
  }
});

// authRouter.use((req,res,next)=> {
//     console.log('time: ', Date.now());
//     next()
// })



export default authRouter;
