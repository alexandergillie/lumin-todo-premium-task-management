import { DurableObject } from "cloudflare:workers";
import type { DemoItem, Todo } from '@shared/types';
import { MOCK_ITEMS } from '@shared/mock-data';
export class GlobalDurableObject extends DurableObject {
    // Todo Methods
    async getTodos(): Promise<Todo[]> {
      const todos = await this.ctx.storage.get("todos_list");
      return (todos as Todo[]) || [];
    }
    async addTodo(todo: Todo): Promise<Todo[]> {
      const todos = await this.getTodos();
      const updated = [todo, ...todos];
      await this.ctx.storage.put("todos_list", updated);
      return updated;
    }
    async toggleTodo(id: string): Promise<Todo[]> {
      const todos = await this.getTodos();
      const updated = todos.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      await this.ctx.storage.put("todos_list", updated);
      return updated;
    }
    async deleteTodo(id: string): Promise<Todo[]> {
      const todos = await this.getTodos();
      const updated = todos.filter(t => t.id !== id);
      await this.ctx.storage.put("todos_list", updated);
      return updated;
    }
    // Existing Demo Methods
    async getCounterValue(): Promise<number> {
      const value = (await this.ctx.storage.get("counter_value")) || 0;
      return value as number;
    }
    async increment(amount = 1): Promise<number> {
      let value: number = (await this.ctx.storage.get("counter_value")) || 0;
      value += amount;
      await this.ctx.storage.put("counter_value", value);
      return value;
    }
    async getDemoItems(): Promise<DemoItem[]> {
      const items = await this.ctx.storage.get("demo_items");
      if (items) return items as DemoItem[];
      await this.ctx.storage.put("demo_items", MOCK_ITEMS);
      return MOCK_ITEMS;
    }
}