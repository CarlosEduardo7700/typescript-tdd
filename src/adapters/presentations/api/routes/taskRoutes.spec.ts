import request from "supertest";
import { MongoManager } from "../../../../dataSources";
import app from "../config/app";

describe("TaskRoutes", () => {
  const client = MongoManager.getInstance();
  beforeAll(async () => {
    await client.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await client.disconnect();
  });

  test("Deve retornar 204 se a lista estiver vazia", async () => {
    await request(app).get("/api/tasks").expect(204);
  });
});