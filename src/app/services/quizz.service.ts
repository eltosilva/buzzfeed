import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import quizz from '../../assets/data/quizz_questions.json';
import { Option } from '../model/option';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private title: string;
  private questions: Question[];
  private results: { A: string, B: string };
  private questionIndex;

  constructor() {
    this.title = quizz.title;
    this.questions = quizz.questions;
    this.results = quizz.results;
    this.questionIndex = 0;
  }


  getTitle(): string { return this.title; }
  
  getResults(answers: Option[]): string {
    let countA = answers.filter(option => option.alias === 'A');
    let countB = answers.filter(option => option.alias === 'B');

    if(countA > countB)
      return this.results.A;
    else
      return this.results.B;
  }

  nextQuestion(): Question | null {
    if (this.finished())
      return null;
    return this.questions[this.questionIndex++];
  }

  finished(): boolean {
    return this.questionIndex >= this.questions.length;
  }

  restart(): void {
    this.questionIndex = 0;
  }
}