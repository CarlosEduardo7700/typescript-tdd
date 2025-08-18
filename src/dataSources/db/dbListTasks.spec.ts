import { HttpRequest } from "../../adapters/interfaces";
import { Task } from "../../entities/task";
import { ListTasksRepository } from "../../usecases/repository/listTasksRepository";
import { DbListTasks } from "./dbListTasks";

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

const makeListTasksRepository = (): ListTasksRepository => {
  class ListTasksRepositoryStub implements ListTasksRepository {
    async list(): Promise<Task[]> {
      return Promise.resolve(makeFakeListTasks());
    }
  }
  return new ListTasksRepositoryStub();
};

interface SutTypes {
    sut: DbListTasks;
    listTasksRepositoryStub: ListTasksRepository;
}

const makeSut = (): SutTypes => {
  const listTasksRepositoryStub = makeListTasksRepository();
  const sut = new DbListTasks(listTasksRepositoryStub);
  return {
    sut,
    listTasksRepositoryStub,
  };
};

describe("DbListTasks", () => {
  test("Deve chamar ListTasksRepository", async () => {
    const { sut, listTasksRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(listTasksRepositoryStub, "list");
    await sut.list();
    expect(listSpy).toHaveBeenCalled();
  });

  test("Deve retornar tarefas em caso de sucesso", async () => {
    const { sut } = makeSut();
    const tasks = await sut.list();
    expect(tasks).toEqual(makeFakeListTasks());
  });

  test("Deve lançar um erro se ListTaskRepository falhar", async () => {
    const { sut, listTasksRepositoryStub } = makeSut();
    jest
      .spyOn(listTasksRepositoryStub, "list")
      .mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.list();
    await expect(promise).rejects.toThrow();
  });
});