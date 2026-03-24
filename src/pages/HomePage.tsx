import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Sparkles, Loader2, ClipboardList } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { Toaster, toast } from '@/components/ui/sonner';
import type { Todo, ApiResponse } from '@shared/types';
export function HomePage() {
  const queryClient = useQueryClient();
  const today = format(new Date(), 'EEEE, MMMM do');
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos');
      const json = await res.json() as ApiResponse<Todo[]>;
      return json.data ?? [];
    }
  });
  const addMutation = useMutation({
    mutationFn: async (text: string) => {
      const newTodo: Todo = {
        id: uuidv4(),
        text,
        completed: false,
        createdAt: Date.now()
      };
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
      });
      return (await res.json() as ApiResponse<Todo[]>).data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['todos'], newData);
      toast.success('Task added');
    }
  });
  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/todos/${id}/toggle`, { method: 'PUT' });
      return (await res.json() as ApiResponse<Todo[]>).data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['todos'], newData);
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      return (await res.json() as ApiResponse<Todo[]>).data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['todos'], newData);
      toast.info('Task removed');
    }
  });
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-500">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-24">
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Header Section */}
            <header className="space-y-4 text-center animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-indigo-600 rounded-2xl shadow-glow rotate-3">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground">
                Lumin <span className="text-indigo-600">Tasks</span>
              </h1>
              <p className="text-muted-foreground text-lg font-medium">
                {today}
              </p>
            </header>
            {/* Input Section */}
            <section className="relative z-10">
              <TodoInput 
                onAdd={(text) => addMutation.mutate(text)} 
                disabled={addMutation.isPending}
              />
            </section>
            {/* List Section */}
            <section className="space-y-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                  <p>Illuminating your tasks...</p>
                </div>
              ) : todos.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 border-2 border-dashed rounded-3xl space-y-4"
                >
                  <div className="flex justify-center">
                    <ClipboardList className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-semibold text-foreground">All clear</p>
                    <p className="text-muted-foreground">Enjoy your day or start a new task.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {todos.map((todo) => (
                      <TodoItem 
                        key={todo.id} 
                        todo={todo}
                        onToggle={(id) => toggleMutation.mutate(id)}
                        onDelete={(id) => deleteMutation.mutate(id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>
            {/* Footer Stats */}
            {!isLoading && todos.length > 0 && (
              <footer className="pt-8 text-center text-sm text-muted-foreground border-t">
                {todos.filter(t => t.completed).length} of {todos.length} tasks completed
              </footer>
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" richColors />
    </div>
  );
}