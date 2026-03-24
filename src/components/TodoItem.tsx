import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Todo } from '@shared/types';
import { Button } from '@/components/ui/button';
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex items-center justify-between p-4 bg-card border rounded-xl shadow-sm transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        todo.completed && "bg-muted/50"
      )}
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <button
          onClick={() => onToggle(todo.id)}
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            todo.completed 
              ? "bg-indigo-600 border-indigo-600 text-white" 
              : "border-muted-foreground/30 hover:border-indigo-500"
          )}
        >
          {todo.completed && <Check className="h-4 w-4" />}
        </button>
        <span className={cn(
          "text-base font-medium transition-all duration-300 truncate",
          todo.completed && "text-muted-foreground line-through opacity-60"
        )}>
          {todo.text}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-opacity"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}