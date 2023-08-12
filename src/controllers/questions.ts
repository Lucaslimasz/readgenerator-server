import { Request, Response } from 'express';

import { questions } from '../questions';
import { TemplateOne } from '../templates/templateOne';
import { IQuestion } from '../interfaces/question';

import Users from '../models/users';

export const question = (_: any, res: Response) => {
  return res.status(200).json({ data: questions });
};

export const createReadme = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const questionsCompleted: IQuestion[] = [];

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (questions[i] && data[j] && questions[i].id === data[j].id) {
          questionsCompleted.push({ id: questions[i].id, question: questions[i].question, answer: data[i].answer });
        }
      }
    }

    const user = questionsCompleted.find(item => item.id === 'user')
    await Users.create({ name: user?.answer })

    const markdownContent = TemplateOne(questionsCompleted);

    return res.json(markdownContent)
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred.');
  }
}