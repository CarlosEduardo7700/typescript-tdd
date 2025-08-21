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
    await sut.add({
      title: "Título da Task",
      description: "Descrição da Task...",
      date: "01/01/2025",
    });

    const tasks = await sut.list();

    expect(tasks[0].id).toBeTruthy();
    expect(tasks[0].title).toBe("Título da Task");
    expect(tasks[0].description).toBe("Descrição da Task...");
    expect(tasks[0].date).toBe("01/01/2025");
    expect(tasks.length).toBe(1);
  });
});