import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const tasks = [
    { id: 1, title: "Follow up with John Doe", completed: false },
    { id: 2, title: "Prepare presentation for meeting", completed: true },
    { id: 3, title: "Send proposal to XYZ Corp", completed: false },
    { id: 4, title: "Review campaign performance", completed: false },
]

export function TaskListWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Task List</CardTitle>
                <CardDescription>Your upcoming tasks</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {tasks.map(task => (
                        <li key={task.id} className="flex items-center space-x-2">
                            <Checkbox id={`task-${task.id}`} checked={task.completed} />
                            <label
                                htmlFor={`task-${task.id}`}
                                className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                                {task.title}
                            </label>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}