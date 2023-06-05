import prisma from "../db/index.js";
import axios from "axios";
import cron from "node-cron";
import moment from "moment-timezone";
import { body } from "express-validator";

const sendBirthdayMessage = async (user) => {
  const url = "https://email-service.digitalenvision.com.au";

  const payload = {
    email: user.email,
    message: `Hey, ${user.firstName} ${user.lastName}, it's your birthday`,
  };

  try {
    const response = await axios.post(`${url}/send-email`, payload);
    if (response.status === 200) {
      console.log("Email sent successfully:", response.data);
      await prisma.user.update({
        where: { id: user.id },
        data: { sent: true, failedToSend: false },
      });
    } else {
      console.log("Error", error.message);
      await prisma.user.update({
        where: { id: user.id },
        data: { sent: false, failedToSend: true },
      });
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export const scheduleBirthdayMessages = async () => {
  cron.schedule(`0 9 * * *`, async () => {
    checkFailedSentMessage();
    let users = await prisma.user.findMany();
    users.forEach(async (user) => {
      const birthday = moment.tz(user.birthday, user.location);
      const today = moment().tz(user.location);

      if (
        birthday.month() === today.month() &&
        birthday.date() === today.date()
      ) {
        sendBirthdayMessage(user);
      }
    });
  });
};

export const checkFailedSentMessage = async () => {
  const unsentUsers = await prisma.user.findMany({
    where: { failedToSend: true },
  });

  if (unsentUsers.length > 0) {
    unsentUsers.forEach(async (user) => {
      await sendBirthdayMessage(user);
    });
  }
};

export const validateCreateOrEditUser = () => {
  return [
    body("email")
      .notEmpty()
      .trim()
      .isEmail()
      .withMessage("Invalid email address"),
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("location").notEmpty(),
    body("birthday").notEmpty(),
  ];
};
