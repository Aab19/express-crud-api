import prisma from "../db/index.js";
import { scheduleBirthdayMessages } from "../utils/index.js";
import { validationResult } from "express-validator";

export const getAllUser = async (req, res) => {
  try {
    const allUser = await prisma.user.findMany();
    return res.json(allUser);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get users" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get user by id" });
  }
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstName, lastName, birthday, location } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        birthday,
        location,
        sent: false,
        failedToSend: false,
      },
    });

    delete newUser.sent;
    delete newUser.failedToSend;

    // scheduleBirthdayMessages();
    return res.send({
      data: newUser,
      message: "Success Create User",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstName, lastName, birthday, location } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email,
        firstName,
        lastName,
        birthday,
        location,
      },
    });

    delete updatedUser.sent;
    delete updatedUser.failedToSend;

    // scheduleBirthdayMessages();
    return res.send({
      data: updatedUser,
      message: "Success Edit User",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    // scheduleBirthdayMessages();
    return res.send({
      data: deletedUser,
      message: "Success Delete User",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
