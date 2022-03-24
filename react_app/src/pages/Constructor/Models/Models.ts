export enum QuestionTypes {
	string,
	checkbox,
	open_question,
	checkbox_open,
	number,
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

	update(){
		if (this.array !== []) this.setWithArray(this.array)
		else if (this.string) this.setWithString(this.string)
	}

	setForNewQuestion(parrentId: QuestionId,lastIndex: number){
		this.array = parrentId.array;
		this.array.push(lastIndex)
		this.update()
	}

	setIdNextToId(myId: QuestionId){
		this.array = myId.array;
		this.array[this.array.length-1] = this.array[this.array.length-1]+1 
		this.update()
	}

	//TODO: сделать метод сонст + передавать в него парент и намбер
	addElementForAnswer(id: number) {
		let newArray: Array<number> = this.array;
		newArray.push(id);

		this.string = QuestionId.getStringByArray(newArray);
		this.array = newArray;
	}
//TODO: report
	isParentQuestion():boolean
	{
		console.log('here')
		if (this.array.length > 1) return false;
		else return true;
	}
	static isParentQuestion(idStr: string):boolean
	{
		let newQId = new QuestionId()
		newQId.setWithString(idStr)

		if (newQId.array.length > 1) return false;
		else return true;
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

	addQuestionById(qId: QuestionId){
		this.autoSetQuestionList();

		let qIdArray = qId.array;
		let currentQuestionList: Array<Question> = this.questionList;
		for (let i: number = 0; i < qIdArray.length; i++) {
			let index = qIdArray[i] - 1;
			if (i !== qIdArray.length - 1) {
				currentQuestionList = currentQuestionList[index].answersList;
			}
			else {
				let newQ = new Question();
				newQ.constructorAnswer("*Введите текст*", QuestionTypes.string);

				newQ.id = new QuestionId();
				newQ.id.setForNewQuestion(qId,currentQuestionList[index].answersList.length+1)
				currentQuestionList[index].answersList.push(newQ);

				//currentQuestionList[index].answerToQuestion()
				// currentQuestionList[index].isQuestion = true;

				let parentQ = new Question()
				Object.assign(parentQ,currentQuestionList[index])

				parentQ.answerToQuestion()
				currentQuestionList[index] = parentQ

				// if (parentId.isParentQuestion())
				// 	currentQuestionList[index].haveSubquestion = false
				// else currentQuestionList[index].haveSubquestion = true
				
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
				currentQuestionList[index] = question;
			}
		}

		this.autoSetFields();
	}

	findQuestionById(qId: QuestionId): Question{
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

	getLastChildIdById(qId: QuestionId): QuestionId{
		
		let parentQuestion = this.findQuestionById(qId);
		let lastChildIndex = parentQuestion.answersList.length - 1

		let lastChildId = parentQuestion.answersList[lastChildIndex].id

		return lastChildId;

	}

	static test(): Questionnaire {
		let newQ: Questionnaire = new Questionnaire();
		newQ.questionList.push(Question.test());
		newQ.name = "Тест";
		newQ.id = 12;
		newQ.comment = "Комментарий";

		newQ.autoSetFields()

		return newQ;
	}
}

export class Question {
	text: string = "";
	isQuestion: boolean = false;//auto
	answersList: Array<Question> = [];//auto
	id: QuestionId = new QuestionId();//auto
	haveSubquestion: boolean = false;
	subText: string = "";
	redirectTo: QuestionId = new QuestionId();
	isAdditionalQuestion: boolean = false;//auto
	type: QuestionTypes = QuestionTypes.string;

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
		if (!QuestionId.isParentQuestion(this.id.string)){
			this.haveSubquestion = false;
		}
	}
	answerToQuestion() {
		this.isQuestion = true;
		if (!QuestionId.isParentQuestion(this.id.string)){
			this.haveSubquestion = true;
		}
	}

	addAnswer(text: string, type: QuestionTypes) {
		let answer: Question = new Question();
		answer.constructorAnswer(text, type);

		let parrentId: QuestionId = this.id;
		let newId: QuestionId = new QuestionId();
		newId.setWithString(parrentId.string);

		let newNum: number = this.answersList.length + 1;//TODO: govno, peredelai

		newId.addElementForAnswer(newNum);
		answer.id = newId;

		this.answersList.push(answer);
	}
	addQuestion(question: Question) {
		this.answersList.push(question);
	}

	// addQuestion(text: string, ){
	//     let question :Question = new Question();

	//     this.answersList.push(question)
	// }
	static test(): Question {
		let q = new Question();
		q.constructorQuestion("Какого вы пола?");
		q.id = new QuestionId();
		q.id.setWithString("1");
		q.addAnswer("мужской", QuestionTypes.string);
		q.addAnswer("женский", QuestionTypes.string);
		return q;
	}
}
