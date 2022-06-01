function getHe() {
	switch (V.pronoun) {
		case 'm':
			T.postNum=1;return '그';
		case 'f':
			T.postNum=1;return '그녀';
		case 'i':
			T.postNum=0;return '녀석';
		case 'n':
			T.postNum=1;return '그자';
		case 't':
			T.postNum=2;return '그들';
		default:
			DOL.Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=2;return '그들';
	}
}
/** ?he - Returns the pronoun based on whatever $pronoun is set to.
 *		  Call ?he in TwineScript after calling <<person1>> to use. */
Template.add('he', getHe);
/** ?He - Capitalised version of above. */
Template.add('He', function() {
	return getHe.call(this).toUpperFirst();
});

function getHim() {
	switch (V.pronoun) {
		case 'm':
			T.postNum=1;return '그';
		case 'f':
			T.postNum=1;return '그녀';
		case 'i':
			T.postNum=0;return '녀석';
		case 'n':
		case 't':
			T.postNum=2;return '그들';
		default:
			DOL.Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=2;return '그들';
	}
}
/** ?him - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?him in TwineScript after calling <<person1>> to use. */
Template.add('him', getHim);
/** ?Him - Capitalised version of above. */
Template.add('Him', function() {
	return getHim.call(this).toUpperFirst();
});

function getHis() {
	switch (V.pronoun) {
		case 'm':
			T.postNum=1;return '그';
		case 'f':
			T.postNum=1;return '그녀';
		case 'i':
			T.postNum=0;return '녀석';
		case 'n':
			T.postNum=1;return '그자';
		case 't':
			T.postNum=2;return '그들';
		default:
			DOL.Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=2;return '그들';
	}
}
/** ?his - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?his in TwineScript after calling <<person1>> to use. */
Template.add('his', getHis);
/** ?His - Capitalised version of above. */
Template.add('His', function() {
	return getHis.call(this).toUpperFirst();
});

function getHeIs() {
	switch (V.pronoun) {
		case 'm':
			T.postNum=1;return "그";
		case 'f':
			T.postNum=1;return "그녀";
		case 'i':
			T.postNum=0;return "녀석";
		case 'n':
			T.postNum=1;return "그자";
		case 't':
			T.postNum=2;return "그들";
		default:
			DOL.Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=2;return "그들";
	}
}
/** ?hes - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?hes in TwineScript after calling <<person1>> to use. */
Template.add('hes', getHeIs);
/** ?Hes - Capitalised version of above. */
Template.add('Hes', function() {
	return getHeIs.call(this).toUpperFirst();
});

function getHers() {
	switch (V.pronoun) {
		case 'm':
			T.postNum=0;return '그의 것';
		case 'f':
			T.postNum=0;return '그녀의 것';
		case 'i':
			T.postNum=0;return '녀석의 것';
		case 'n':
			T.postNum=0;return '그자의 것';
		case 't':
			T.postNum=0;return '그들의 것';
		default:
			DOL.Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=0;return '그들의 것';
	}
}
/** ?hers - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?hers in TwineScript after calling <<person1>> to use. */
Template.add('hers', getHers);
/** ?Hers - Capitalised version of above. */
Template.add('Hers', function() {
	return getHers.call(this).toUpperFirst();
});

function getHimself() {
	switch (V.pronoun) {
		case 'm':
			T.postNum=0;return '그 자신';
		case 'i':
			T.postNum=0;return '녀석 자신';
		case 'f':
		case 'n':
		case 't':
			T.postNum=0;return '그녀 자신';
		default:
			DOL.Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=0;return '그들 자신';
	}
}
/** ?himself - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?himself in TwineScript after calling <<person1>> to use. */
Template.add('himself', getHimself);
/** ?Himself - Capitalised version of above. */
Template.add('Himself', function() {
	return getHimself.call(this).toUpperFirst();
});

function getPeople() {
	switch (V.malechance) {
		case 100:
			T.postNum=2;return '남자들';
		case 0:
			T.postNum=2;return '여자들';
		default:
			T.postNum=2;return '남자 여자들';
	}
}
/** ?people - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?people in TwineScript after calling <<person1>> to use. */
Template.add('people', getPeople);
/** ?People - Capitalised version of above. */
Template.add('People', function() {
	return getPeople.call(this).toUpperFirst();
});

function getPeopleYoung() {
	switch (V.malechance) {
		case 100:
			T.postNum=2;return '소년들';
		case 0:
			T.postNum=2;return '소녀들';
		default:
			T.postNum=2;return '소년 소녀들';
	}
}
/** ?peopley - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?peopley in TwineScript after calling <<person1>> to use. */
Template.add('peopley', getPeopleYoung);
/** ?Peopley - Capitalised version of above. */
Template.add('Peopley', function() {
	return getPeopleYoung.call(this).toUpperFirst();
});
