import { Hono } from "hono";
import { Env } from './core-utils';
import type { Todo, ApiResponse } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // Todo Endpoints
    app.get('/api/todos', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getTodos();
        return c.json({ success: true, data } satisfies ApiResponse<Todo[]>);
    });
    app.post('/api/todos', async (c) => {
        const body = await c.req.json() as Todo;
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.addTodo(body);
        return c.json({ success: true, data } satisfies ApiResponse<Todo[]>);
    });
    app.put('/api/todos/:id/toggle', async (c) => {
        const id = c.req.param('id');
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.toggleTodo(id);
        return c.json({ success: true, data } satisfies ApiResponse<Todo[]>);
    });
    app.delete('/api/todos/:id', async (c) => {
        const id = c.req.param('id');
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.deleteTodo(id);
        return c.json({ success: true, data } satisfies ApiResponse<Todo[]>);
    });
}