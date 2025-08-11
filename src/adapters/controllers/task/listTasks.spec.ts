import { noContent } from "../../presentations/api/httpResponses/httpResponses";
import { ListTasksController } from "./listTasks";

describe("ListTasks Controller", () => {
  test("Retornar 204 se a lista estiver vazia", async () => {
    const sut = new ListTasksController();
    const tasks = await sut.handle({});
    expect(tasks).toEqual(noContent());
  });
});