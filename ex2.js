var hasPaid = record => record.paid;

var isNotEnrolled = id => !currentEnrollment.includes(id);

var getRecordsById = recordIds => {
	var records = recordIds.map(id => {
		return studentRecords.find(record => record.id == id);
	});
	return records;
}

var getId = record => record.id;

var printRecords = recordIds => {
	var records = getRecordsById(recordIds)

	records = records.sort((a, b) => {
		if (a.name < b.name) return -1
		if (a.name > b.name) return 1
		return 0
	});

	records.forEach(record => {
		var suffix = "Not Paid";
		if (record.paid) {
			suffix = "Paid"
		}
		console.log(record.name, `(${record.id}):`, suffix);
	});
}

var paidStudentsToEnroll = () => {
	var newEnrollment = studentRecords.filter(record => {
		return hasPaid(record) && isNotEnrolled(record.id);
	}).map(getId);

	return [...currentEnrollment, ...newEnrollment];
}

var remindUnpaid = recordIds => {
	var unpaidRecords = (
		getRecordsById(recordIds)
			.filter(record => !hasPaid(record))
	);

	printRecords(unpaidRecords.map(getId));
}


// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
