import { Request, Response } from 'express';

import fs from 'fs';
import path from 'path';

import { questions } from '../questions';
import { TemplateOne } from '../templates/templateOne';
import { Question } from '../types/question';

export const question = (_: any, res: Response) => {
    return res.status(200).json({ data: questions });
};

export const createReadme = (req: Request, res: Response) => {
    try {
        const data = req.body;
        const questionsCompleted: Question[] = [];

        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (questions[i] && data[j] && questions[i].id === data[j].id) {
                    questionsCompleted.push({ id: questions[i].id, question: questions[i].question, answer: data[i].answer });
                }
            }
        }

        const markdownContent = TemplateOne(questionsCompleted);

        const filePath = path.join(__dirname, 'README.md');

        fs.writeFile(filePath, markdownContent, err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error generating Markdown file.');
            }

            res.set('Content-Type', 'text/markdown');
            res.sendFile(filePath, {}, () => {
                fs.unlink(filePath, err => {
                    if (err) return console.log(err);
                });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred.');
    }
}