import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateTaken from "../utils/generateTokens.js";

// @description Auth user/set token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateTaken(res, user._id); // This should set the JWT in a cookie
    console.log("Token generated and set in cookie for user:", user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @description Register New users
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, surname, email, password });

  if (user) {
    generateTaken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // res.status(200).json({ message: "Register User" });
});

// @description Logout User
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(404).json({ message: error });
  }
});

// @description Get User Profile
// @route Get/api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json({ message: "User Profile", data: user });
});

// @description Update user Profile
// @route PUT/api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Update user Profile",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
