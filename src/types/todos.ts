export interface TodoItem {
id: string;
title: string;
description: string;
completed: boolean;
priority: 'low' | 'medium' | 'high';
createdAt: Date;
}


export interface TodoItemProps {
todo: TodoItem;
onToggle: (id: string) => void;
onDelete: (id: string) => void;
onEdit: (todo: TodoItem) => void;
openEditor: () => void;
}