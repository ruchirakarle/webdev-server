import ModulesDao from "./dao";
export default function ModuleRoutes(app) {
  const dao = ModulesDao();
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    res.json(await dao.findModulesForCourse(courseId));
  };
  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const created = await dao.createModule({ ...req.body, course: courseId });
    res.json(created);
  };
  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.send(status);
  };
  const updateModule = async (req, res) => {
    const updated = await dao.updateModule(req.params.moduleId, req.body);
    res.json(updated);
  };
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}