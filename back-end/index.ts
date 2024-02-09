import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const jsonData = require('./data.json');
const fs = require('fs');

app.use(bodyParser.json());

interface Todo {
    id: number;
    task: string;
}

let todoList: any[] = jsonData;
let id = 0;
console.log(todoList, 'todoList')

app.get('/todos', (req: Request, res: Response) => {
    res.json(todoList);
});

app.post('/todos', (req: Request, res: Response) => {
    const { task } = req.body;
    if (task) {
        const maxId = todoList.reduce((max, todo) => Math.max(max, todo.id), 0);
        id = maxId + 1;
        todoList.push({ id: id, task });
        res.status(201).json({ message: 'Task added successfully' });
    } else {
        res.status(400).json({ error: 'Task is required' });
    }
});


app.put('/todos', (req, res) => {
    const { id, task } = req.body;
    const index = jsonData.findIndex((item: Todo) => item.id === id);

    if (index !== -1) {

        jsonData[index] = { id, task };
        fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), (err: Error) => {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).json({ error: 'Error writing to file' });
            } else {
                res.json({ message: 'Data updated successfully' });
            }
        });
    } else {
        res.status(404).json({ error: 'not found id' });
    }
});

app.delete('/todos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = todoList.findIndex((todo) => todo.id === parseInt(id));
    if (index !== -1) {
        todoList.splice(index, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
