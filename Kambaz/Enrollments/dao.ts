import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const exists = db.enrollments.some(
      (e) => e.user === userId && e.course === courseId,
    );
    if (!exists) {
      db.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    }
  }
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId),
    );
  }
  function findUsersForCourse(courseId) {
    return db.users.filter((user) =>
      db.enrollments.some((e) => e.user === user._id && e.course === courseId),
    );
  }
  return { enrollUserInCourse, unenrollUserFromCourse, findUsersForCourse };
}