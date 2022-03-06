export enum QuestionTypes { string, checkbox, open_question, checkbox_open, number }

export class QuestionId {
	string: string = null;
	array: Array<number> = [];

	setWithString(string: string) {
		this.string = string;
		this.array = QuestionId.getArrayByString(string);
	}
	setWithArray(array: Array<number>) {
		this.array = array;
		this.string = QuestionId.getStringByArray(array);
	}
//TODO: сделать метод сонст + передавать в него парент и намбер
	addElementForAnswer(id: number) {
		let newArray: Array<number> = this.array;
		newArray.push(id);

		this.string = QuestionId.getStringByArray(newArray)
		this.array = newArray;
	}

	static getArrayByString(string: string): Array<number> {
		let strArray = string.split('.')

		let numArray = strArray.map(Number)
		return numArray;
	}
	static getStringByArray(array: Array<number>): string {
		let string: string = "";

		for (let i: number = 0; i < array.length; i++) {
			string+=array[i];
			if (i+1 !== array.length){
				string+='.';
			}
		}

		return string;
	}

}

export class Questionnaire {
	questions: Array<Question>;

	addRootQuestion(question: Question) {
		let id: number = -1;
		if (this.questions.length === 0)
			id = 1;
		else id = this.questions.length + 1;

		let qid = new QuestionId()
		qid.setWithString(id.toString())
		question.id = qid;

		this.questions.push(question);
	}
}

export class Question {
	text: string = "";
	isQuestion: boolean = false;
	answersList: Array<Question> = [];
	id: QuestionId = new QuestionId();
	haveSubquestion: boolean = false;
	subText: string = "";
	redirectTo: QuestionId = new QuestionId();
	connectedQuestionList: Array<Question> = [];
	type: QuestionTypes = QuestionTypes.string;

	// constructor() {

	// }

	constructorQuestion(text: string) {
		this.text = text;

		this.isQuestion = true;
	}

	constructorAnswer(text: string, type: QuestionTypes) {
		this.text = text;
		this.type = type;

		this.isQuestion = false;
	}

	questionToAnswer() {

	}
	answerToQuestion() {

	}

	addAnswer(text: string, type: QuestionTypes) {
		let answer: Question = new Question();
		answer.constructorAnswer(text, type);

		let parrentId: QuestionId = this.id
		let newId: QuestionId = new QuestionId();
		newId.setWithString(parrentId.string)

		let newNum: number = this.answersList.length + 1;

		newId.addElementForAnswer(newNum)
		answer.id = newId;

		this.answersList.push(answer);
	}
	addQuestion(question: Question) {
		this.answersList.push(question)
	}
	// addQuestion(text: string, ){
	//     let question :Question = new Question();



	//     this.answersList.push(question)
	// }
	static test(): Question {
		let q = new Question();
		q.text = "Какого вы пола?"
		q.id = new QuestionId()
		q.id.setWithString('1')
		q.addAnswer('мужской', QuestionTypes.string)
		q.addAnswer('женский', QuestionTypes.string)
		return q;
	}
}