import EnrollmentsDao from "./dao";
export default function EnrollmentRoutes(app) {
  const dao = EnrollmentsDao();
  const resolveUserId = (req, res) => {
    let { uid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return null;
      }
      uid = currentUser._id;
    }
    return uid;
  };
  const enrollUserInCourse = async (req, res) => {
    const uid = resolveUserId(req, res);
    if (!uid) return;
    const status = await dao.enrollUserInCourse(uid, req.params.cid);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    const uid = resolveUserId(req, res);
    if (!uid) return;
    const status = await dao.unenrollUserFromCourse(uid, req.params.cid);
    res.send(status);
  };
  const findUsersForCourse = async (req, res) => {
    const users = await dao.findUsersForCourse(req.params.cid);
    res.json(users);
  };
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.get("/api/courses/:cid/users", findUsersForCourse);
}