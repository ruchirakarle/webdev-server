import model from "./model";
import { v4 as uuidv4 } from "uuid";
export default function ModulesDao() {
  function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
  }
  function createModule(module) {
    const { _id, ...rest } = module;
    const newModule = { ...rest, _id: uuidv4() };
    return model.create(newModule);
  }
  function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
  }
  function updateModule(moduleId, moduleUpdates) {
    const { _id, ...updates } = moduleUpdates;
    return model.findByIdAndUpdate(moduleId, { $set: updates }, { new: true });
  }
  return { findModulesForCourse, createModule, deleteModule, updateModule };
}