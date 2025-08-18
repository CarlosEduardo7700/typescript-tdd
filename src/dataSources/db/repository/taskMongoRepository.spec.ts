import { MongoManager } from "../../config/mongoManager";
import { TaskMongoRepository } from "./taskMongoRepository";

const makeSut = (): TaskMongoRepository => {
  return new TaskMongoRepository();
};

describe("TaskMongoRepository", () => {

  const client = MongoManager.getInstance();
  beforeAll(async () => {
    await client.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await client.disconnect();
  });

  test("Deve retornar a tarefa em caso de sucesso", async () => {
    const sut = makeSut();
    const task = await sut.add({
      title: "Título da Task",
      description: "Descrição da Task...",
      date: "01/01/2025",
    });

    expect(task.id).toBeTruthy();
    expect(task.title).toBe("Título da Task");
    expect(task.description).toBe("Descrição da Task...");
    expect(task.date).toBe("01/01/2025");
  });
});