//create , send , save token in the cookie :
const sendToken = (user, statusCode, res) => {
    // create jwtToken
    const token = user.getJwtToken();
    // options for cookie :
    const options = {
      expires: new Date(
        Date.now() + process.env.cookie_EXPIRES_TIME * 24 * 3600 * 1000
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  module.exports = sendToken;