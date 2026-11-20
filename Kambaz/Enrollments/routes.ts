import EnrollmentsDao from "./dao";
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const resolveUserId = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return null;
      }
      userId = currentUser._id;
    }
    return userId;
  };
  const enroll = (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    dao.enrollUserInCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };
  const unenroll = (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    dao.unenrollUserFromCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };
  const findUsersForCourse = (req, res) => {
    res.json(dao.findUsersForCourse(req.params.courseId));
  };
  app.post("/api/users/:userId/courses/:courseId", enroll);
  app.delete("/api/users/:userId/courses/:courseId", unenroll);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
}