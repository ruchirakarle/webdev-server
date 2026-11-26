import model from "./model";
import { v4 as uuidv4 } from "uuid";
export default function CoursesDao() {
  function findAllCourses() {
    return model.find();
  }
  function findCourseById(courseId) {
    return model.findById(courseId);
  }
  function createCourse(course) {
    const { _id, ...rest } = course;
    const newCourse = { ...rest, _id: uuidv4() };
    return model.create(newCourse);
  }
  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }
  function updateCourse(courseId, courseUpdates) {
    const { _id, ...updates } = courseUpdates;
    return model.findByIdAndUpdate(courseId, { $set: updates }, { new: true });
  }
  return { findAllCourses, findCourseById, createCourse, deleteCourse, updateCourse };
}