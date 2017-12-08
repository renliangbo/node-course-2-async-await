const users = [
		{
				id: 1,
				name: 'Andrew',
				schoolId: 101
		}, {
				id: 2,
				name: 'Jess',
				schoolId: 999
		}
];

const grades = [
		{
				id: 1,
				schoolId: 101,
				grade: 86
		}, {
				id: 2,
				schoolId: 101,
				grade: 100
		}, {
				id: 3,
				schoolId: 999,
				grade: 80
		}
];

const getUser = (id) => {
		return new Promise((resolve, reject) => {
				const user = users.find((user) => user.id === id);
				if (user) {
						resolve(user)
				} else {
						reject(`unable to find user with id of ${id}`)
				}
		})
};

const getGrades = (schoolId) => {
		return new Promise((resolve, reject) => {
				const gradesFound = grades.filter((grade) => grade.schoolId === schoolId);
				resolve(gradesFound);
		})
}

const getStatus = (id) => {
		let user;
		return getUser(id).then((tempUser) => {
				user = tempUser;
				return getGrades(user.schoolId)
		}).then((grades) => {
				let average = 0;
				if (grades.length > 0) {
						average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length
				};
				return `${user.name} has a ${average}% in the class`
		})
};
const getStatusAlt = async(userId) => {
		const user = await getUser(userId);
		const grades = await getGrades(user.schoolId);
		let average = 0;
		if (grades.length > 0) {
				average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length
		};
		return `${user.name} has a ${average}% in the class`
}
getStatusAlt(3).then((status) => {
		console.log(status)
}).catch((err) => {
		console.log(err)
})
// getUser(3).then((user) => { 		console.log(user) }).catch((e) => {
// 		console.log(e); }); getGrades(10).then((grades) => { 		console.log(grades)
// ike