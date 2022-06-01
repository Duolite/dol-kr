window.mapMove = function (moveTo) {
	var currentPassage = V.passage;
	var destination_table = [];
	for (var i = 1; i < V.link_table.length; i++) {
		var temp = V.link_table[i].split("|")[1];
		if (temp) {
			destination_table[destination_table.length] = temp.split("]]")[0];
		}
	}
	var available = V.map.available;

	if (V.debug == 1 || available[currentPassage].includes(moveTo) && destination_table.includes(moveTo))
	//if(V.debug == 1 || available[currentPassage].includes(moveTo))
	{
		new Wikifier(null, '<<pass 5>>');
		SugarCube.State.display(moveTo);
	}
}

window.shopClothingFilterToggleTrait = function(trait) {
	let traits = V.shopClothingFilter.traits;
	if (traits) {
		let index = traits.indexOf(trait)
		if (index == -1) {
			traits.push(trait)
		} else {
			traits.splice(index, 1)
		}
	}
}

window.shopClothingFilterSortOnDescription = function(traitOne, traitTwo) {
	let descriptionOne = Wikifier.wikifyEval(`<<shopTraitDescription ${traitOne}>>`).textContent.trim();
	let descriptionTwo = Wikifier.wikifyEval(`<<shopTraitDescription ${traitTwo}>>`).textContent.trim();

	return descriptionOne > descriptionTwo
}

window.wikifier = function (widget, arg1, arg2, arg3) {
	if (arg3 !== undefined) {
		new Wikifier(null, '<<' + widget + ' ' + arg1 + ' ' + arg2 + ' ' + arg3 + '>>');
	}
	else if (arg2 !== undefined) {
		new Wikifier(null, '<<' + widget + ' ' + arg1 + ' ' + arg2 + '>>');
	}
	else if (arg1 !== undefined) {
		new Wikifier(null, '<<' + widget + ' ' + arg1 + '>>');
	}
	else if (arg1 === undefined) {
		new Wikifier(null, '<<' + widget + '>>');
	}
}

window.wikifier2 = function (str) {
	new Wikifier(null, str);
}

window.actionsreplace = function (bodypart) {
	var check = bodypart+"target";
	if (V[check] == "tentacles"){
		new Wikifier(null, '<<replace #'+ bodypart + 'action>><<'+ bodypart + 'ActionInitTentacle>><</replace>>');
	}else if (V[check] == "swarm"){
		new Wikifier(null, '<<replace #'+ bodypart + 'action>><<'+ bodypart + 'ActionInitSwarm>><</replace>>');
	}else if (V[check] == "vore"){
		new Wikifier(null, '<<replace #'+ bodypart + 'action>><<'+ bodypart + 'ActionInitVore>><</replace>>');
	}else if (V[check] == "struggle"){
		new Wikifier(null, '<<replace #'+ bodypart + 'action>><<'+ bodypart + 'ActionInitStruggle>><</replace>>');
	}else if (V[check] == "machine"){
		new Wikifier(null, '<<replace #'+ bodypart + 'action>><<'+ bodypart + 'ActionInitMachine>><</replace>>');
	}else if (V[check] == "self"){
		new Wikifier(null, '<<replace #'+ bodypart + 'action>><<'+ bodypart + 'ActionInitSelf>><</replace>>');
	}else{
		new Wikifier(null, '<<replace #'+ bodypart + 'action>><<'+ bodypart + 'ActionInit>><</replace>>');
	}
}

window.combatListColor = function (name, value, type) {
	var color = "";
	var check = "";
	if (value != undefined) {
		check = value;
	} else {
		check = V[name];
	}
	if (type === "") {
		switch (check) {
			/*leftaction or rightaction*/
			case "steal": case "penwhack": case "freeface": case "leftcovervagina": case "leftcoverpenis": case "leftcoveranus":
			case "rightcovervagina": case "rightcoverpenis": case "rightcoveranus":
			case "leftunderpull": case "leftskirtpull": case "leftlowerpull": case "leftupperpull":
			case "rightunderpull": case "rightskirtpull": case "rightlowerpull": case "rightupperpull": case "rightUndressOther": case "leftUndressOther":
			case "stopchoke": case "clench": case "shacklewhack": case "leftfold": case "rightfold": case "dildowhack":
			case "leftstruggleweak": case "rightstruggleweak":
			case "leftresistW": case "rightresistW": case "leftstillW": case "rightstillW":
			/*feetaction*/
			case "run": case "hide": case "confront": case "feetresistW":
			/*mouthaction*/
			case "pullaway": case "pullawayvagina": case "finish": case "novaginal": case "nopenile": case "noanal": case "scream":
			case "mock": case "breastclosed": case "breastpull": case "pullawaykiss": case "noupper":
			case "up": case "stifleorgasm": case "stifle":
			case "mouthresistW": case "handcloseW":
			/*penisaction*/
			case "othermouthescape": case "escape": case "otheranusescape": case "fencingescape" :
			/*vaginaaction*/
			case "tribescape":
			/*anusaction*/
			case "doubleescape":
				color = "brat";
				break;

			/*leftaction or rightaction*/
			case "spray": case "lefthit": case "righthit": case "leftstruggle": case "rightstruggle": case "stopchokenoncon": case "pursuit_grab":
			/*feetaction*/
			case "kick":
			/*mouthaction*/
			case "bite": case "demand": case "breastbite": case "handbite": case "headbutt": case "bitepussy":
				color = "def";
				break;
			/*leftaction or rightaction*/
			case "behind": case "fold":
			case "leftcovervaginameek": case "leftcoverpenismeek": case "leftcoveranusmeek":
			case "rightcovervaginameek": case "rightcoverpenismeek": case "rightcoveranusmeek":
			case "leftprotect": case "rightprotect": case "leftgrip": case "rightgrip":
			case "leftcurl": case "rightcurl": case "pickupSexToy":
			/*mouthaction*/
			case "grasp": case "plead": case "forgive": case "down":
			case "letout": case "letoutorgasm": case "noises": case "pay":
			/*penisaction*/
			case "thighbay": case "bay": case "otheranusbay":
			/*vaginaaction*/
			case "penisthighs":
			/*anusaction*/
			case "bottombay": case "penischeeks": case "penispussy": case "penispussydap": case "penisanus": case "bottomhandbay":
				color = "meek";
				break;

			/*leftaction or rightaction*/
			case "leftplay": case "leftgrab": case "leftstroke": case "leftchest": case "rightplay": case "rightgrab": case "rightstroke": case "rightchest":
			case "leftchest": case "rightchest": case "leftwork": case "rightwork": case "leftclit": case "rightclit": case "keepchoke":
			case "leftmasturbatepussy" : case "rightmasturbatepussy" : case "leftmasturbatepenis" : case "rightmasturbatepenis" :
			case "lefthandholdkeep" : case "righthandholdkeep" : case "lefthandholdnew" : case "righthandholdnew" :
			case "lubeanus": case "lubepussy": case "lubepenis": case "removebuttplug":
			case "dildoOtherPussyTease": case "dildoOtherPussyFuck": case "dildoOtherAnusTease": case "dildoOtherAnusFuck": case "strokerOtherPenisTease": case "strokerOtherPenisFuck":
			case "dildoSelfPussyEntrance": case "dildoSelfAnusEntrance": case "dildoSelfPussy": case "dildoSelfAnus": case "strokerSelfPenisEntrance": case "strokerSelfPenis":
			/*feetaction*/
			case "grab": case "vaginagrab": case "grabrub": case "vaginagrabrub": case "rub":
			/*mouthaction*/
			case "peniskiss": case "kisslips" : case "kissskin": case "suck": case "lick": case "moan": case "breastsuck": case "breastlick": case "swallow": case "movetochest":
			case "othervagina": case "mouth": case "kissback": case "vaginalick": case "askchoke": case "anallick": case "analkiss":
			/*penisaction*/
			case "penistovagina": case "penistoanus": case "penisvaginafuck": case "penisanusfuck": case "othermouthtease": case "othermouthrub":
			case "othermouthcooperate": case "tease": case "cooperate": case "otheranustease": case "otheranusrub": case "otheranuscooperate": case "clitrub":
			case "vaginaEdging": case "otheranusEdging": case "handtease": case "handAnusRub": case "handcooperate": case "strokerCooperate":
			/*fencing*/
			case "otherpenisrub": case "penistopenis": case "penistopenisfuck": case "fencingcooperate":
			/*vaginaaction*/
			case "vaginatopenis": case "vaginapenisfuck": case "othervaginarub": case "vaginatovagina": case "vaginatovaginafuck": case "tribcooperate": case "penisEdging":
			case "vaginatopenisdouble": case "vaginapenisdoublefuck": case "penispussydouble": case "penisanusdvp":
			/*anusaction*/
			case "anustopenis": case "anuspenisfuck": case "penistease": case "otherMouthAnusRub": case "otherAnusRub": case "penisEdging":
			/*doubleanusaction*/
			case "anustopenisdouble": case "anuspenisdoublefuck": case "penisdoubletease": case "penisDoubleEdging": case "doublecooperate": case "penisanusdouble":
				color = "sub";
				break;

			/*leftaction or rightaction*/
			case "leftacceptW": case "rightacceptW": case "leftstruggleW": case "rightstruggleW":
			/*feetaction*/
			case "feetacceptW":
			/*mouthaction*/
			case "mouthacceptW": case "handbiteW":
				color = "wraith";
				break;

			default:
				color = "white";
				break;
		}
	}
	else if (type === "Tentacle") {
		switch (check.replace(/\d+/g, '')) {
			/*leftaction or rightaction*/
			case "lefthittentacle": case "righthittentacle":
			case "lefthit": case "righthit":
			case "leftbanish": case "rightbanish":
			/*feetaction*/
			case "feethit":
			/*mouthaction*/
			case "mouthbitetentacle":
				color = "def";
				break;

			/*leftaction or rightaction*/
			case "leftfold": case "rightfold": case "leftstruggleweak": case "rightstruggleweak":
			/*mouthaction*/
			case "mouthpullawaytentacle": case "stifleorgasm": case "stifle":
			/*penisaction*/
			case "penispullawaytentacle":
			/*vaginaaction*/
			case "vaginapullawaytentacle":
			/*anusaction*/
			case "anuspullawaytentacle":
				color = "brat";
				break;

			/*leftaction or rightaction*/
			case "leftgrabtentacle": case "rightgrabtentacle": case "leftrubtentacle": case "rightrubtentacle":
			case "showbottomtentacle": case "showthighstentacle": case "showmouthtentacle": case "showpenistentacle": case "showvaginatentacle":
			case "leftgrab": case "rightgrab": case "leftrub": case "rightrub":
			case "showbottom": case "showthighs": case "showmouth":
			/*feetaction*/
			case "feetgrab": case "feetrubtentacle":
			/*mouthaction*/
			case "mouthlicktentacle": case "mouthkisstentacle": case "mouthcooperatetentacle":
			/*penisaction*/
			case "penisrubtentacle": case "peniscooperatetentacle":
			/*vaginaaction*/
			case "vaginarubtentacle": case "vaginacooperatetentacle":
			/*anusaction*/
			case "anusrubtentacle": case "anuscooperatetentacle":
			/*bottomuse*/
			case "bottomrubtentacle":
			/*breastuse*/
			case "chestrubtentacle":
				color = "sub";
				break;

			/*leftaction or rightaction*/
			case "leftprotect": case "rightprotect": case "leftgrip": case "rightgrip": case "leftcurl": case "rightcurl":
			/*mouthaction*/
			case "letout": case "letoutorgasm": case "noises":
				color = "meek";
				break;

			default:
				color = "white";
				break;
		}
	}
	else if (type === "Vore") {
		switch (check.replace(/\d+/g, '')) {
			case "leftescape": case "rightescape": case "lefthold": case "righthold": case "leftvorefree": case "rightvorefree":
			case "leftfold": case "rightfold": case "leftstruggleweak": case "rightstruggleweak":
				color = "brat";
				break;

			case "leftprotect": case "rightprotect": case "leftgrip": case "rightgrip": case "leftcurl": case "rightcurl":
				color = "meek";
				break;

			default:
				color = "white";
				break;
		}

	}
	else if (type === "Swarm") {
		switch (check.replace(/\d+/g, '')) {
			/*leftaction or rightaction*/
			case "leftfree": case "rightfree": case "frontpurgeleft": case "frontpurgeright":
			case "frontclearleft": case "frontclearright": case "backpurgeleft": case "backpurgeright":
			case "backclearleft": case "backclearright": case "chestclearleft": case "chestclearright":
			case "leftfold": case "rightfold": case "leftstruggleweak": case "rightstruggleweak":
				color = "brat";
				break;

			case "leftprotect": case "rightprotect": case "leftgrip": case "rightgrip": case "leftcurl": case "rightcurl":
				color = "meek";
				break;

			case "swim":
				color = "teal";
				break;

			default:
				color = "white";
				break;
		}

	}
	else if (type === "Struggle") {
		switch (check.replace(/\d+/g, '')) {
			/*leftaction or rightaction*/
			case "mouth_strengthen": case "mouth_grasp": case "vagina_strengthen": case "vagina_grasp":
			case "penis_strengthen": case "penis_grasp": case "anus_strengthen": case "anus_grasp":
			case "chest_strengthen": case "chest_grasp":
			case "leftfold": case "rightfold": case "leftstruggleweak": case "rightstruggleweak":
				color = "brat";
				break;

			/*leftaction or rightaction*/
			case "leftprotect": case "rightprotect": case "leftgrip": case "rightgrip": case "leftcurl": case "rightcurl":
			case "rest":
			/*feetaction*/
			case "evade": case "plant":
				color = "meek";
				break;

			/*leftaction or rightaction*/
			case "capture": case "mouth_pull": case "mouth_spray": case "vagina_pull": case "vagina_spray":
			case "penis_pull": case "penis_spray": case "anus_pull": case "anus_spray": case "chest_pull": case "chest_spray":
			/*mouthaction*/
			case "bite":
				color = "def";
				break;

			/*leftaction or rightaction*/
 			case "mouth_stroke": case "vagina_stroke": case "penis_stroke": case "anus_stroke": case "chest_stroke":
			/*mouthaction*/
			case "open": case "suck":
				color = "sub";
				break;

			default:
				color = "white";
				break;
		}

	}
	else if (type === "Machine") {
		switch (check.replace(/\d+/g, '')) {
			case "leftfold": case "rightfold": case "leftstruggleweak": case "rightstruggleweak": case "vaginal_push": case "anal_push":
				color = "brat";
				break;

			case "chain_struggle": case "whack": case "vaginal_whack": case "anal_whack":
				color = "def";
				break;

			case "leftprotect": case "rightprotect": case "leftgrip": case "rightgrip": case "leftcurl": case "rightcurl":
				color = "sub";
				break;

			default:
				color = "white";
				break;
		}

	}
	else if (type === "Self") {
		switch (check.replace(/\d+/g, '')) {
			/*leftaction or rightaction*/
			case "leftfree": case "rightfree":
			case "leftcovervagina": case "leftcoverpenis": case "leftcoveranus":
			case "rightcovervagina": case "rightcoverpenis": case "rightcoveranus":
			case "leftunderpull": case "leftskirtpull": case "leftlowerpull": case "leftupperpull":
			case "rightunderpull": case "rightskirtpull": case "rightlowerpull": case "rightupperpull":
			case "leftcovervagina": case "leftcoverpenis": case "leftcoveranus":
			case "rightcovervagina": case "rightcoverpenis": case "rightcoveranus":
			case "leftunderpull": case "leftskirtpull": case "leftlowerpull": case "leftupperpull":
			case "rightunderpull": case "rightskirtpull": case "rightlowerpull": case "rightupperpull":
			case "leftfold": case "rightfold": case "leftstruggleweak": case "rightstruggleweak":
				color = "brat";
				break;

			/*leftaction or rightaction*/
			case "leftprotect": case "rightprotect": case "leftgrip": case "rightgrip": case "leftcurl":
			case "rightcurl": case "behind": case "pickupSexToy":
			/*feetaction*/
			case "evade": case "plant":
				color = "meek";
				break;

			/* Masturbate */
			case "leftmasturbatepenis" : case "rightmasturbatepenis" : case "leftmasturbatepussy" : case "rightmasturbatepussy" :
			case "dildoSelfPussyEntrance": case "dildoSelfAnusEntrance": case "strokerSelfPenisEntrance": case "strokerSelfPenis":
			case "lubepussy": case "lubepenis": case "lubeanus": case "removebuttplug":
				color = "sub";
				break;

			case "swim":
				color = "teal";
				break;

			default:
				color = "white";
				break;
		}

	}
	return color;
}

DefineMacroS("combatListColor", combatListColor);

function combatButtonAdjustments(name, extra) {
	jQuery(document).on('change', '#listbox-' + name, { "name": name, "extra": extra }, function (e) {
		/*console.log(e.data);*/
		new Wikifier(null, '<<replace #' + e.data.name + 'Difficulty>><<' + e.data.name + 'Difficulty' + e.data.extra + '>><</replace>>');
		$('#' + e.data.name + 'Select').removeClass('whiteList bratList meekList defList subList');
		$('#' + e.data.name + 'Select').addClass(combatListColor(e.data.name, undefined, e.data.extra) + "List");
	});
	return "";
}

DefineMacroS("combatButtonAdjustments", combatButtonAdjustments);

function combatDefaults() {
	jQuery(document).on('change', '#listbox--defaultoption', function (e) {
		new Wikifier(null, '<<replace #othersFeelings>><<othersFeelings ' + this.value + '>><</replace>>');
	});
	return "";
}

DefineMacroS("combatDefaults", combatDefaults);

function hairdressersReset() {
	jQuery(document).on('change', '.macro-listbox', function (e) {
		new Wikifier(null, '<<replace #hairDressers>><<hairDressersOptions>><</replace>>');
		new Wikifier(null, '<<replace #currentCost>>To pay: £<<print _currentCost / 100>><</replace>>');
	});
	return "";
}

DefineMacroS("hairdressersReset", hairdressersReset);

function hairdressersResetAlt() {
	jQuery(document).on('click', '.macro-cycle', function (e) {
		new Wikifier(null, '<<replace #hairDressersSydney>><<hairDressersOptionsSydney>><</replace>>');
		new Wikifier(null, '<<replace #currentCost>>To pay: £<<print _currentCost / 100>><</replace>>');
	});
	return "";
}

DefineMacroS("hairdressersResetAlt", hairdressersResetAlt);

function browsDyeReset() {
	jQuery(document).on('change', '#listbox-browsdyeoption', function (e) {
		new Wikifier(null, '<<replace #browsColourPreview>><<browsColourPreview>><</replace>>');
	});
	return "";
}

DefineMacroS("browsDyeReset", browsDyeReset);

function NPCSettingsReset() {
	jQuery(document).on('change', '#listbox--npcid', function (e) {
		new Wikifier(null, '<<replace #npcSettingsMenu>><<npcSettingsMenu>><</replace>>');
	});
	return "";
}

DefineMacroS("NPCSettingsReset", NPCSettingsReset);

function loveInterestFunction() {
	jQuery(document).on('change', '#listbox-loveinterestprimary', function (e) {
		new Wikifier(null, '<<replace #loveInterest>><<loveInterest>><</replace>>');
	});
	jQuery(document).on('change', '#listbox-loveinterestsecondary', function (e) {
		new Wikifier(null, '<<replace #loveInterest>><<loveInterest>><</replace>>');
	});
	return "";
}

DefineMacroS("loveInterestFunction", loveInterestFunction);

window.between = function(x, min, max){
	return x >= min && x <= max;
}

function featsPointsMenuReset() {
	jQuery(document).on('change', '#listbox--upgradenameid', function (e) {
		new Wikifier(null, '<<updateFeatsPointsMenu>>');
	});
	return "";
}

DefineMacroS("featsPointsMenuReset", featsPointsMenuReset);

function startingPlayerImageReset() {
	jQuery(document).on('change', '#settingsDiv .macro-radiobutton,#settingsDiv .macro-numberslider,#settingsDiv .macro-checkbox', function (e) {
		new Wikifier(null, '<<startingPlayerImageUpdate>>');
	});
	return "";
}

DefineMacroS("startingPlayerImageReset", startingPlayerImageReset);

window.deck = function(){
	var names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	var suits = ['Hearts','Diamonds','Spades','Clubs'];
	var cards = [];

	for( var s = 0; s < suits.length; s++ ) {
		for( var n = 0; n < names.length; n++ ) {
			cards.push( {value:n+2, name:names[n], suits:suits[s]} );
		}
	}

	return cards;
}

window.shuffle = function(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function updateAskColour() {
	jQuery(document).on('change', '#listbox-askaction', function (e) {
		new Wikifier(null, '<<replaceAskColour>>');
	});
	return "";
}

DefineMacroS("updateAskColour", updateAskColour);


window.generateBabyName = function(name, gender, usedNames) {
	var result = "";
	if(name != undefined && name != null && name != ""){
		var result = name.replace(/[^a-zA-Z ]+/g,"");
		return result.substring(0,30);
	}else{
		var names = [];
		switch(gender){
			case "m":
				names = ['Addison','Algernon','Allan','Alpha','Anton','Axel','Bazza','Benton','Bernard','Brand','Brett','Cale','Calvin','Carol','Chuck','Chucky','Clay','Cornelius','Crofton','Darden','Dax','Den','Deven','Digby','Don','Douglas','Driscoll','Duane','Duke','Edmund','Elsdon','Freeman','Gabby','Garland','George','Godfrey','Graeme','Grier','Hammond','Harlan','Hendrix','Herman','Hewie','Hugh','Indiana','Ingram','Jackie','Jasper','Jaxon','Jaycob','Jere','Kamden','Kelcey','Kendall','Kevin','Kian','Kieran','Kirby','Lanny','Lawson','Laz','Leland','Levi','Lindon','Linton','Lionel','Lonny','Lucas','Manley','Maverick','Merlyn','Michael','Monty','Murphy','Nate','Ned','Nowell','Odell','Ollie','Osbert','Otto','Paget','Pip','Quintin','Raymund','Ricky','Robert','Ross','Rudolph','Sammy','Scotty','Stacey','Thad','Theodore','Tommy','Trey','Tyson','Val','Vernon','Willis','Wilmer','Winton','Wisdom'];
				break;
			case "f":
				names = ['Adelyn','Alene','Alexa','Aliah','Alyson','Angelica','Annalise','Annora','Azaria','Bessie','Betsy','Bettie','Biddy','Brianne','Camellia','Camille','Camryn','Caroline','Chastity','Chelsea','Chelsey','Cindy','Clematis','Darla','Deb','Debby','Dortha','Eleanora','Eliana','Elsabeth','Elyse','Emerson','Emmeline','Erica','Ettie','Eustacia','Evelyn','Gabrielle','Georgiana','Harper','Harrietta','Haylie','Haze','Hunter','Hyacinth','Indiana','Indie','Jacquetta','Janie','Jannine','Jonquil','Kaelyn','Kam','Khloe','Kolleen','Korrine','Kourtney','Krystine','Lavena','Leeann','Lela','Lesleigh','Lindsie','Lorena','Lucile','Luvinia','Lyn','Lyssa','Madeleine','Marian','Maudie','Maureen','Maxine','Melody','Milani','Misti','Nat','Noelle','Ottoline','Paige','Pauline','Payton','Pearl','Perlie','Petronel','Phebe','Posie','Praise','Rexana','Serena','Sharalyn','Sharla','Shauna','Sky','Sybella','Tracy','Tresha','Trudi','Wallis','Wilda','Wren','Yvette'];
				break;
		}
		names.pushUnique('Aaren','Addison','Alex','Alpha','Andie','Arden','Ariel','Artie','Ashton','Aston','Aubrey','Beau','Bernie','Bertie','Beverly','Bobbie','Brooklyn','Caelan','Cameron','Carol','Cary','Casey','Channing','Charley','Cherokee','Cheyenne','Coby','Codie','Collyn','Cyan','Dale','Dallas','Dana','Darby','Dee','Derby','Devan','Devin','Emmerson','Emory','Finley','Flannery','Florence','Gabby','Garnet','Garnett','Gray','Hadyn','Harlow','Hollis','Jackie','Jade','Jae','Jaiden','Johnnie','Joyce','Justice','Kam','Kelcey','Kelsey','Leslie','Lindsey','Lorin','Lyric','Maitland','Marley','McKinley','Merlyn','Murphy','Nicky','Oakley','Odell','Pacey','Paget','Peyton','Presley','Rain','Raleigh','Reagan','Regan','Reilly','Remington','Robbie','Rory','Royale','Sage','Sam','Schuyler','Selby','Shae','Shaye','Shelly','Skylar','Sloan','Stacey','Stacy','Tayler','Tommie','Tracey','Tristen','Tristin','Val');
		names.delete(usedNames);
		result = names[random(0,names.length - 1)];
		return result;
	}
}

DefineMacroS("generateBabyName", generateBabyName);

window.bulkProduceValue = function(plant, quantity = 250) {
	if(plant !== undefined){
		let baseCost = plant.plant_cost * quantity / 2;
		let seasonBoost = !plant.season.includes(V.season) ? 1.1 : 1;
		return Math.floor(baseCost * seasonBoost);
	}
}


window.pregnancyBellyVisible = function(){
	let size = State.variables.sexStats.vagina.pregnancy.bellySize;
	if(size <= 7) return false;
	if(size <= 11 && State.variables.worn.upper.name !== "naked" && State.variables.worn.upper.type.includes("bellyShow")) return false;
	if(size <= 17 && State.variables.worn.upper.type.includes("bellyHide")) return false;

	return true;
}


window.toTitleCase = function(str) {
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

window.getRobinLocation = function(){
	if (V.NPCName[V.NPCNameList.indexOf("Robin")].init !== 1){
		return;

	} else if (V.robinlocationoverride && V.robinlocationoverride.during.includes(V.hour)){
		return T.robin_location = V.robinlocationoverride.location;

	} else if (V.robinmissing === 1){
		return T.robin_location = "missing";

	} else if (!between(V.hour, 7, 20)){ //if hour is 6 or lower, or 21 or higher
		return T.robin_location = "sleep";

	} else if (V.schoolday === 1 && between(V.hour, 8, 15)){
		return T.robin_location = "school";

	} else if ((V.weekday === 7 || V.weekday === 1) && between(V.hour, 9, 16) && V.NPCName[V.NPCNameList.indexOf("Robin")].trauma < 80){
		if (V.season === "winter"){
			return T.robin_location = "park";
		} else {
			return T.robin_location = "beach";
		}

	} else if (V.halloween === 1 && between(V.hour, 16, 18) && V.monthday === 31){
		return T.robin_location = "halloween";

	} else {
		return T.robin_location = "orphanage";
	}
}

window.setRobinLocationOverride = function(loc, hour){
	let override = {
		"location": loc,
		"during": [],
	};
	if (Array.isArray(hour)) override.during = hour;
	else override.during = [hour];

	// note: overrides get reset at midnight (in the <<day>> widget)
	V.robinlocationoverride = override;
	return;
}

window.getRobinCrossdressingStatus = function(crossdressLevel){
	//Note returns 2 if Robin is crossdressing or 0 if not comfortable enough at that location
	if (V.NPCName[V.NPCNameList.indexOf("Robin")].init !== 1){
		return;
	}
	T.robin_cd = 0;

	switch (getRobinLocation()){
		case "orphanage":
		case "sleep":
			if (crossdressLevel >= 2) T.robin_cd = 2;
			break;
		case "park":
		case "beach":
			if (crossdressLevel >= 4) T.robin_cd = 2;
			break;
		case "school":
			if (crossdressLevel >= 5) T.robin_cd = 2;
			break;
		case "missing":
			T.robin_cd = 0;
			break;
		default:
			T.robin_cd = 0;
	}
	return T.robin_cd;
}

window.DefaultActions = {
	create:  function (isMinimal = false, preload = false) {
		let storage = {};
		setup.actionsTypes.combatTypes.forEach(type => {
			storage[type] = {};
			// Decides whether you create all permutations of the structure.
			// Usually set isMinimal if saving to file for reduced memory.
			if (!isMinimal) {
				setup.actionsTypes.personTypes.forEach(person => {
					storage[type][person] = {};
					setup.actionsTypes.actionTypes.forEach(part => {
						if (person === 'Tentacles' && part === 'askActions') {
							// Do not add askActions to tentacle enemies.
							return;
						} else if (person !== 'Tentacles' && part === 'regrab') {
							// Do not add regrab to non-tentacle enemies.
							return;
						}
						storage[type][person][part] = [];
					});
				});
			}
		});
		if (preload) {
			// Load old actions into new structure.
			storage = this.loadOld(V.actionDefaults, storage);
		}
		return storage;
	},
	check: function (storage) {
		if (storage === undefined) {
			return;
		}
		if (storage['consensual'] === undefined || storage['rape'] === undefined) {
			storage = this.create(true, true);
		}
		return storage;
	},
	setup: function (recreate = false) {
		if (recreate || V.actionDefaults === undefined) {
			return this.create(true);
		}
		return V.actionDefaults;
	},
	load: function (from = {}) {
		Object.keys(from).forEach(type => {
			Object.keys(from[type]).forEach(person => {
				Object.keys(from[type][person]).forEach(part => {
					let actions = this.get(type, person, part);
					if (Array.isArray(actions)) {
						actions.forEach(action => {
							from[type][person][part].pushUnique(action);
						});
					} else {
						if (part === 'regrab') {
							let action = actions ? 1 : 0;
							from[type][person][part].pushUnique(action);
						}
					}
				})
			});
		});
		return from;
	},
	loadOld: function (from, to) {
		setup.actionsTypes.personTypes.forEach(person => {
			setup.actionsTypes.combatTypes.forEach(type => {
				setup.actionsTypes.actionTypes.forEach(part => {
					let actions = this.get(person, type, part, from);
					if (Array.isArray(actions)) {
						actions.forEach(action => {
							this.add(type, person, part, action, { value: to });
						});
					} else {
						if (part === 'regrab') {
							let action = actions ? 1 : 0;
							this.add(type, person, part, action, { value: to });
						}
					}
				})
			});
		});
		return to;
	},
	save: function (from, callback = this.add) {
		if (from === undefined) {
			return;
		}
		V.actionDefaults = this.setup(true);
		// Assume the structure is valid.
		let defaultTypes = Object.keys(from);
		defaultTypes.forEach(type => {
			let defaultPeople = Object.keys(from[type]);
			defaultPeople.forEach(person => {
				let defaultParts = Object.keys(from[type][person]);
				defaultParts.forEach(part => {
					let actionSets = from[type][person][part];
					if (actionSets !== undefined) {
						actionSets.forEach(action => {
							if (part === 'regrab') {
								action = action ? 1 : 0;
							}
							callback(type, person, part, action, { value: V.actionDefaults });
						});
					}
				});
			});
		});
	},
	add: function (type, person, part, action, to = { value: V.actionDefaults }) {
		if (action === 'rest') {
			return;
		}
		if (to.value[type][person] === undefined) {
			to.value[type][person] = {};
		}
		if (to.value[type][person][part] === undefined) {
			to.value[type][person][part] = [];
		}
		to.value[type][person][part].pushUnique(action);
	},
	addMany: function (type, person, part, actions, to = { value: V.actionDefaults }) {
		let filteredActions = actions.map(action => {
			if (part === 'regrab') {
				return action ? 1 : 0;
			}
			if (action !== 'rest') {
				return action;
			}
		});
		if (filteredActions.length <= 0) {
			return;
		}
		if (to.value[type][person] === undefined) {
			to.value[type][person] = {};
		}
		if (to.value[type][person][part] === undefined) {
			to.value[type][person][part] = [];
		}
		filteredActions.forEach(action => {
			to.value[type][person][part].pushUnique(action);
		});
	},
	get: function (type, person, part, from = V.actionDefaults, defaultValue = 'rest') {
		if (from[type] === undefined
			|| from[type][person] === undefined
			|| from[type][person][part] === undefined) {
			return [ defaultValue ];
		}
		return from[type][person][part];
	},
	setDefaults: function () {
		V.actionDefaults = this.create(true);
		let type = 'rape';
		this.addMany(type, 'Submissive', 'leftaction', ['leftchest']);
		this.addMany(type, 'Submissive', 'rightaction', ['rightchest']);
		this.addMany(type, 'Submissive', 'mouthaction', ['plead', 'suck', 'kiss', 'breastsuck']);
		this.addMany(type, 'Submissive', 'penisaction', ['tease', 'cooperate']);
		this.addMany(type, 'Submissive', 'vaginaaction', ['penistease', 'cooperate']);
		this.addMany(type, 'Submissive', 'anusaction', ['penistease', 'cooperate']);
		this.addMany(type, 'Submissive', 'feetaction', ['grabrub', 'grabrub', 'vaginagrabrub']);
		this.addMany(type, 'Defiant', 'leftaction', ['lefthit', 'leftstruggle']);
		this.addMany(type, 'Defiant', 'rightaction', ['penwhack', 'righthit', 'rightstruggle']);
		this.addMany(type, 'Defiant', 'mouthaction', ['pullaway', 'bite', 'breastbite', 'headbutt']);
		this.addMany(type, 'Defiant', 'penisaction', ['escape', 'otheranusescape', 'othermouthescape']);
		this.addMany(type, 'Defiant', 'vaginaaction', ['escape', 'othermouthescape']);
		this.addMany(type, 'Defiant', 'anusaction', ['escape', 'othermouthescape']);
		this.addMany(type, 'Defiant', 'feetaction', ['kick']);
		this.addMany(type, 'Tentacles', 'regrab', [0]);
		type = 'consensual';
		this.addMany(type, 'Submissive', 'leftaction', ['leftchest']);
		this.addMany(type, 'Submissive', 'rightaction', ['rightchest']);
		this.addMany(type, 'Submissive', 'mouthaction', ['kiss', 'suck', 'breastsuck', 'breastlick']);
		this.addMany(type, 'Submissive', 'penisaction', ['tease', 'cooperate']);
		this.addMany(type, 'Submissive', 'vaginaaction', ['penistease', 'cooperate']);
		this.addMany(type, 'Submissive', 'anusaction', ['penistease', 'cooperate']);
		this.addMany(type, 'Defiant', 'leftaction', [0]);
		this.addMany(type, 'Defiant', 'rightaction', ['penwhack']);
		this.addMany(type, 'Defiant', 'mouthaction', ['breastpull', 'breastclosed']);
		this.addMany(type, 'Defiant', 'penisaction', ['escape', 'otheranusescape', 'othermouthescape']);
		this.addMany(type, 'Defiant', 'vaginaaction', ['escape', 'othermouthescape']);
		this.addMany(type, 'Defiant', 'anusaction', ['escape', 'othermouthescape']);
		this.addMany(type, 'Tentacles', 'regrab', [0]);
		return V.actionDefaults;
	}
}

window.transferClothing = function(slot, index, newWardrobe){
	let oldWardrobeObject;
	if(V.wardrobe_location === "wardrobe"){
		oldWardrobeObject = V.wardrobe;
	} else {
		oldWardrobeObject = V.wardrobes[V.wardrobe_location];
	}
	let newWardrobeObject;
	if(newWardrobe === "wardrobe"){
		newWardrobeObject = V.wardrobe;
	} else {
		newWardrobeObject = V.wardrobes[newWardrobe];
	}
	if(oldWardrobeObject && newWardrobeObject){
		newWardrobeObject[slot].push(oldWardrobeObject[slot][index]);
		oldWardrobeObject[slot].deleteAt(index);
	}
	return;
}

window.clothingData = function(slot, item, data){
	if(item[data] !== undefined) return item[data];
	return setup.clothes[slot][clothesIndex(slot,item)][data];
}

window.clothesDataTrimmerLoop = function(){
	if(!V.passage || V.passage === "Start") return;
	const wardrobeKeys = Object.keys(V.wardrobes);
	setup.clothes_all_slots.forEach(slot => {
		clothesDataTrimmer(V.worn[slot]);
		clothesDataTrimmer(V.carried[slot]);
		if(Array.isArray(V.wardrobe[slot])){
			V.wardrobe[slot].forEach(item => {
				clothesDataTrimmer(item);
			})
		}
		if(Array.isArray(V.store[slot])){
			V.store[slot].forEach(item => {
				clothesDataTrimmer(item);
			})
		}

		for (let i = 0, l = wardrobeKeys.length; i < l; i++){
			if(Array.isArray(V.wardrobes[wardrobeKeys[i]][slot])){
				V.wardrobes[wardrobeKeys[i]][slot].forEach(item => {
					clothesDataTrimmer(item);
				})
			}
		}
		if(V.tryOn !== undefined){
			if(V.tryOn.ownedStored !== undefined){
				if(V.tryOn.ownedStored[slot] !== undefined && V.tryOn.ownedStored[slot] !== null){
					clothesDataTrimmer(V.tryOn.ownedStored[slot]);
				}
			}
			if(V.tryOn.tryingOn !== undefined){
				if(V.tryOn.tryingOn[slot] !== undefined && V.tryOn.tryingOn[slot] !== null){
					clothesDataTrimmer(V.tryOn.tryingOn[slot]);
				}
			}
		}
	});
}

window.clothesDataTrimmer = function(item){
	if(!item) return;
	const toDelete = ["name_cap","iconFile","accIcon","notuck","skirt","description","colour_options","accessory_colour_options","fabric_strength","integrity_max","bustresize","sleeve_img","breast_img","exposed_base","vagina_exposed_base","anus_exposed_base","state_top_base","state_base","word","femininity","strap","cost","shop","short"];
	//To prevent it from running on variables multiple times, when updating toDelete, the last of the new additions should be added here
	const trimmerVersion = ["shop","short"];
	let version = 0;
	let indexToUpdateVersion = toDelete.indexOf(trimmerVersion[version]);
	toDelete.forEach((v, index) => {
		if(indexToUpdateVersion === -1) {
			//Do Nothing
		} else if(item[v] !== undefined && item[trimmerVersion[version]] !== undefined) {
			delete item[v];
		}
		if(indexToUpdateVersion === index) {
			version++;
			indexToUpdateVersion = toDelete.indexOf(trimmerVersion[version])
		}
	});
}

window.clothesReturnLocation = function(item, type){
	if(!V.multipleWardrobes) return "wardrobe";
	let isolated = ["asylum","prison"];
	let lastTaken = item.lastTaken;
	if (!lastTaken || (V.multipleWardrobes !== "all" && !isolated.includes(lastTaken))
		|| !V.wardrobes[lastTaken]
		|| !V.wardrobes[lastTaken].unlocked) {
		lastTaken = 'wardrobe';
	}
	switch(type){
		case "rebuy":
			switch(V.location){
				case "asylum":
					if(item.type.includes("asylum")){
						return "asylum";
					}
					if(!isolated.includes(lastTaken)){
						return lastTaken;
					}
				case "prison":
					if(item.type.includes("prison")){
						return "prison";
					}
					if(!isolated.includes(lastTaken)){
						return lastTaken;
					}
				default:
					if(!isolated.includes(lastTaken)){
						return lastTaken;
					}
			}
		default:
			switch(V.location){
				case "asylum":
					return "asylum";
				case "prison":
					return "prison";
				default:
					if(!isolated.includes(lastTaken)){
						return lastTaken;
					}
			}
	}
	return "wardrobe";
}

//the 'modder' variable is specifically for modders name, should be kept as a short string
window.clothesIndex = function(slot, itemToIndex) {
	if(!slot || !itemToIndex || !itemToIndex.name || !itemToIndex.variable) {
		console.log(`clothesIndex - slot or valid object not provided`);
		return 0;
	}
	let index = setup.clothes[slot].findIndex((item) => item.variable === itemToIndex.variable && item.modder === itemToIndex.modder)
	if(index === -1){
		console.log(`clothesIndex - ${slot} clothing item index not found for the '${itemToIndex.name}' with the modder set to '${itemToIndex.modder}'`);
		/* try and correct .modder mismatches */
		let matches = setup.clothes[slot].filter((item) => item.variable === itemToIndex.variable);
		if (matches.length === 1) {
			let recovery = setup.clothes[slot].find((item) => item.variable === itemToIndex.variable);
			itemToIndex.modder = recovery.modder;
			index = recovery.index;
			console.log(`attempting to recover the mismatch, new modder is '${recovery.modder}'`);
			return index;
		}
		else {
			console.log("recovery failed, matches: " + matches);
			return 0;
		}
	}
	return index;
}

var pageLoading = false;

Save.onLoad.add(function(save) {
	pageLoading = true
});

// Runs before a passage load, returning a string redirects to the new passage name.
Config.navigation.override = function (dest) {
	const isLoading = pageLoading; // if page is freshly loading (after a refresh etc), we hold its value in a temporary variable
	
	pageLoading = false
	switch (dest) {
		case 'Pharmacy Select Custom Lenses':
			return isLoading ? 'Pharmacy Ask Custom Lenses' : false;
		case 'Forest Shop Outfit':
		case 'Forest Shop Upper':
		case 'Forest Shop Lower':
		case 'Forest Shop Under Outfit':
		case 'Forest Shop Under Upper':
		case 'Forest Shop Under Lower':
		case 'Forest Shop Head':
		case 'Forest Shop Face':
		case 'Forest Shop Neck':
		case 'Forest Shop Legs':
		case 'Forest Shop Feet':
			return 'Forest Shop';

		case 'Over Outfit Shop':
		case 'Outfit Shop':
		case 'Top Shop':
		case 'Bottom Shop':
		case 'Under Outfit Shop':
		case 'Under Top Shop':
		case 'Under Bottom Shop':
		case 'Head Shop':
		case 'Face Shop':
		case 'Neck Shop':
		case 'Hands Shop':
		case 'Legs Shop':
		case 'Shoe Shop':
			return 'Clothing Shop';

		case 'Penis Inspection Flaunt Crossdress':
			return 'Penis Inspection Flaunt No Penis';

		case 'Pussy Inspection2':
			return 'Pussy Inspection 2';

		case 'Pussy Inspection Penis':
			return 'Pussy Inspection Flaunt No Pussy';

		case 'Forest Plant Sex No Tentacles':
			return 'Forest Plant Sex';

		case 'Forest Plant Sex No Tentacles Finish':
			return 'Forest Plant Sex Finish';

		case 'Forest Plant Passout No Tentacles':
			return 'Forest';

		case 'Moor Plant Sex No Tentacles':
			return 'Moor Plant Sex';

		case 'Moor Plant Sex No Tentacles Finish':
			return 'Moor Plant Sex Finish';

		case 'Underground Plant Molestation No Tentacles':
			return 'Underground Plant Molestation';

		case 'Underground Plant Molestation No Tentacles Finish':
			return 'Underground Plant Molestation Finish';

		case 'Evens Swimming Endure':
			return 'Events Swimming Swim Endure';

		case 'Domus House Work':
			return 'Domus Gutters Intro';

		case 'Lake Underwater Tentacles Finish Figure':
			return 'Lake Underwater Tentacles Finish';

		case 'Sextoys Inventory Home':
		case 'Sextoys Inventory Brothel':
		case 'Sextoys Inventory Cottage':
		case 'Sextoys Inventory Cabin':
			return 'Sextoys Inventory';

		default:
			return false;
	}
}

window.currentSkillValue = function(skill){
	let result = V[skill];
	if(!result && result !== 0) {
		console.log(`currentSkillValue - skill '${skill}' unknown`);
		return 0;
	};
	if(['skulduggery','physique','danceskill','swimmingskill','athletics','willpower','tending','english'].includes(skill) && V.moorLuck > 0){
		result = Math.floor(result * (1 + (V.moorLuck / 100)));
	}
	if(['physique','danceskill','swimmingskill','athletics'].includes(skill) && V.sexStats.vagina.pregnancy.bellySize >= 10){
		switch(V.pregnancyStats.mother){
			case 0: T.pregnancyModifier = 30;
			break;
			case 1: T.pregnancyModifier = 40;
			break;
			case 2: T.pregnancyModifier = 50;
			break;
			case 3: T.pregnancyModifier = 65;
			break;
			case 4: T.pregnancyModifier = 100;
			break;
		}
		result = Math.floor(result * (1 - (V.sexStats.vagina.pregnancy.bellySize / T.pregnancyModifier)));
	}
	switch(skill){
		case 'skulduggery':
			if(V.worn.hands.type.includes("sticky_fingers")){
				result = Math.floor(result * 1.05);
			}
			if(V.harpy >= 2 || V.cat >= 2){
				result = Math.floor(result * 1.05);
			}
		break;
		case 'physique':
			if(["forest", "moor", "farm"].includes(V.location)){
				if(V.worn.feet.type.includes("heels")){
					result = Math.floor(result * (1 - (V.worn.feet.reveal / 5000)));
				}
				if(V.worn.feet.type.includes("rugged")){
					result = Math.floor(result * (1 + (V.feetskill / 10000)));
				}
			}
		break;
		case 'danceskill':
			if(V.worn.under_upper.type.includesAny("dance", "naked") && V.worn.under_lower.type.includesAny("dance", "naked") && V.worn.upper.type.includesAny("dance", "naked") && V.worn.lower.type.includesAny("dance", "naked")){
				result = Math.floor(result * 1.05);
			}
			if(V.worn.feet.type.includes("shackle")){
				result = Math.floor(result * 0.5);
			}
		break;
		case 'swimmingskill':
			let heels = 0;
			if(V.worn.under_upper.type.includesAny("swim", "naked") && V.worn.under_lower.type.includesAny("swim", "naked") && V.worn.upper.type.includesAny("swim", "naked") && V.worn.lower.type.includesAny("swim", "naked")){
				result = Math.floor(result * 1.05);
			}
			if(V.worn.feet.type.includes("swim")){
				result = Math.floor(result * (1 + (V.feetskill / 10000)));
			} else if(!V.worn.feet.type.includes("naked")){
				if(V.worn.feet.type.includes("heels")){
					heels = 0.1;
				} else {
					heels = 0;
				}
				result = Math.floor(result * (0.9 + (V.feetskill / 10000) - heels));
			}
			if(V.worn.feet.type.includes("shackle")){
				result = Math.floor(result * 0.5);
			}
		break;
		case 'athletics':
			if(["forest", "moor", "farm"].includes(V.location)){
				if(V.worn.feet.type.includes("heels")){
					result = Math.floor(result * (1 - (V.worn.feet.reveal / 5000)));
				}
				if(V.worn.feet.type.includes("rugged")){
					result = Math.floor(result * (1 + (V.feetskill / 10000)));
				}
			}
			if(V.worn.feet.type.includes("shackle")){
				result = 0;
			}
		break;
		case 'willpower':
			if(V.parasite.left_ear.name == "slime" && V.parasite.right_ear.name == "slime"){
				result = Math.floor(result * 0.9);
			}
		break;
		case 'tending':
			if(V.backgroundTraits.includes("plantlover")){
				result = Math.floor(result * (1 + (V.trauma / (V.traumamax * 2))));
			}
		break;
	}
	return result;
}

window.playerIsPenetrated = function(){
	return [V.mouthstate, V.vaginastate, V.anusstate].some(s => ["penetrated","doublepenetrated","tentacle","tentacledeep"].includes(s))
}

window.playerHasStrapon = function(){
	return (V.worn.under_lower.type.includes("strap-on") && V.worn.under_lower.state == "waist")
}

window.npcHasStrapon = function(index){
	// index is 0 to 5
	return (V.NPCList[index].penisdesc != undefined && V.NPCList[index].penisdesc.contains("strap-on"))
	// For refactoring in the future
	//return (V.NPCList[index].penisdesc != undefined && V.NPCList[index].strapon != undefined && V.NPCList[index].strapon.state == "worn")
}

window.getTimeString = function(minutes = 0){
	if (minutes < 0){
		// come on don't try negative numbers, that's silly
		return "0:00";
	}
	if (minutes < 10){
		return "0:0" + minutes;
	} else if (minutes < 60){
		return "0:" + minutes;
	} else {
		const hours = Math.trunc(minutes / 60);
		minutes = ("" + minutes % 60).padStart(2, '0');
		return hours + ":" + minutes;
	}
}

window.npcAssignClothesToSet = function(upper, lower){
	return {"upper":T.npcClothesItems.upper[upper], "lower":T.npcClothesItems.lower[lower]}
}

window.npcMakeNaked = function (npc, slot){
	if (slot === "upper") {
		npc.chest = 0;
	} else if (slot === "lower") {
		if (npc.penis !== "none") npc.penis = 0;
		if (npc.vagina !== "none") npc.vagina = 0;
	}
}

window.npcEquipSet = function(npc, set) {
	npc.clothes = {set: set.name};
	Object.entries(set.clothes).forEach((item) => {
		if (item[1].name === "naked"){
			npcMakeNaked(npc, item[0]);
		}
		let itemData = setup.clothes[item[0]].find(c => c.name === item[1].name);
		if(!itemData){
			npc.clothes[item[0]] = {
				name: item[1].name,
				integrity: item[1].integrity_max,
			};
		} else {
			npc.clothes[item[0]] = {
				name: itemData.name,
				integrity: itemData.integrity_max,
			};
		}
	});
}

window.npcSpecifiedClothes = function (npc, name){
	let clothingItem = setup.npcClothesSets.filter((set) => set.name === name);
	if(clothingItem.length > 0){
		npcEquipSet(npc, clothingItem[0]);
	} else {
		console.log(`npcSpecifiedClothes - unable to find a clothing item with the name '${name}' for '${npc.fullDescription}'`)
	}
}

/*npc.crossdressing: 0 - doesnt at all, 1 - sometimes, 2 - always*/
window.npcClothes = function (npc, type){
    let crossdressing = npc.crossdressing || 0;
	let gender = ['n'];
	/* if you dont want those always crossdressing to wear neutral clothes
	let gender = [];
	if(crossdressing !== 2) gender.push('n');
	*/

	if(crossdressing < 2) gender.push(npc.pronoun);
	if(crossdressing > 0) gender.push(npc.pronoun === "m" ? "f" : "m");
	let clothingOptions = setup.npcClothesSets.filter((set) => (set.type === type || !type) && gender.includes(set.gender));

	if(npc.outfits){
		let namedNpcClothing = clothingOptions.filter((set) => npc.outfits.includes(set.name));
		if(namedNpcClothing.length > 0){
			clothingOptions = namedNpcClothing;
		}
	}
	if(clothingOptions.length > 0){
		let clothesSet = clothingOptions.pluck();
		npcEquipSet(npc, clothesSet);
		//Allows you to record the clothing set selected
		return clothesSet.name;
	} else {
		console.log(`npcClothes - unable to find a clothing set with the options for '${npc.fullDescription}' with type '${type}'`)
	}
}

window.getWeekDay = function(day){
	// NOTE: This function takes an argument from 1 to 7. Avoid off-by-1 errors! It is NOT 0-6.
	if (day && day >= 1 && day <= 7){
		return ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"][day-1];
	} else {
		throw new Error("INVALID DAY, day index: ["+day+"]");
	}
}

window.waterproofCheck = function(clothing){
	return clothing.type.includes("swim") || clothing.type.includes("stealthy");
}

window.getSexToysofType = function (toyType){
	var sexToys = ["dildo","whip","stroker","vibrator","all"];
	sexToys["dildo"] = ["dildo","length of anal beads"];
	sexToys["whip"] = ["riding crop","flog"];
	sexToys["stroker"] = ["stroker"];
	sexToys["vibrator"] = ["vibrator","bullet vibe"];
	sexToys["all"] = sexToys["dildo"].concat(sexToys["whip"],sexToys["stroker"],sexToys["vibrator"]);

	if (toyType != undefined){
		if (toyType == "dildo"){
			var dildos = sexToys["dildo"].concat(sexToys["vibrator"]);
			return dildos;
		}
		else if (toyType == "stroker"){
			return sexToys["stroker"];
		}
		else if (toyType == "whip"){
			return sexToys["whip"];
		}
		else if (toyType == "vibrator"){
			return sexToys["vibrator"];
		}
		else if (toyType == "dildos and strokers"){
			var dildos = sexToys["dildo"].concat(sexToys["vibrator"],sexToys["stroker"]);
			return dildos;
		}
		else if (toyType == "dildos and whips"){
			var dildos = sexToys["dildo"].concat(sexToys["vibrator"],sexToys["whip"]);
			return dildos;
		}
		else {
			return sexToys["all"];
		}
	}
	else {
		//console.log("All sex toys. Length = "+sexToys["all"].length+ " and I contain: " +sexToys["all"]);
		return sexToys["all"];
	}
}

window.npcHasSexToyOfType = function(npcIndex,toyType){
	var npc = V.NPCList[npcIndex];
	if (npc.righttool != undefined || npc.lefttool != undefined){
		var sexToys = ["dildo","whip","stroker","all"];
		sexToys["dildo"] = getSexToysofType("dildo");
		sexToys["whip"] = getSexToysofType("whip");
		sexToys["stroker"] = getSexToysofType("stroker");
		sexToys["vibrator"] = getSexToysofType("vibrator");
		sexToys["all"] = getSexToysofType("all");
		console.log("sex toys: "+sexToys.all);

		return sexToys[toyType].contains(V.NPCList[npcIndex].righttool) || sexToys[toyType].contains(V.NPCList[npcIndex].lefttool)
	}
	else {
		return false;
	}
}

window.randomSexToy = function(toyType){

	if (toyType != undefined){
		if (toyType == "dildo"){
			var dildos = getSexToysofType("dildo");
			return dildos[random(0,dildos.length-1)];
		}
		else if (toyType == "stroker"){
			var strokers = getSexToysofType("stroker");
			return strokers[random(0,strokers.length-1)];
		}
		else if (toyType == "whip"){
			var whips = getSexToysofType("whip");
			return whips[random(0,whips.length-1)];
		}
		else if (toyType == "vibrator"){
			var vibrators = getSexToysofType("vibrator");
			return vibrators[random(0,vibrators.length-1)];
		}
		else if (toyType == "dildos and strokers"){
			var dildos = getSexToysofType("dildos and strokers");
			return dildos[random(0,dildos.length-1)];
		}
		else if (toyType == "dildos and whips"){
			var dildos = getSexToysofType("dildos and whips");
			return dildos[random(0,dildos.length-1)];
		}
		else {
			var sexToys = getSexToysofType("all")
			return sexToys[random(0,sexToys.length-1)];
		}
	}
	else {
		//console.log("All sex toys. Length = "+sexToys["all"].length+ " and I contain: " +sexToys["all"]);
		var sexToys = getSexToysofType("all")
		return sexToys[random(0,sexToys.length-1)];
	}
}

window.playerHasButtPlug = function(){
	return (V.worn.butt_plug != undefined && V.worn.butt_plug.state == "worn" && V.worn.butt_plug.worn == 1) // V.worn.butt_plug.worn == 1 is just as a safeguard for now
}

window.ironmanScheduledSaves = function() {
	let date = new Date(V.month +' '+V.monthday+', ' + V.year)

	if (!V.ironmanautosaveschedule)
		V.ironmanautosaveschedule = (date.getTime()).toString(8)
	if (parseInt(V.ironmanautosaveschedule, 8) < date.getTime()){
		//autosave
		ironmanAutoSave();
		//
		V.ironmanautosaveschedule = (date.getTime() + (window.getRandomIntInclusive(432000, 777600) * 1000)).toString(8)
	}
}

window.wraithSleepEventCheck = function(){
	return V.wraith && V.wraith.state !== "" && V.wraith.nightmare === 1 && (V.moonstate === "evening" && V.hour >= 21 || V.moonstate === "morning" && V.hour < 5);
}

