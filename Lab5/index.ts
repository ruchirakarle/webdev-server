import type { Express, Request, Response } from "express";
import PathParameters from "./PathParameters.ts";
import QueryParameters from "./QueryParameters.ts";
import WorkingWithRemoteObjects from "./WorkingWithRemoteObjects.ts";
import WorkingWithRemoteArrays from "./WorkingWithRemoteArrays.ts";
export default function Lab5(app: Express) {
  app.get("/lab5/welcome", (req: Request, res: Response) => {
    res.send("Welcome to Lab 5");
  });
  PathParameters(app);
  QueryParameters(app);
  WorkingWithRemoteObjects(app);
  WorkingWithRemoteArrays(app);
}