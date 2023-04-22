const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../configs/jwtToken");
const validateMonggoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../configs/refreshToken");
const jwt = require("jsonwebtoken");
// Register
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  console.log(findUser);
  if (!findUser) {
    // create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // user already exist
    throw new Error("User Already Exists");
  }
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check user exists
  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in Cookies");
  const refreshToken = cookie.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token in database or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Invalid refresh token");
    }
    const accessToken = generateToken(user?.id);
    res.json({ accessToken });
  });
});

// Get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json({
      allUser: getUsers,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a user
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMonggoDbId(id);
  try {
    const getaUser = await User.findById(id);
    res.json({
      user: getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a user
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMonggoDbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update a user
const updateaUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMonggoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User blocked",
    });
  } catch ({ error }) {
    throw new Error(error);
  }
});

// UnBlock user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User unblocked",
    });
  } catch ({ error }) {
    throw new Error(error);
  }
});

// Logout function
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204);
});

module.exports = {
  createUser,
  loginUser,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
};
