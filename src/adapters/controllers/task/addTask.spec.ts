import { title } from "process";
import {
  DbAddTask,
  MongoManager,
  TaskMongoRepository,
} from "../../../dataSources";
import { Task } from "../../../entities/task";
import { AddTask, AddTaskModel } from "../../../usecases";
import { addTaskValidationCompositeFactory } from "../../factories";
import env from "../../presentations/api/config/env";
import { AddTaskController } from "./addTask";
import { HttpRequest, Validation } from "../../interfaces";
import { serverError } from "../../presentations/api/httpResponses/httpResponses";

const makeAddTask = (): AddTask => {
  class AddTaskStub implements AddTask {
    async add(task: AddTaskModel): Promise<Task> {
      return Promise.resolve({
        id: "any_id",
        title: "any_title",
        description: "any_description",
        date: "30/06/2024",
      });
    }
  }
  return new AddTaskStub();
};

const makeValidation = (): Validation => {
  class ValidateStub implements Validation {
    validate(data: any): Error | void {
      return;
    }
  }
  return new ValidateStub();
};

interface SutTypes {
  addTaskStub: AddTask;
  validationStub: Validation;
  sut: AddTaskController;
}

const makeSUT = (): SutTypes => {
  const addTaskStub = makeAddTask();
  const validationStub = makeValidation();
  const sut = new AddTaskController(addTaskStub, validationStub);

  return {
    addTaskStub,
    validationStub,
    sut,
  };
};

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      title: "any_title",
      description: "any_description",
      date: "30/06/2024",
    }
  };
};

describe("AddTask Controller", () => {
  test("Deve chamar AddTask com valores corretos", async () => {
    const { sut, addTaskStub } = makeSUT();

    const addSpy = jest.spyOn(addTaskStub, "add");

    await sut.handle(makeFakeRequest());

    expect(addSpy).toHaveBeenCalledWith({
      title: "any_title",
      description: "any_description",
      date: "30/06/2024",
    });
  });

  test("Deve retornar 500 se AddTask lançar uma exceção", async () => {
    const { sut, addTaskStub } = makeSUT();

    jest.spyOn(addTaskStub, "add").mockImplementationOnce(async () => Promise.reject(new Error()));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Deve chamar Validation com valores corretos", async () => {
    const { sut, validationStub } = makeSUT();

    const validateSpy = jest.spyOn(validationStub, "validate");

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
