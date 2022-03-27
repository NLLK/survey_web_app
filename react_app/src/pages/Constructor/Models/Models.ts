import { TemplateTypes } from "../Templates/TemplateTypes";

export enum QuestionTypes {
	text,			//many
	number,			//one
	radio_button,	//many
	check_box,		//many
	date,			//one
	time,			//one
	order,			//many
	intervals,		//many
	rating			//many
}

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

	update() {
		if (this.array !== []) this.setWithArray(this.array)
		else if (this.string) this.setWithString(this.string)
	}

	setForNewQuestion(parrentId: QuestionId, lastIndex: number) {
		this.array = parrentId.array;
		this.array.push(lastIndex)
		this.update()
	}

	setIdNextToId(myId: QuestionId) {
		this.setWithArray(myId.array)
		this.array[this.array.length - 1] = this.array[this.array.length - 1] + 1
		this.update()
	}

	//TODO: сделать метод сонст + передавать в него парент и намбер
	addElementForAnswer(parrentId: QuestionId, id: number) {
		this.setWithString(parrentId.string)
		this.array.push(id)
		this.update()
	}
	//TODO: report
	isParentQuestion(): boolean {
		if (this.array.length > 1) return false;
		else return true;
	}

	static isParentQuestion(idStr: string): boolean {
		let newQId = new QuestionId()
		newQId.setWithString(idStr)

		if (newQId.array.length > 1) return false;
		else return true;
	}

	couldBeAdditional(): boolean {
		if (!this.isParentQuestion()) {
			if (this.array[this.array.length - 1] !== 1) return true;
		}
		return false
	}

	whoIsParent(): QuestionId {
		let parent = new QuestionId()
		parent.setWithString(this.string)
		parent.array = parent.array.slice(0, this.array.length - 1)
		parent.update()
		return parent
	}

	getRootQuestion(): QuestionId {
		let root = new QuestionId()

		root.setWithString(this.string)
		root.array = root.array.slice(0, 1)

		root.update()

		return root
	}


	static getArrayByString(string: string): Array<number> {
		let strArray = string.split(".");

		let numArray = strArray.map(Number);
		return numArray;
	}
	static getStringByArray(array: Array<number>): string {
		let string: string = "";

		for (let i: number = 0; i < array.length; i++) {
			string += array[i];
			if (i + 1 !== array.length) {
				string += ".";
			}
		}
		return string;
	}
}

export class Questionnaire {
	fields: string;
	id: number = -1;
	name: string;
	comment: string;
	introduction: string;
	questionList: Array<Question> = [];
	addRootQuestion() {
		let id: number = -1;
		if (this.questionList.length === 0) id = 1;
		else id = this.questionList.length + 1;

		let qid = new QuestionId();
		qid.setWithString(id.toString());

		let question = new Question();
		question.constructorQuestion("*Введите текст*");

		question.id = qid;
		question.haveSubquestion = false;

		this.questionList.push(question);

		this.autoSetFields()
	}
	autoSetQuestionList() {
		let fields: Array<Question> = [];
		Object.assign(fields, JSON.parse(this.fields))
		this.questionList = fields;
	}
	autoSetFields() {
		this.fields = JSON.stringify(this.questionList)
	}

	addQuestionById(qId: QuestionId) {
		this.autoSetQuestionList();

		let qIdArray = qId.array;
		let currentQuestionList: Array<Question> = this.questionList;
		for (let i: number = 0; i < qIdArray.length; i++) {
			let index = qIdArray[i] - 1;
			if (i !== qIdArray.length - 1) {
				currentQuestionList = currentQuestionList[index].answersList;
			}
			else {
				let parentQ = new Question()
				Object.assign(parentQ, currentQuestionList[index])

				let newQ = new Question();
				newQ.constructorAnswer("*Введите текст*", parentQ.type);

				newQ.id = new QuestionId();
				newQ.id.setForNewQuestion(qId, currentQuestionList[index].answersList.length + 1)
				currentQuestionList[index].answersList.push(newQ);

				parentQ.answerToQuestion()
				currentQuestionList[index] = parentQ

				break;
			}
		}
		this.autoSetFields();
	}

	modifyQuestionnaire(question: Question) {
		this.autoSetQuestionList();

		let qIdArray = question.id.array;
		let currentQuestionList: Array<Question> = this.questionList;
		for (let i: number = 0; i < qIdArray.length; i++) {
			let index = qIdArray[i] - 1;
			if (i !== qIdArray.length - 1) {
				currentQuestionList = currentQuestionList[index].answersList;
			}
			else {
				question.answersList.forEach(element => {
					if (!element.isQuestion)
						element.type = question.type
				});
				currentQuestionList[index] = question;

			}
		}

		this.autoSetFields();
	}

	findQuestionById(qId: QuestionId): Question {
		this.autoSetQuestionList();

		let qIdArray = qId.array;
		let currentQuestionList: Array<Question> = this.questionList;
		for (let i: number = 0; i < qIdArray.length; i++) {
			let index = qIdArray[i] - 1;
			if (i !== qIdArray.length - 1) {
				currentQuestionList = currentQuestionList[index].answersList;
			}
			else {
				return currentQuestionList[index]
			}
		}
	}

	getLastChildIdById(qId: QuestionId): QuestionId {

		let parentQuestion = this.findQuestionById(qId);
		let lastChildIndex = parentQuestion.answersList.length - 1

		let lastChildId = parentQuestion.answersList[lastChildIndex].id

		return lastChildId;

	}

	addQuestionsWithTemplate(template: TemplateTypes, question: Question) {
		switch (template) {
			case TemplateTypes.yes_no:
				{
					question.type = QuestionTypes.radio_button
					question.addAnswer("Да")
					question.addAnswer("Нет")
					break;
				}
			case TemplateTypes.rate:
				{
					question.type = QuestionTypes.rating
					let i = 1;
					for (i; i <= 5; i++) {
						question.addAnswer(i.toString())
					}
					break;
				}
			case TemplateTypes.segments:
				{
					question.type = QuestionTypes.intervals
					question.addAnswer("14..18")
					question.addAnswer("19..25")
					question.addAnswer("26..35")
					question.addAnswer("36..55")
					question.addAnswer("55..99")
					break;
				}
		}
		this.modifyQuestionnaire(question)
	}

	deleteQuestion(qId: QuestionId) {
		this.autoSetQuestionList();

		let qIdArray = qId.array;
		let parentId = qId.whoIsParent()

		let currentQuestionList: Array<Question> = this.questionList;
		for (let i: number = 0; i < qIdArray.length; i++) {
			let index = qIdArray[i] - 1;
			if (i !== qIdArray.length - 1) {
				currentQuestionList = currentQuestionList[index].answersList;
			}
			else {
				currentQuestionList.splice(index, 1)
				currentQuestionList = this.renameChildren(currentQuestionList, parentId)
			}
		}

		if (currentQuestionList.length === 0) {
			
			let parentIdArray = parentId.array

			currentQuestionList = this.questionList;
			for (let i: number = 0; i < parentIdArray.length; i++) {
				let index = parentIdArray[i] - 1;
				if (i !== parentIdArray.length - 1) {
					currentQuestionList = currentQuestionList[index].answersList;
				}
				else {
					let parQ = new Question()
					Object.assign(parQ, currentQuestionList[index])
					parQ.questionToAnswer()
					currentQuestionList[index] = parQ
				}
			}
		}


		this.autoSetFields();
	}

	renameChildren(questionList: Array<Question>, parentId: QuestionId): Array<Question> {

		let index = 1;

		questionList.forEach(question => {
			let newId = new QuestionId()
			newId.addElementForAnswer(parentId, index)

			let parId = new QuestionId()
			parId.setWithString(newId.string)
			question.id = parId
			index++;
		});

		return questionList
	}

}

export class Question {
	text: string = "";
	isQuestion: boolean = false;//auto
	answersList: Array<Question> = [];//auto
	id: QuestionId = new QuestionId();//auto
	haveSubquestion: boolean = false;//auto
	subText: string = "";
	redirectTo: QuestionId = new QuestionId();
	isAdditionalQuestion: boolean = false;
	type: QuestionTypes = QuestionTypes.text;

	// constructor() {

	// }

	constructorQuestion(text: string) {
		this.text = text;

		this.isQuestion = true;
		this.haveSubquestion = true;
	}

	constructorAnswer(text: string, type: QuestionTypes) {
		this.text = text;
		this.type = type;

		this.isQuestion = false;
	}

	questionToAnswer() {
		this.isQuestion = false;
		if (!QuestionId.isParentQuestion(this.id.string)) {
			this.haveSubquestion = false;
		}
	}
	answerToQuestion() {
		this.isQuestion = true;
		if (!QuestionId.isParentQuestion(this.id.string)) {
			this.haveSubquestion = true;
		}
	}

	addAnswer(text: string) {
		if (!this.isQuestion)
			this.answerToQuestion()

		let type = this.type

		let answer = new Question();
		answer.constructorAnswer(text, type);

		let parrentId = this.id;
		let newId = new QuestionId();

		newId.addElementForAnswer(parrentId, this.answersList.length + 1)


		answer.id = newId;

		this.answersList.push(answer);
	}
	addQuestion(question: Question) {
		this.answersList.push(question);
	}
}
