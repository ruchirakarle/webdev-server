import model from "./model";
import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao() {
  const findAssignmentsForCourse = (courseId) => model.find({ course: courseId });
  const createAssignment = (assignment) => {
    const { _id, ...rest } = assignment;
    return model.create({ ...rest, _id: uuidv4() });
  };
  const updateAssignment = (assignmentId, updates) => {
    const { _id, ...rest } = updates;
    return model.findByIdAndUpdate(assignmentId, { $set: rest }, { new: true });
  };
  const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });
  return { findAssignmentsForCourse, createAssignment, updateAssignment, deleteAssignment };
}