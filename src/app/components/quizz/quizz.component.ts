import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/model/option';
import { Question } from 'src/app/model/question';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string
  questionSelected: Question | null;
  answers: Option[];
  finished: boolean;
  result: string;

  constructor(private quizz: QuizzService) {
    this.title = '';
    this.questionSelected = null;
    this.answers = [];
    this.finished = false;
    this.result = '';
  }

  ngOnInit(): void {
    this.title = this.quizz.getTitle();
    this.questionSelected = this.quizz.nextQuestion();
    this.finished = this.quizz.finished();
  }

  playerChoose(option: Option) {
    this.answers.push(option);
    this.nextStep();
  }

  private nextStep() {
    this.finished = this.quizz.finished();
    if (!this.finished)
      this.questionSelected = this.quizz.nextQuestion();
    else
      this.result = this.quizz.getResults(this.answers);
  }

  restart() {
    this.quizz.restart();
    this.answers = [];
    this.result = ''
    this.questionSelected = null;
    this.nextStep();
  }
}
