window.prepareSaveDetails = function (forceRun){
	if("dolSaveDetails" in localStorage === false || forceRun === true){
		var saveDetails = {autosave: null, slots:[null,null,null,null,null,null,null,null]}
		var SugarCubeSaveDetails = Save.get();
		if(SugarCubeSaveDetails.autosave != null){
			saveDetails.autosave = {
				title:SugarCubeSaveDetails.autosave.title,
				date:SugarCubeSaveDetails.autosave.date,
				metadata:SugarCubeSaveDetails.autosave.metadata
			}
			if(saveDetails.autosave.metadata === undefined){
				saveDetails.autosave.metadata = {saveName:""};
			}
			if(saveDetails.autosave.metadata.saveName === undefined){
				saveDetails.autosave.metadata.saveName = "";
			}
		}
		for (var i=0; i<SugarCubeSaveDetails.slots.length;i++){
			if(SugarCubeSaveDetails.slots[i] !== null){
				saveDetails.slots[i] = {
					title:SugarCubeSaveDetails.slots[i].title,
					date:SugarCubeSaveDetails.slots[i].date,
					metadata:SugarCubeSaveDetails.slots[i].metadata
				};
				if(saveDetails.slots[i].metadata === undefined){
					saveDetails.slots[i].metadata = {saveName:"old save", saveId:0}
				}
				if(saveDetails.slots[i].metadata.saveName === undefined){
					saveDetails.slots[i].metadata.saveName = "old save";
				}
			}else{
				saveDetails.slots[i] = null;
			}
		}

		localStorage.setItem("dolSaveDetails" ,JSON.stringify(saveDetails));
	}
	return;
}

window.setSaveDetail = function (saveSlot, metadata, story){
	const saveDetails = JSON.parse(localStorage.getItem("dolSaveDetails"));
	if(saveSlot === "autosave"){
		saveDetails.autosave = {
			title: Story.get(V.passage).description(),
			date:Date.now(),
			metadata:metadata
		};
	}else{
		var slot = parseInt(saveSlot);
		saveDetails.slots[slot] = {
			title: Story.get(V.passage).description(),
			date:Date.now(),
			metadata:metadata
		};
	}
	localStorage.setItem("dolSaveDetails", JSON.stringify(saveDetails));
}

window.getSaveDetails = function (saveSlot){
	if("dolSaveDetails" in localStorage) return JSON.parse(localStorage.getItem("dolSaveDetails"));
}

window.deleteSaveDetails = function (saveSlot){
	var saveDetails = JSON.parse(localStorage.getItem("dolSaveDetails"));
	if(saveSlot === "autosave"){
		saveDetails.autosave = null;
	}else{
		var slot = parseInt(saveSlot);
		saveDetails.slots[slot] = null;
	}
	localStorage.setItem("dolSaveDetails" ,JSON.stringify(saveDetails));
}

window.deleteAllSaveDetails = function (saveSlot){
	var saveDetails = {autosave: null, slots:[null,null,null,null,null,null,null,null]};
	localStorage.setItem("dolSaveDetails" ,JSON.stringify(saveDetails));
}

window.returnSaveDetails = function () {
	return Save.get();
}

window.resetSaveMenu = function () {
	new Wikifier(null, '<<resetSaveMenu>>');
}

window.ironmanAutoSave = function() {
	const saveSlot = 8;
	updateSavesCount();
	const success = Save.slots.save(saveSlot, null, { "saveId": V.saveId, "saveName": V.saveName, "ironman": V.ironmanmode });
	if (success) {
		const save = Save.slots.get(saveSlot);
		setSaveDetail(saveSlot, {
			"saveId": V.saveId, "saveName": V.saveName, 
			"ironman": V.ironmanmode, "ironman_signature": (V.ironmanmode ? md5(JSON.stringify(save.state.delta[0])) : false)
		});
	}
}

window.getStateDelta = function (saveSlot) {
	let saveDetails = getSaveDetails()
	if (saveDetails == undefined)
		saveDetails = returnSaveDetails()
	else if(saveDetails.autosave == undefined || saveDetails.slots == undefined)
		saveDetails = returnSaveDetails()
	return saveDetails.slots[saveSlot];
}

window.loadSave = function(saveSlot, confirm) {
	if (V.confirmLoad === true && confirm === undefined) {
		new Wikifier(null, '<<loadConfirm ' + saveSlot + '>>');
	} else {
		if (saveSlot === "auto") {
			Save.autosave.load();
		} else {
			const saveDetails = JSON.parse(localStorage.getItem("dolSaveDetails"));
			const metadata = saveDetails.slots[saveSlot].metadata;
			/* Check if metadata for save matches the save's computed md5 hash. If it matches, the ironman save was not tampered with. */
			if (metadata.ironman) {
				const save = Save.slots.get(saveSlot);
				const signature = md5(JSON.stringify(save.state.delta[0]));
				// (if ironman mode enabled) following checks md5 signature of the save to see if the variables have been modified
				if (signature !== metadata.ironman_signature) {
					new Wikifier(null, '<<loadIronmanCheater ' + saveSlot + '>>');
					return;
				}
			}
			Save.slots.load(saveSlot);
			if (V.ironmanmode) {
				// (ironman) remove all saves(except auto-save) with the same saveId than loaded save
				[0, 1, 2, 3, 4, 5, 6, 7].forEach(id => {
					const saveDetail = saveDetails.slots[id];
					if (saveDetail == null) return;
					if (saveDetail.metadata.saveId === metadata.saveId) {
						Save.slots.delete(id);
						deleteSaveDetails(id);
					}
				});
			}
		}
	}
}

window.save = function(saveSlot, confirm, saveId, saveName) {
	if (saveId == null) {
		new Wikifier(null, '<<saveConfirm ' + saveSlot + '>>');
	} else if ((V.confirmSave === true && confirm != true) || (V.saveId != saveId && saveId != null)) {
		new Wikifier(null, '<<saveConfirm ' + saveSlot + '>>');
	} else {
		if (saveSlot != undefined) {
			updateSavesCount();
			const success = Save.slots.save(saveSlot, null, { "saveId": saveId, "saveName": saveName, "ironman": V.ironmanmode });
			if (success) {
				const save = Save.slots.get(saveSlot);
				setSaveDetail(saveSlot, {
					"saveId": saveId, "saveName": saveName, 
					"ironman": V.ironmanmode, "ironman_signature": (V.ironmanmode ? md5(JSON.stringify(save.state.delta[0])) : false)
				});
				V.currentOverlay = null;
				overlayShowHide("customOverlay");
				if (V.ironmanmode === true)
					SugarCube.Engine.restart();
			}
		}
	}
}

window.deleteSave = function (saveSlot, confirm) {
	if (saveSlot === "all") {
		if (confirm === undefined) {
			new Wikifier(null, '<<clearSaveMenu>>');
			return;
		} else if (confirm === true) {
			Save.clear();
			deleteAllSaveDetails();
		}
	} else if (saveSlot === "auto") {
		if (V.confirmDelete === true && confirm === undefined) {
			new Wikifier(null, '<<deleteConfirm ' + saveSlot + '>>');
			return;
		} else {
			Save.autosave.delete();
			deleteSaveDetails("autosave");
		}
	} else {
		if (V.confirmDelete === true && confirm === undefined) {
			new Wikifier(null, '<<deleteConfirm ' + saveSlot + '>>');
			return;
		} else {
			Save.slots.delete(saveSlot);
			deleteSaveDetails(saveSlot);
		}
	}
	new Wikifier(null, '<<resetSaveMenu>>');
}

window.importSave = function (saveFile) {
	if (!window.FileReader) return; // Browser is not compatible

	var reader = new FileReader();

	reader.onloadend = function () {
		DeserializeGame(this.result);
	}

	reader.readAsText(saveFile[0]);
}

window.SerializeGame = function () { return Save.serialize(); }; window.DeserializeGame = function (myGameState) { return Save.deserialize(myGameState) };

window.getSaveData = function () {
	var input = document.getElementById("saveDataInput");
	updateExportDay();
	input.value = Save.serialize();
}

window.loadSaveData = function () {
	var input = document.getElementById("saveDataInput");
	var result = Save.deserialize(input.value);
	if (result === null) {
		input.value = "Invalid Save."
	}
}

window.clearTextBox = function (id) {
	document.getElementById(id).value = "";
}

window.topTextArea = function (id) {
	var textArea = document.getElementById(id);
	textArea.scroll(0, 0);
}

window.bottomTextArea = function (id) {
	var textArea = document.getElementById(id);
	textArea.scroll(0, textArea.scrollHeight);
}

window.copySavedata = function (id) {
	var saveData = document.getElementById(id);
	saveData.focus();
	saveData.select();

	try {
		var successful = document.execCommand('copy');
	} catch (err) {
		var copyTextArea = document.getElementById("CopyTextArea");
		copyTextArea.value = "Copying Error";
		console.log('Unable to copy: ', err);
	}
}

window.copySavedata = function (id) {
	var saveData = document.getElementById(id);
	saveData.focus();
	saveData.select();

	try {
		var successful = document.execCommand('copy');
	} catch (err) {
		var copyTextArea = document.getElementById("CopyTextArea");
		copyTextArea.value = "Copying Error";
		console.log('Unable to copy: ', err);
	}
}

window.updateExportDay = function(){
	if(V.saveDetails != undefined && SugarCube.State.history[0].variables.saveDetails != undefined){
		V.saveDetails.exported.days = clone(V.days);
		SugarCube.State.history[0].variables.saveDetails.exported.days = clone(SugarCube.State.history[0].variables.days);
		V.saveDetails.exported.count++;
		SugarCube.State.history[0].variables.saveDetails.exported.count++;
		V.saveDetails.exported.dayCount++;
		SugarCube.State.history[0].variables.saveDetails.exported.dayCount++;
		var sessionJson = sessionStorage.getItem(SugarCube.Story.domId + ".state");
		if(sessionJson != undefined){
			var session = JSON.parse(sessionJson);
			session.delta[0].variables.saveDetails.exported.days = clone(V.days);
			session.delta[0].variables.saveDetails.exported.dayCount++;
			session.delta[0].variables.saveDetails.exported.count++;
			sessionStorage.setItem(SugarCube.Story.domId + ".state", JSON.stringify(session));
		}
	}
}

window.updateSavesCount = function(){
	if(V.saveDetails != undefined && State.history[0].variables.saveDetails != undefined){
		V.saveDetails.slot.count++;
		State.history[0].variables.saveDetails.slot.count++;
		V.saveDetails.slot.dayCount++;
		State.history[0].variables.saveDetails.slot.dayCount++;
		var sessionJson = sessionStorage.getItem(Story.domId + ".state");
		if(sessionJson != undefined){
			var session = JSON.parse(sessionJson);
			session.delta[0].variables.saveDetails.slot.dayCount++;
			session.delta[0].variables.saveDetails.slot.count++;
			sessionStorage.setItem(Story.domId + ".state", JSON.stringify(session));
		}
	}
}

window.importSettings = function (data, type) {
	switch(type){
		case "text":
			V.importString = document.getElementById("settingsDataInput").value
			new Wikifier(null, '<<displaySettings "importConfirmDetails">>');
			break;
		case "file":
			var reader = new FileReader();
			reader.addEventListener('load', function (e) {
				V.importString = e.target.result;
				new Wikifier(null, '<<displaySettings "importConfirmDetails">>');
			});
			reader.readAsBinaryString(data[0]);
			break;
		case "function":
			importSettingsData(data);
			break;
	}
}

var importSettingsData = function (data) {
	var S = null;
	var result = data;
	if (result != null && result != undefined) {
		//console.log("json",JSON.parse(result));
		S = JSON.parse(result);
		if (V.passage === "Start" && S.starting != undefined) {
			S.starting = settingsConvert(false, "starting", S.starting)
		}
		if(S.general != undefined){
			S.general = settingsConvert(false, "general", S.general)
		}

		if (V.passage === "Start" && S.starting != undefined) {
			var listObject = settingsObjects("starting");
			var listKey = Object.keys(listObject);
			var namedObjects = ["player", "skinColor"];

			for (var i = 0; i < listKey.length; i++) {
				if (namedObjects.includes(listKey[i]) && S.starting[listKey[i]] != undefined) {
					var itemKey = Object.keys(listObject[listKey[i]]);
					for (var j = 0; j < itemKey.length; j++) {
						if (V[listKey[i]][itemKey[j]] != undefined && S.starting[listKey[i]][itemKey[j]] != undefined) {
							if (validateValue(listObject[listKey[i]][itemKey[j]], S.starting[listKey[i]][itemKey[j]])) {
								V[listKey[i]][itemKey[j]] = S.starting[listKey[i]][itemKey[j]];
							}
						}
					}
				} else if (!namedObjects.includes(listKey[i])) {
					if (V[listKey[i]] != undefined && S.starting[listKey[i]] != undefined) {
						if (validateValue(listObject[listKey[i]], S.starting[listKey[i]])) {
							V[listKey[i]] = S.starting[listKey[i]];
						}
					}
				}
			}
		}

		if (S.general != undefined) {
			var listObject = settingsObjects("general");
			var listKey = Object.keys(listObject);
			var namedObjects = ["map", "skinColor", "shopDefaults"];

			for (var i = 0; i < listKey.length; i++) {
				if (namedObjects.includes(listKey[i]) && S.general[listKey[i]] != undefined) {
					var itemKey = Object.keys(listObject[listKey[i]]);
					for (var j = 0; j < itemKey.length; j++) {
						if (V[listKey[i]][itemKey[j]] != undefined && S.general[listKey[i]][itemKey[j]] != undefined) {
							if (validateValue(listObject[listKey[i]][itemKey[j]], S.general[listKey[i]][itemKey[j]])) {
								V[listKey[i]][itemKey[j]] = S.general[listKey[i]][itemKey[j]];
							}
						}
					}
				} else if (!namedObjects.includes(listKey[i])) {
					if (V[listKey[i]] != undefined && S.general[listKey[i]] != undefined) {
						if (validateValue(listObject[listKey[i]], S.general[listKey[i]])) {
							V[listKey[i]] = S.general[listKey[i]];
						}
					}
				}
			}
		}

		if (S.npc != undefined) {
			var listObject = settingsObjects("npc");
			var listKey = Object.keys(listObject);
			for (var i = 0; i < V.NPCNameList.length; i++) {
				if (S.npc[V.NPCNameList[i]] != undefined) {
					for (var j = 0; j < listKey.length; j++) {
						//Overwrite to allow for "none" default value in the start passage to allow for rng to decide
						if (V.passage === "Start" && ["pronoun","gender"].includes(listKey[j]) && S.npc[V.NPCNameList[i]][listKey[j]] === "none"){
							V.NPCName[i][listKey[j]] = S.npc[V.NPCNameList[i]][listKey[j]];
						}
						else if (validateValue(listObject[listKey[j]], S.npc[V.NPCNameList[i]][listKey[j]])) {
							V.NPCName[i][listKey[j]] = S.npc[V.NPCNameList[i]][listKey[j]];
						}
					}
				}
			}
		}
	}
}

window.validateValue = function (keys, value) {
	//console.log("validateValue",keys,value);
	var keyArray = Object.keys(keys);
	var valid = false;
	if (keyArray.length === 0) {
		valid = true;
	}
	if (keyArray.includes("min")) {
		if (keys.min <= value && keys.max >= value) {
			valid = true;
		}
	}
	if (keyArray.includes("decimals") && value != undefined) {
		if (value.toFixed(keys.decimals) != value) {
			valid = false;
		}
	}
	if (keyArray.includes("bool")) {
		if (value === true || value === false) {
			valid = true;
		}
	}
	if (keyArray.includes("boolLetter")) {
		if (value === "t" || value === "f") {
			valid = true;
		}
	}
	if (keyArray.includes("strings") && value != undefined) {
		if (keys.strings.includes(value)) {
			valid = true;
		}
	}
	return valid;
}

window.exportSettings = function (data, type) {
	var S = {
		general: {
			map: {},
			skinColor: {},
			shopDefaults: {},
		},
		npc: {}
	};
	if (V.passage === "Start") {
		S.starting = {
			player: {},
			skinColor: {},
		};
		var listObject = settingsObjects("starting");
		var listKey = Object.keys(listObject);
		var namedObjects = ["player", "skinColor"];

		for (var i = 0; i < listKey.length; i++) {
			if (namedObjects.includes(listKey[i]) && V[listKey[i]] != undefined) {
				var itemKey = Object.keys(listObject[listKey[i]]);
				for (var j = 0; j < itemKey.length; j++) {
					if (V[listKey[i]][itemKey[j]] != undefined) {
						if (validateValue(listObject[listKey[i]][itemKey[j]], V[listKey[i]][itemKey[j]])) {
							S.starting[listKey[i]][itemKey[j]] = V[listKey[i]][itemKey[j]];
						}
					}
				}
			} else if (!namedObjects.includes(listKey[i])) {
				if (V[listKey[i]] != undefined) {
					if (validateValue(listObject[listKey[i]], V[listKey[i]])) {
						S.starting[listKey[i]] = V[listKey[i]];
					}
				}
			}
		}
	}

	var listObject = settingsObjects("general");
	var listKey = Object.keys(listObject);
	var namedObjects = ["map", "skinColor", "shopDefaults"];

	for (var i = 0; i < listKey.length; i++) {
		if (namedObjects.includes(listKey[i]) && V[listKey[i]] != undefined) {
			var itemKey = Object.keys(listObject[listKey[i]]);
			for (var j = 0; j < itemKey.length; j++) {
				if (V[listKey[i]][itemKey[j]] != undefined) {
					if (validateValue(listObject[listKey[i]][itemKey[j]], V[listKey[i]][itemKey[j]])) {
						S.general[listKey[i]][itemKey[j]] = V[listKey[i]][itemKey[j]];
					}
				}
			}
		} else if (!namedObjects.includes(listKey[i])) {
			if (V[listKey[i]] != undefined) {
				if (validateValue(listObject[listKey[i]], V[listKey[i]])) {
					S.general[listKey[i]] = V[listKey[i]];
				}
			}
		}
	}
	var listObject = settingsObjects("npc");
	var listKey = Object.keys(listObject);
	for (var i = 0; i < V.NPCNameList.length; i++) {
		S.npc[V.NPCNameList[i]] = {};
		for (var j = 0; j < listKey.length; j++) {
			//Overwrite to allow for "none" default value in the start passage to allow for rng to decide
			if (V.passage === "Start" && ["pronoun","gender"].includes(listKey[i]) && V.NPCName[i][listKey[j]] === "none"){
				S.npc[V.NPCNameList[i]][listKey[j]] = V.NPCName[i][listKey[j]];
			}
			else if (validateValue(listObject[listKey[j]], V.NPCName[i][listKey[j]])) {
				S.npc[V.NPCNameList[i]][listKey[j]] = V.NPCName[i][listKey[j]];
			}
		}
	}

	if (V.passage === "Start") {
		S.starting = settingsConvert(true, "starting", S.starting)
	}
	S.general = settingsConvert(true, "general", S.general)

	//console.log(S);
	var result = JSON.stringify(S);
	if (type === "text") {
		var textArea = document.getElementById("settingsDataInput");
		textArea.value = result;
	}
	else if (type === "file") {
		var blob = new Blob([result], { type: "text/plain;charset=utf-8" });
		saveAs(blob, "DolSettingsExport.txt");
	}
}

window.settingsObjects = function (type) {
	var result = undefined;
	/*boolLetter type also requires the bool type aswell*/
	switch (type) {
		case "starting":
			result = {
				bodysize: { min: 0, max: 3, decimals: 0, randomize: "characterAppearance" },
				breastsensitivity: { min: 0, max: 5, decimals: 0, randomize: "characterTrait" },
				genitalsensitivity: { min: 0, max: 5, decimals: 0, randomize: "characterTrait" },
				eyeselect: { strings: ["purple", "dark blue", "light blue", "amber", "hazel", "green", "lime green", "red", "pink", "grey", "light grey", "random"], randomize: "characterAppearance" },
				hairselect: { strings: ["red", "jetblack", "black", "brown", "softbrown", "lightbrown", "burntorange", "blond", "softblond", "platinumblond", "ashyblond", "strawberryblond", "ginger", "random"], randomize: "characterAppearance" },
				hairlength: { min: 0, max: 400, decimals: 0, randomize: "characterAppearance" },
				awareselect: { strings: ["innocent", "knowledgeable"], randomize: "characterTrait" },
				background: { strings: ["waif", "nerd", "athlete", "delinquent", "promiscuous", "exhibitionist", "deviant", "beautiful", "crossdresser", "lustful", "greenthumb", "plantlover"], randomize: "characterTrait" },
				gamemode: { strings: ["normal", "soft", "hard"] },
				ironmanmode: {bool: false, bool:true},
				maxStates: {min: 1, max:20, decimals: 0},
				player: {
					gender: { strings: ["m", "f", "h"], randomize: "characterAppearance" },
					gender_body: { strings: ["m", "f", "a"], randomize: "characterAppearance" },
					ballsExist: { bool: true, randomize: "characterAppearance" },
					freckles: { bool: true, strings: ["random"], randomize: "characterAppearance" },
					breastsize: { min: 0, max: 4, decimals: 0, randomize: "characterAppearance"  },
					penissize: { min: 0, max: 3, decimals: 0, randomize: "characterAppearance" },
					bottomsize: { min: 0, max: 3, decimals: 0, randomize: "characterAppearance" }
				},
				skinColor: {
					natural: { strings: ["light", "medium", "dark", "gyaru", "ylight", "ymedium", "ydark", "ygyaru"], randomize: "characterAppearance" },
					range: { min: 0, max: 100, decimals: 0, randomize: "characterAppearance" },
				}
			};
			break;
		case "general":
			result = {
				malechance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				dgchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				cbchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				malevictimchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				homochance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				npcVirginityChance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				npcVirginityChanceAdult: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				breast_mod: { min: -12, max: 12, decimals: 0, randomize: "encounter" },
				penis_mod: { min: -8, max: 8, decimals: 0, randomize: "encounter" },
				whitechance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				blackchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				straponchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				alluremod: { min: 0.2, max: 2, decimals: 1, randomize: "gameplay" },
				clothesPrice: { min: 1, max: 10, decimals: 1, randomize: "gameplay" },
				clothesPriceUnderwear: { min: 1, max: 2, decimals: 1, randomize: "gameplay" },
				clothesPriceSchool: { min: 1, max: 2, decimals: 1, randomize: "gameplay" },
				clothesPriceLewd: { min: 0.1, max: 2, decimals: 1, randomize: "gameplay" },
				tending_yield_factor: { min: 1, max: 10, decimals: 1, randomize: "gameplay" },
				rentmod: { min: 0.1, max: 3, decimals: 1, randomize: "gameplay" },
				beastmalechance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				monsterchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				monsterhallucinations: { boolLetter: true, bool: true, randomize: "encounter" },
				blackwolfmonster: { min: 0, max: 2, decimals: 0, randomize: "encounter" },
				greathawkmonster: { min: 0, max: 2, decimals: 0, randomize: "encounter" },
				bestialitydisable: { boolLetter: true, bool: true },
				swarmdisable: { boolLetter: true, bool: true },
				slimedisable: { boolLetter: true, bool: true },
				voredisable: { boolLetter: true, bool: true },
				tentacledisable: { boolLetter: true, bool: true },
				analdisable: { boolLetter: true, bool: true },
				analdoubledisable: { boolLetter: true, bool: true },
				analingusdisablegiving: { boolLetter: true, bool: true },
				analingusdisablereceiving: { boolLetter: true, bool: true },
				vaginaldoubledisable: { boolLetter: true, bool: true },
				transformdisable: { boolLetter: true, bool: true },
				transformdisabledivine: { boolLetter: true, bool: true },
				hirsutedisable: { boolLetter: true, bool: true },
				pbdisable: { boolLetter: true, bool: true },
				breastfeedingdisable: { boolLetter: true, bool: true },
				analpregdisable: { boolLetter: true, bool: true },
				watersportsdisable: { boolLetter: true, bool: true },
				facesitdisable: { boolLetter: true, bool: true },
				spiderdisable: { boolLetter: true, bool: true },
				bodywritingdisable: { boolLetter: true, bool: true },
				parasitedisable: { boolLetter: true, bool: true},
				slugdisable: { boolLetter: true, bool: true},
				waspdisable: {boolLetter: true, bool: true},
				beedisable: { boolLetter: true, bool: true},
				lurkerdisable: {boolLetter: true, bool: true},
				horsedisable: {boolLetter: true, bool: true},
				plantdisable: {boolLetter: true, bool: true},
				footdisable: {boolLetter: true, bool: true},
				toydildodisable: {boolLetter: true, bool: true},
				toywhipdisable: {boolLetter: true, bool: true},
				asphyxiaLvl: { min: 0, max: 4, decimals: 0 },
				NudeGenderDC: { min: 0, max: 2, decimals: 0 },
				breastsizemin: { min: 0, max: 4, decimals: 0 },
				breastsizemax: { min: 0, max: 13, decimals: 0 },
				bottomsizemax: { min: 0, max: 9, decimals: 0 },
				penissizemax: { min: -2, max: 4, decimals: 0 },
				penissizemin: { min: -2, max: 0, decimals: 0 },
				/*ToDo: Pregnancy, uncomment to properly enable, add defaults back to DolSettingsExport.json*/
				//baseVaginalPregnancyChance: { min: 0, max: 96, decimals: 0 },
				//baseNpcPregnancyChance: { min: 0, max: 16, decimals: 0 },
				//humanPregnancyMonths: { min: 1, max: 9, decimals: 0 },
				//wolfPregnancyWeeks: { min: 2, max: 12, decimals: 0 },
				//playerPregnancyHumanDisable: {boolLetter: true, bool: true},
				//playerPregnancyBeastDisable: {boolLetter: true, bool: true},
				//npcPregnancyDisable: {boolLetter: true, bool: true},
				images: { min: 0, max: 1, decimals: 0 },
				sidebarAnimations: { bool: true },
				combatAnimations: { bool: true },
				bodywritingImages: { bool: true },
				silhouettedisable: { boolLetter: true, bool: true },
				blinkingdisable: { boolLetter: true, bool: true },
				halfcloseddisable: { boolLetter: true, bool: true },
				numberify_enabled: { min: 0, max: 1, decimals: 0 },
				timestyle: { strings: ["military", "ampm"] },
				checkstyle: { strings: ["percentage", "words", "skillname"], randomize: "gameplay" },
				tipdisable: { boolLetter: true, bool: true },
				debugdisable: { boolLetter: true, bool: true },
				statdisable: { boolLetter: true, bool: true },
				cheatdisabletoggle: { boolLetter: true, bool: true },
				showCaptionText: { bool: true },
				confirmSave: { bool: true },
				confirmLoad: { bool: true },
				confirmDelete: { bool: true },
				newWardrobeStyle: { bool: true },
				imgLighten: { strings: ["", "imgLighten", "imgLighten2"] },
				sidebarStats: { strings: ["Disabled", "Limited", "All"] },
				sidebarTime: { strings: ["Disabled", "top", "bottom"] },
				combatControls: { strings: ["radio", "lists", "limitedLists"] },
				reducedLineHeight: { bool: true },
				neverNudeMenus: { bool: true },
				skipStatisticsConfirmation: { bool: true},
				multipleWardrobes: { strings: [false, "isolated"] }, //, "all"
				outfitEditorPerPage: { min: 5, max: 20, decimals: 0 }, //, "all"
				map: {
					movement: { bool: true },
					top: { bool: true },
					markers: { bool: true },
				},
				skinColor: {
					tanImgEnabled: { boolLetter: true, bool: true },
					tanningEnabled: { bool: true },
				},
				shopDefaults: {
					alwaysBackToShopButton: { bool: true },
					color: { strings: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom", "random"] },
					colourItems: { strings: ["disable","random","default"] },
					compactMode: { bool: true },
					disableReturn: { bool: true },
					highContrast: { bool: true },
					mannequinGender: { strings: ["same","opposite","male","female"] },
					mannequinGenderFromClothes:  { bool: true },
					noHelp: { bool: true },
					noTraits: { bool: true },
					secColor: { strings: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom", "random"] },
				},
			};
			break;
		case "npc":
			result = {
				pronoun: { strings: ["m", "f"] },
				gender: { strings: ["m", "f"] },
				penissize: { min: 0, max: 4, decimals: 0 },
				breastsize: { min: 0, max: 12, decimals: 0 },
			}
			break;
	}
	return result;
}

/*Converts specific settings to so they dont look so chaotic to players*/
window.settingsConvert = function(exportType, type, settings){
	var listObject = settingsObjects(type);
	var result = settings;
	var keys = Object.keys(listObject);
	for (var i = 0; i < keys.length; i++){
		if (result[keys[i]] === undefined) continue;
		if(["map", "skinColor", "player", "shopDefaults"].includes(keys[i])){
			var itemKey = Object.keys(listObject[keys[i]]);
			for (var j = 0; j < itemKey.length; j++) {
				if (result[keys[i]][itemKey[j]] === undefined) continue;
				var keyArray = Object.keys(listObject[keys[i]][itemKey[j]]);
				if(exportType){
					if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
						if (result[keys[i]][itemKey[j]] === "t") {
							result[keys[i]][itemKey[j]] = true;
						}else if(result[keys[i]][itemKey[j]] === "f"){
							result[keys[i]][itemKey[j]] = false;
						}
					}
				}else{
					if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
						if (result[keys[i]][itemKey[j]] === true) {
							result[keys[i]][itemKey[j]] = "t";
						}else if(result[keys[i]][itemKey[j]] === false){
							result[keys[i]][itemKey[j]] = "f";
						}
					}
				}
			}
		}else{
			var keyArray = Object.keys(listObject[keys[i]]);
			if(exportType){
				if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
					if (result[keys[i]] === "t") {
						result[keys[i]] = true;
					}else if(result[keys[i]] === "f"){
						result[keys[i]] = false;
					}
				}
			}else{
				if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
					if (result[keys[i]] === true) {
						result[keys[i]] = "t";
					}else if(result[keys[i]] === false){
						result[keys[i]] = "f";
					}
				}
			}
		}
	}
	return result;
}

window.loadExternalExportFile = function () {
	importScripts("DolSettingsExport.json")
		.then(function () {
			var textArea = document.getElementById("settingsDataInput");
			textArea.value = JSON.stringify(DolSettingsExport);
		})
		.catch(function (err) {
			//console.log(err);
			var button = document.getElementById("LoadExternalExportFile");
			button.value = "Error Loading";
		});
}

window.randomizeSettings = function (filter) {
	let settingsResult = {};
	const settingContainers = ['player','skinColor'];
	const randomizeSettingLoop = function (settingsObject, mainObject, subObject) {
		if(mainObject && !settingsResult[mainObject]){
			settingsResult[mainObject] = {};
		}
		if(subObject){
			if(!settingsResult[mainObject][subObject]) settingsResult[mainObject][subObject] = {};
		}
		Object.entries(settingsObject).forEach((setting) => {
			if(settingContainers.includes(setting[0])) {
				randomizeSettingLoop(setting[1],mainObject,setting[0]);
			} else if((!filter && setting[1].randomize) || (filter && filter === setting[1].randomize)){
				if(subObject){
					settingsResult[mainObject][subObject][setting[0]] = randomizeSettingSet(setting[1]);
				} else {
					settingsResult[mainObject][setting[0]] = randomizeSettingSet(setting[1]);
				}
			}
		})
	}
	const randomNumber = function(min,max,decimals = 0) {
		let decimalsMult = Math.pow(10,decimals);
		let minMult = min * decimalsMult;
		let maxMult = max * decimalsMult;
		let rn = (Math.floor(Math.random() * (maxMult - minMult)) + minMult) / decimalsMult;
		return parseFloat(rn.toFixed(decimals));
	}
	const randomizeSettingSet = function (setting) {
		let result;
		var keys = Object.keys(setting);
		if(keys.includes('min')){
			result = randomNumber(setting.min, setting.max, setting.decimals);
		}
		if(keys.includes('strings')){
			result = setting.strings.pluck();
		}
		if(keys.includes('boolLetter')){
			result = ['t','f'].pluck();
		}
		if(keys.includes('bool')){
			result = [true,false].pluck();
		}
		return result;
	}
	if(V.passage === "Start"){
		randomizeSettingLoop(settingsObjects('starting'),'starting');
	}
	randomizeSettingLoop(settingsObjects('general'),'general');

	return JSON.stringify(settingsResult);
}

// !!Hack warning!! Don't use it maybe?
window.updateMoment = function () {
	// change last (and only) moment in local history
	State.history[State.history.length - 1].variables = JSON.parse(JSON.stringify(V));
	// prepare the moment object with modified history
	let moment = SugarCube.State.marshalForSave();
	// replace moment.history with moment.delta, because that's what SugarCube expects to find
	// this is a bad thing to do probably btw, because while history and delta appear to look very similar,
	// they're not always the same thing, SugarCube actually decodes delta into history (see: https://github.com/tmedwards/sugarcube-2/blob/36a8e1600160817c44866205bc4d2b7730b2e70c/src/state.js#L527)
	// but for my purpose it works (i think?)
	//delete Object.assign(moment, {delta: moment.history}).history;
	// delta-encode the state
	delete Object.assign(moment, {delta: State.deltaEncode(moment.history)}).history;
	// replace saved moment in session with the new one
	let gameName = SugarCube.Story.domId;
	sessionStorage[gameName + ".state"] = JSON.stringify(moment);
	// it appears that this line is not necessary for it to work
	//SugarCube.session._engine[gameName + ".state"] = JSON.stringify(moment);

	// Voilà! F5 will reload the current state now without going to another passage!
}

window.isJsonString = function(s) {
	try {
		JSON.parse(s);
	} catch (e) {
		return false;
	}
	return true;
}
