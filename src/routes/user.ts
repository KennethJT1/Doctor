import express from "express";
import {
  allDoctors,
  allUser,
  applyForADoctor,
  bookAppointmentWithADoctor,
  bookingAvailability,
  deleteAllNotification,
  info,
  login,
  notifications,
  userAppointment,
  userRegistration,
} from "../controllers/userCtrl";
import { AuthSign } from "../middlewares/authMiddleware";

const userRouter = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user.
 *     description: Register a new user by providing a name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: john123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The newly created user's ID.
 *                   example: 6696af66d5b08a6935cc50e0
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: johndoe@example.com
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *       409:
 *         description: Conflict. Email already exists.
 */

userRouter.post("/register", userRegistration);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login.
 *     description: Authenticate a user using their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: john123
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's ID.
 *                       example: 6696af66d5b08a6935cc50e0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       description: The user's email address.
 *                       example: johndoe@example.com
 *                     isAdmin:
 *                       type: boolean
 *                       description: Whether the user is an admin.
 *                       example: false
 *                     isDoctor:
 *                       type: boolean
 *                       description: Whether the user is a doctor.
 *                       example: false
 *       401:
 *         description: Invalid email or password.
 *       400:
 *         description: Bad request. Missing email or password.
 */
userRouter.post("/login", login);

/**
 * @swagger
 * /info:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve a single user by ID.
 *     description: Retrieve details of a registered user by their unique ID.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                   example: 6696af66d5b08a6935cc50e0
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: johndoe@example.com
 *                 isAdmin:
 *                   type: boolean
 *                   description: Whether the user is an admin.
 *                   example: false
 *                 isDoctor:
 *                   type: boolean
 *                   description: Whether the user is a doctor.
 *                   example: false
 *       404:
 *         description: User not found.
 */


userRouter.get("/info", AuthSign, info);

/**
 * @swagger
 * /all_users:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of registered users from the system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 1yhkdjiuy8y3hkjklfejv;o
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: John Doe
 *                       password:
 *                         type: string
 *                         description: The user's password.
 *                         example: john123
 *                       isAdmin:
 *                         type: boolean
 *                         description: Is the user an admin.
 *                         example: true
 *                       isDoctor:
 *                         type: boolean
 *                         description: Is the user a doctor.
 *                         example: true
 *                       notifcation:
 *                         type: array
 *                         description: Notifications.
 *                         example: []
 *                       seenNotification:
 *                         type: array
 *                         description: Notifications.
 *                         example: []
 *                   example:
 *                     - id: 6696af66d5b08a6935cc50e0
 *                       name: Ronaldo
 *                       password: $2a$10$JIYpRN9Ol9RiFM7cwyuUT.ElQ5J6Q7zjgbth93EAuGz9mCrNUrL4K
 *                       email: ronaldo@gmail.com
 *                       isAdmin: false
 *                       isDoctor: false
 *                       notifcation: []
 *                       seenNotification: []
 *                       createdAt: 2024-07-16T17:35:34.589Z
 *                       updatedAt: 2024-07-16T17:35:34.589Z
 *                       __v: 0
 *                     - id: 6696af66d5b08a6935c2354e0
 *                       name: Messi
 *                       password: $2a$10$JIYpPP9Ol9RiFM7cwyuUT.ElQ5J6Q7zjgbth93EAuGz9mCrNUrL4K
 *                       email: messi@gmail.com
 *                       isAdmin: true
 *                       isDoctor: true
 *                       notifcation: []
 *                       seenNotification: []
 *                       createdAt: 2024-08-16T17:35:34.589Z
 *                       updatedAt: 2024-08-16T17:35:34.589Z
 *                       __v: 0
 */
userRouter.get("/all_users", allUser);

/**
 * @swagger
 * /users_notification:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve and mark all notifications as read for the authenticated user.
 *     description: Retrieves all notifications for the authenticated user, marks them as read, and returns the updated notifications list.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved and marked all notifications as read.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                   example: All notifications marked as read
 *                 data:
 *                   type: object
 *                   properties:
 *                     notifcation:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The notification ID.
 *                             example: 5f4e4b8c9f5f33c9d2a5c44a
 *                           message:
 *                             type: string
 *                             description: The notification message.
 *                             example: "Your appointment has been confirmed."
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             description: The date and time the notification was created.
 *                             example: 2024-08-08T14:30:00Z
 *                     seenNotification:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The notification ID.
 *                             example: 5f4e4b8c9f5f33c9d2a5c44b
 *                           message:
 *                             type: string
 *                             description: The notification message.
 *                             example: "Your profile has been updated."
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             description: The date and time the notification was created.
 *                             example: 2024-08-08T15:00:00Z
 *       401:
 *         description: Unauthorized. Authentication is required to access notifications.
 *       404:
 *         description: User not found. The specified user does not exist.
 *       500:
 *         description: Server error. An error occurred while processing the request.
 */
userRouter.get("/users_notification", AuthSign, notifications);

/**
 * @swagger
 * //delete_users_notification:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete all notifications for the authenticated user.
 *     description: Deletes all notifications, both seen and unseen, for the currently authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted all notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                   example: Your notifications have been deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                       example: 5f4e4b8c9f5f33c9d2a5c44a
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: johndoe@example.com
 *                     isAdmin:
 *                       type: boolean
 *                       description: Is the user an admin.
 *                       example: false
 *                     isDoctor:
 *                       type: boolean
 *                       description: Is the user a doctor.
 *                       example: false
 *                     notifcation:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: The list of notifications, which will be empty after deletion.
 *                       example: []
 *                     seenNotification:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: The list of seen notifications, which will be empty after deletion.
 *                       example: []
 *       401:
 *         description: Unauthorized. Authentication is required to delete notifications.
 *       500:
 *         description: Server error. An error occurred while processing the request.
 */

userRouter.delete(
  "/delete_users_notification",
  AuthSign,
  deleteAllNotification
);

/**
 * @swagger
 * /user/apply-for-doctor:
 *   post:
 *     tags:
 *       - User
 *     summary: Apply for a doctor account.
 *     description: Allows a user to apply for a doctor account. The application is submitted with a "pending" status, and an admin is notified.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the doctor applicant.
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The last name of the doctor applicant.
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: The email address of the doctor applicant.
 *                 example: johndoe@example.com
 *               specialization:
 *                 type: string
 *                 description: The area of medical specialization.
 *                 example: Cardiology
 *               experience:
 *                 type: number
 *                 description: The number of years of experience.
 *                 example: 10
 *               education:
 *                 type: string
 *                 description: The educational background.
 *                 example: "MD, Harvard University"
 *               resume:
 *                 type: string
 *                 description: A link to the applicant's resume.
 *                 example: "https://example.com/resume.pdf"
 *     responses:
 *       201:
 *         description: Doctor account application submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                   example: Doctor account applied Successfully
 *       400:
 *         description: Bad request. The request body was invalid.
 *       500:
 *         description: Server error. An error occurred while processing the request.
 */

userRouter.patch("/apply-f-doctor", AuthSign, applyForADoctor);

userRouter.get("/all-doctors", AuthSign, allDoctors);

userRouter.post(
  "/book-appointmenaWith-Doctor",
  AuthSign,
  bookAppointmentWithADoctor
);

userRouter.post("/booking-availability", AuthSign, bookingAvailability);

userRouter.get("/user-appointments", AuthSign, userAppointment);

export default userRouter;
