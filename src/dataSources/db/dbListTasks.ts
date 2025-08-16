import { Task } from "../../entities/task";
import { ListTasksRepository } from "../../usecases/repository/listTasksRepository";

export class DbListTasks implements ListTasksRepository {
  constructor(private readonly listTaskRepository: ListTasksRepository){}  
  async list(): Promise<Task[]> {
    await this.listTaskRepository.list();
    return [];
  }
}