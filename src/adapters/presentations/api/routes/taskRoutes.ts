import { Router } from "express";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import {
  addTaskControllerFactory,
  deleteTaskControllerFactory,
} from "../../../factories";
import { listTaskControllerFactory } from "../../../factories/listTaskControllerFactory";

export default (router: Router): void => {
  router.post("/tasks", expressRouteAdapter(addTaskControllerFactory()));
  router.delete("/tasks", expressRouteAdapter(deleteTaskControllerFactory()));
  router.get("/tasks", expressRouteAdapter(listTaskControllerFactory()));
};
