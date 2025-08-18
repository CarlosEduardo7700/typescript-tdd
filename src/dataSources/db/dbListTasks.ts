import { Task } from "../../entities/task";
import { ListTasksRepository } from "../../usecases/repository/listTasksRepository";

export class DbListTasks implements ListTasksRepository {
  constructor(private readonly listTaskRepository: ListTasksRepository){}  
  async list(): Promise<Task[]> {
    const tasks = await this.listTaskRepository.list();
    return tasks;
  }
}