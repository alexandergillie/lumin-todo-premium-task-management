import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface TodoInputProps {
  onAdd: (text: string) => void;
  disabled?: boolean;
}
export function TodoInput({ onAdd, disabled }: TodoInputProps) {
  const [text, setText] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };
  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-center gap-2 w-full p-1 bg-background border rounded-2xl shadow-sm focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-300"
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        disabled={disabled}
        className="border-none focus-visible:ring-0 text-lg py-6 px-4 bg-transparent"
      />
      <Button 
        type="submit" 
        disabled={disabled || !text.trim()}
        className="rounded-xl px-6 py-6 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-lg transition-all"
      >
        <Plus className="h-5 w-5 mr-2" />
        <span className="font-semibold">Add</span>
      </Button>
    </form>
  );
}