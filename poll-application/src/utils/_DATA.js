let users = {
	carlRichardson: {
		id: "carlRichardson",
		name: "Carl Richardson",
		avatarURL: "https://th.bing.com/th/id/R.2ef1b5e1f7e72cc9c637ace891acab24?rik=jfSlVLBAzwHsdQ&riu=http%3a%2f%2fa.espncdn.com%2fcombiner%2fi%3fimg%3d%2fi%2fheadshots%2frecruiting%2fncf%2fplayers%2f190%2f182866.jpg%26w%3d190%26h%3d254&ehk=hT%2fKr25Kyxw56KkkO2Qh64y7fOIdKBwZgypXsIYxxFk%3d&risl=&pid=ImgRaw&r=0",
		answers: {
			"8xf0y6ziyjabvozdd253nd": "optionOne",
			"6ni6ok3ym7mf1p33lnez": "optionTwo",
			am8ehyc8byjqgar0jgpub9: "optionTwo",
			loxhs1bqm25b708cmbf3g: "optionTwo",
		},
		questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
	},
	tamNguyen: {
		id: "tamNguyen",
		name: "Tam Nguyen",
		avatarURL: "https://4.bp.blogspot.com/-wpLp_hRxmQE/VPDMqZgxrmI/AAAAAAAAD_o/FWxuADyRWtY/s1600/10%2Bhang1.jpg",
		answers: {
			vthrdm985a262al8qx3do: "optionOne",
			xj352vofupe1dqz9emx13r: "optionTwo",
		},
		questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
	},
	stacyCarls: {
		id: "stacyCarls",
		name: "Stacy Carls",
		avatarURL: "https://th.bing.com/th/id/R.239be59137183a01caf582cc953229df?rik=IopBSiZPUol2MA&riu=http%3a%2f%2fwww.newdvdreleasedates.com%2fimages%2fprofiles%2fkaren-gillan-06.jpg&ehk=4xaQz7qNetUY7bobga58x2UfQdxcyyWFlGcZ7DpVMv4%3d&risl=&pid=ImgRaw&r=0",
		answers: {
			xj352vofupe1dqz9emx13r: "optionOne",
			vthrdm985a262al8qx3do: "optionTwo",
			"6ni6ok3ym7mf1p33lnez": "optionTwo",
		},
		questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
	},
};

let questions = {
	"8xf0y6ziyjabvozdd253nd": {
		id: "8xf0y6ziyjabvozdd253nd",
		author: "carlRichardson",
		timestamp: 1467166872634,
		optionOne: {
			votes: ["carlRichardson"],
			text: "have horrible short term memory",
		},
		optionTwo: {
			votes: [],
			text: "have horrible long term memory",
		},
	},
	"6ni6ok3ym7mf1p33lnez": {
		id: "6ni6ok3ym7mf1p33lnez",
		author: "stacyCarls",
		timestamp: 1468479767190,
		optionOne: {
			votes: [],
			text: "become a superhero",
		},
		optionTwo: {
			votes: ["stacyCarls", "carlRichardson"],
			text: "become a supervillain",
		},
	},
	am8ehyc8byjqgar0jgpub9: {
		id: "am8ehyc8byjqgar0jgpub9",
		author: "carlRichardson",
		timestamp: 1488579767190,
		optionOne: {
			votes: [],
			text: "be telekinetic",
		},
		optionTwo: {
			votes: ["carlRichardson"],
			text: "be telepathic",
		},
	},
	loxhs1bqm25b708cmbf3g: {
		id: "loxhs1bqm25b708cmbf3g",
		author: "tamNguyen",
		timestamp: 1482579767190,
		optionOne: {
			votes: [],
			text: "be a front-end developer",
		},
		optionTwo: {
			votes: ["carlRichardson"],
			text: "be a back-end developer",
		},
	},
	vthrdm985a262al8qx3do: {
		id: "vthrdm985a262al8qx3do",
		author: "tamNguyen",
		timestamp: 1489579767190,
		optionOne: {
			votes: ["tamNguyen"],
			text: "eating a Big Mac at McDonalds",
		},
		optionTwo: {
			votes: ["stacyCarls"],
			text: "eating a Whopper at Burger King",
		},
	},
	xj352vofupe1dqz9emx13r: {
		id: "xj352vofupe1dqz9emx13r",
		author: "stacyCarls",
		timestamp: 1493579767190,
		optionOne: {
			votes: ["stacyCarls"],
			text: "write JavaScript",
		},
		optionTwo: {
			votes: ["tamNguyen"],
			text: "write Swift",
		},
	},
};

function generateUID() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function _getUsers() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...users }), 1000);
	});
}

export function _getQuestions() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...questions }), 1000);
	});
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		},
	};
}

export function _saveQuestion(question) {
	return new Promise((res, rej) => {
		const authedUser = question.author;
		const formattedQuestion = formatQuestion(question);

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion,
			};

			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					questions: users[authedUser].questions.concat([formattedQuestion.id]),
				},
			};

			res(formattedQuestion);
		}, 1000);
	});
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					answers: {
						...users[authedUser].answers,
						[qid]: answer,
					},
				},
			};

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid][answer],
						votes: questions[qid][answer].votes.concat([authedUser]),
					},
				},
			};

			res();
		}, 500);
	});
}
