import { Task } from "../../../entities/task";
import { ListTasks } from "../../../usecases/listTasks";
import { noContent, ok } from "../../presentations/api/httpResponses/httpResponses";
import { ListTasksController } from "./listTasks";

interface SutTypes {
  sut: ListTasksController;
  listTasksStub: ListTasks;
}

const makeListTasksStub = (): ListTasks => {
  class ListTasksStub implements ListTasks {
    async list(): Promise<Task[]> {
      return Promise.resolve(makeFakeListTasks());
    }
  }

  return new ListTasksStub();
};

const makeSut = (): SutTypes => {
  const listTasksStub = makeListTasksStub();
  const sut = new ListTasksController(listTasksStub);
  return {
    sut,
    listTasksStub
  };
};

const makeFakeListTasks = (): Task[] => {
  return [
    {
      id: "1",
      title: "Teste 1",
      description: "Primeira task para testes.",
      date: "01/01/2025",
    },
    {
      id: "2",
      title: "Teste 2",
      description: "Segunda task para testes.",
      date: "01/02/2025",
    },
  ];
};

describe("ListTasks Controller", () => {
  test("Retornar 204 se a lista estiver vazia", async () => {
    const { sut, listTasksStub } = makeSut();
    jest.spyOn(listTasksStub, "list").mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test("Retornar 200 com uma lista de tarefa", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeListTasks()));
  });
});