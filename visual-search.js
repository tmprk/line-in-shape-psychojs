/*************** 
 * Stroop Test *
 ***************/

import { core, data, sound, util, visual } from './library/psychojs-2021.2.1.js';
const { PsychoJS } = core;
const { TrialHandler } = data;
const { Scheduler } = util;
 //some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;
import Stimuli from './stimulus.js';

// init psychoJS:
const psychoJS = new PsychoJS({
	debug: true
});

// open window:
psychoJS.openWindow({
	fullscr: false,
	color: new util.Color('black'),
	units: 'height',
	waitBlanking: true
});

// store info about the experiment session:
let expName = 'Visual Search Task';  // from the Builder filename that created this script
let expInfo = { 'session': '01', 'participant': '', 'gender': ['Male', 'Female', 'Other']};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
	dictionary: expInfo,
	title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function () { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo);
flowScheduler.add(experimentInit);

flowScheduler.add(instructRoutineBegin());
flowScheduler.add(instructRoutineEachFrame());
flowScheduler.add(instructRoutineEnd());

const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin, trialsLoopScheduler);
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);

flowScheduler.add(thanksRoutineBegin());
flowScheduler.add(thanksRoutineEachFrame());
flowScheduler.add(thanksRoutineEnd());

flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

// psychoJS.start({expName, expInfo});
psychoJS.start({
	expName,
	expInfo,
	resources: []
});

const trialtype = {
	NO_DISTRACTOR: 0,
	DISTRACTOR_MATCHED: 1,
	DISTRACTOR_MISMATCHED: 2
}

const elements_per_stimuli = [8, 12, 16, 20];

const getShuffledArr = arr => {
	const newArr = arr.slice()
	for (let i = newArr.length - 1; i > 0; i--) {
		const rand = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
	}
	return newArr
};

function createDist(size) {
	var array = new Array(size);
	var distractors_matched, distractors_mismatched, nondistractors;
	distractors_matched = distractors_mismatched = Number(size * 0.25)
	nondistractors = size - (distractors_matched + distractors_mismatched)

	array.fill(0, 0, size / 2)
	array.fill(1, size / 2, size / 2 + size / 4)
	array.fill(2, size / 2 + size / 4, size)

	return getShuffledArr(array);
}

// https://stackoverflow.com/questions/23411688/drawing-polygon-with-n-number-of-sides-in-python-3-2
function polygon(sides, radius, rotation = 0) {
	function storeCoordinate(xVal, yVal, array) {
		array.push([xVal, yVal]);
	}

	var one_segment = Math.PI * 2 / sides;
	var coordinate_array = []
	for (let step = 0; step < sides; step++) {
		storeCoordinate(
			Math.sin(one_segment * step + rotation) * radius,
			Math.cos(one_segment * step + rotation) * radius,
			coordinate_array
		)
	}
	return coordinate_array
}

function randomExcludedNumber(numLength, excludeNumber) {
	var randNumber = excludeNumber;
	while(randNumber == excludeNumber)
	{
		randNumber = Math.floor(Math.random() * numLength)
	}
	return randNumber;
}

// create line vertices from a single point, since there's no line stimuli
function createLineVertices(point) {
	return [[point[0] - 0.02, point[1]], [point[0] + 0.02, point[1]]]
}


var frameDur;
function updateInfo() {
	expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
	expInfo['expName'] = expName;
	expInfo['psychopyVersion'] = '3.2.5';
	expInfo['OS'] = window.navigator.platform;

	// store frame rate of monitor if we can measure it successfully
	expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
	if (typeof expInfo['frameRate'] !== 'undefined')
		frameDur = 1.0 / Math.round(expInfo['frameRate']);
	else
		frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

	// add info from the URL:
	util.addInfoFromUrl(expInfo);

	return Scheduler.Event.NEXT;
}

var instructClock;
var instrText;
var ready;
var trialClock;
var resp;

var fixation;
var shape_array;

var thanksClock;
var thanksText;

var globalClock;
var routineTimer;

function experimentInit() {
	// Initialize components for Routine "instruct"
	instructClock = new util.Clock();
	instrText = new visual.TextStim({
		win: psychoJS.window,
		name: 'instrText',
		text: 'Visual Search Instructions.\n\nIn this experiment, you will indicate the orientation of the line in a target (square).\n\nPress any key to begin.',
		font: 'Arial',
		units: 'height',
		pos: [0, 0],
		height: 0.05,
		wrapWidth: undefined,
		ori: 0,
		color: new util.Color('white'), opacity: 1,
		depth: 0.0
	});

	ready = new core.Keyboard({ psychoJS, clock: new util.Clock(), waitForStart: true });

	// Initialize components for Routine "trial"
	trialClock = new util.Clock();
	resp = new core.Keyboard({ psychoJS, clock: new util.Clock(), waitForStart: true });

	fixation = new visual.ShapeStim({
		win: psychoJS.window,
		name: 'fixation',
		vertices: 'cross',
		ori: 1.0,
		pos: [0, 0],
		lineWidth: 2,
		lineColor: new util.Color([1, 1, 1]),
		fillColor: new util.Color([1, 1, 1]),
		size: 0.03,
		opacity: 1,
		depth: 0,
		interpolate: true,
	});

	// Initialize components for Routine "thanks"
	thanksClock = new util.Clock();
	thanksText = new visual.TextStim({
		win: psychoJS.window,
		name: 'thanksText',
		text: 'This is the end of the experiment.\n\nThanks!',
		font: 'Arial',
		units: 'height',
		pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0,
		color: new util.Color('white'), opacity: 1,
		depth: 0.0
	});

	// Create some handy timers
	globalClock = new util.Clock();  // to track the time since experiment started
	routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine

	return Scheduler.Event.NEXT;
}

var t;
var frameN;
var instructComponents;
function instructRoutineBegin(trials) {
	return function () {
		//------Prepare to start Routine 'instruct'-------
		t = 0;
		instructClock.reset(); // clock
		frameN = -1;
		// update component parameters for each repeat
		ready.keys = undefined;
		ready.rt = undefined;
		// keep track of which components have finished
		instructComponents = [];
		instructComponents.push(instrText);
		instructComponents.push(ready);

		for (const thisComponent of instructComponents)
			if ('status' in thisComponent)
				thisComponent.status = PsychoJS.Status.NOT_STARTED;

		return Scheduler.Event.NEXT;
	};
}

var continueRoutine;
function instructRoutineEachFrame(trials) {
	return function () {
		//------Loop for each frame of Routine 'instruct'-------
		let continueRoutine = true; // until we're told otherwise
		// get current time
		t = instructClock.getTime();
		frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
		// update/draw components on each frame

		// *instrText* updates
		if (t >= 0 && instrText.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			instrText.tStart = t;  // (not accounting for frame time here)
			instrText.frameNStart = frameN;  // exact frame index
			instrText.setAutoDraw(true);
		}


		// *ready* updates
		if (t >= 0 && ready.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			ready.tStart = t;  // (not accounting for frame time here)
			ready.frameNStart = frameN;  // exact frame index

			// keyboard checking is just starting
			psychoJS.window.callOnFlip(function () { ready.clock.reset(); });  // t=0 on next screen flip
			psychoJS.window.callOnFlip(function () { ready.start(); }); // start on screen flip
			psychoJS.window.callOnFlip(function () { ready.clearEvents(); });
		}

		if (ready.status === PsychoJS.Status.STARTED) {
			let theseKeys = ready.getKeys({ keyList: [], waitRelease: false });

			if (theseKeys.length > 0) {  // at least one key was pressed
				// a response ends the routine
				continueRoutine = false;
			}
		}

		// check for quit (typically the Esc key)
		if (psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
			return quitPsychoJS('The Escape key was pressed. Goodbye!', false);
		}

		// check if the Routine should terminate
		if (!continueRoutine) {  // a component has requested a forced-end of Routine
			return Scheduler.Event.NEXT;
		}

		continueRoutine = false;  // reverts to True if at least one component still running
		for (const thisComponent of instructComponents)
			if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
				continueRoutine = true;
				break;
			}

		// refresh the screen if continuing
		if (continueRoutine) {
			return Scheduler.Event.FLIP_REPEAT;
		}
		else {
			return Scheduler.Event.NEXT;
		}
	};
}


function instructRoutineEnd(trials) {
	return function () {
		//------Ending Routine 'instruct'-------
		for (const thisComponent of instructComponents) {
			if (typeof thisComponent.setAutoDraw === 'function') {
				thisComponent.setAutoDraw(false);
			}
		}
		// the Routine "instruct" was not non-slip safe, so reset the non-slip timer
		routineTimer.reset();

		return Scheduler.Event.NEXT;
	};
}

var trials;
var currentLoop;
function trialsLoopBegin(thisScheduler) {
	var sequence = createDist(4)
	// sequence_length = sequence.length

	// set up handler to look after randomisation of conditions etc
	trials = new TrialHandler({
		psychoJS: psychoJS,
		nReps: 2, method: TrialHandler.Method.RANDOM,
		extraInfo: expInfo, originPath: undefined,
		trialList: [
			{'distractor': false, 'matching': false},
			{'distractor': false, 'matching': false},
			{'distractor': true, 'matching': true},
			{'distractor': true, 'matching': false},
		],
		seed: undefined, name: 'trials'
	});
	psychoJS.experiment.addLoop(trials); // add the loop to the experiment
	currentLoop = trials;  // we're now the current loop

	// Schedule all the trials in the trialList:
	for (const thisTrial of trials) {
		const snapshot = trials.getSnapshot();
		console.log('snap:', snapshot)

		thisScheduler.add(importConditions(snapshot));
		thisScheduler.add(trialRoutineBegin(snapshot));
		thisScheduler.add(trialRoutineEachFrame(snapshot));
		thisScheduler.add(trialRoutineEnd(snapshot));
		thisScheduler.add(endLoopIteration(thisScheduler, snapshot));
	}

	return Scheduler.Event.NEXT;
}


function trialsLoopEnd() {
	psychoJS.experiment.removeLoop(trials);
	return Scheduler.Event.NEXT;
}

var trialComponents;
var number_of_elements;
var coordinates_array;
var targetItem;
var itemToChange;
var correctAnswer;

function trialRoutineBegin(trials) {
	return function () {
		//------Prepare to start Routine 'trial'-------
		t = 0;
		trialClock.reset(); // clock
		frameN = -1;

		number_of_elements = elements_per_stimuli[Math.floor(Math.random() * elements_per_stimuli.length)]
		shape_array = new Array()

		for (let i=0; i<number_of_elements; i++) {
			shape_array.push(new Stimuli())
		}

		coordinates_array = polygon(number_of_elements, 0.4)
		shape_array.forEach((element, index) => element.position = coordinates_array[index])

		// console.log(coordinates_array)
		console.log('shape_array', shape_array)
		console.log('current loop', currentLoop);
		console.log('current trial:', trials.getCurrentTrial());
		
		// update component parameters for each repeat
		// word.setText(String(trials.thisN))
		resp.keys = undefined;
		resp.rt = undefined;
		// keep track of which components have finished
		trialComponents = [];

		// todo make changes to shape array based on trial
		let currentTrialType = trials.getCurrentTrial()
		if (!currentTrialType.distractor) {

			// set all of the shapes to green
			shape_array.forEach(function (element, i) {
				element.color = 'green';
				element.distractor = false;
			});

			shape_array[Math.floor(Math.random() * shape_array.length)].current = 'square'
			targetItem = shape_array.filter(element => element.shape == 'square')
		} else {
			
			// set all the shapes to red
			shape_array.forEach(function (element, i) {
				element.color = 'red';
				element.distractor = false;
			});

			// create distractor by setting it to green
			var distractor_index = Math.floor(Math.random() * shape_array.length)
			shape_array[distractor_index].color = 'green'
			shape_array[distractor_index].distractor = true

			// create a target (a square) but make sure it's not the distractor
			let index_to_exclude = shape_array.findIndex(x => x.distractor === 'true');
			var targetIndex = randomExcludedNumber(shape_array.length, index_to_exclude)
			shape_array[targetIndex].current = 'square'

			itemToChange = shape_array[distractor_index]
			targetItem = shape_array[targetIndex]

			if (currentTrialType.matching) {
				console.log('distractor matched')
				itemToChange.orientation = targetItem.orientation;
			} else {
				console.log('distractor mismatched')
				itemToChange.orientation = targetItem.orientation + 90;
			}
		}

		correctAnswer = (targetItem.orientation === 0) ? 'horizontal' : 'vertical';
		trialComponents.push(fixation);
		trialComponents.push(resp);

		shape_array.forEach(function (item, index) {
			var itemToAdd;
			var lineToAdd;
			if (item.shape == 'circle') {
				itemToAdd = new visual.Polygon({
					name: `shape_${index}`,
					win: psychoJS.window,
					units: 'height',
					edges: 30,
					size: 0.06,
					ori: 0,
					pos: item.position,
					lineWidth: 4,
					lineColor: new util.Color(item.color),
					fillColor: new util.Color([(-1.0), (-1.0), (-1.0)]),
					opacity: 1,
					depth: -1,
					interpolate: true,
				});
			} else {
				itemToAdd = new visual.Rect({
					name: `shape_${index}`,
					win: psychoJS.window,
					lineWidth: 4,
					size: 1,
					width: 0.06,
					height: 0.06,
					pos: item.position,
					ori: 0,
					units: 'height',
					lineColor: new util.Color(item.color),
					fillColor: new util.Color([(-1.0), (-1.0), (-1.0)])
				});
			}
			
			let lineVertices = createLineVertices(item.position)
			lineToAdd = new visual.ShapeStim({
				win: psychoJS.window,
				name: `line_${index}`,
				pos: item.position,
				vertices: [[-0.02, 0], [0.02, 0]],
				ori: item.orientation,
				size: 1.0,
				lineWidth: 3,
				lineColor: new util.Color([1, 1, 1]),
				fillColor: new util.Color([1, 1, 1]),
				opacity: 1,
				depth: 0,
				units: 'height',
				interpolate: true,
			});

			trialComponents.push(itemToAdd, lineToAdd)
		});
		
		console.log('components:', trialComponents)

		for (const thisComponent of trialComponents)
			if ('status' in thisComponent)
				thisComponent.status = PsychoJS.Status.NOT_STARTED;

		return Scheduler.Event.NEXT;
	};
}


function trialRoutineEachFrame(trials) {
	return function () {
		//------Loop for each frame of Routine 'trial'-------
		let continueRoutine = true; // until we're told otherwise
		// get current time
		t = trialClock.getTime();
		frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
		// update/draw components on each frame

		// *shape* updates
		for (let i=2; i<trialComponents.length;i++) {
			if (t >= 0.5 && trialComponents[i].status === PsychoJS.Status.NOT_STARTED) {
				trialComponents[i].tStart = t;
				trialComponents[i].frameNStart = frameN;
				trialComponents[i].setAutoDraw(true)
			}
		}


		if (t >= 0.5 && fixation.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			fixation.tStart = t;  // (not accounting for frame time here)
			fixation.frameNStart = frameN;  // exact frame index
			fixation.setAutoDraw(true);
		}


		// *resp* updates
		if (t >= 0.5 && resp.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			resp.tStart = t;  // (not accounting for frame time here)
			resp.frameNStart = frameN;  // exact frame index

			// keyboard checking is just starting
			psychoJS.window.callOnFlip(function () { resp.clock.reset(); });  // t=0 on next screen flip
			psychoJS.window.callOnFlip(function () { resp.start(); }); // start on screen flip
			psychoJS.window.callOnFlip(function () { resp.clearEvents(); });
		}

		if (resp.status === PsychoJS.Status.STARTED) {
			let theseKeys = resp.getKeys({ keyList: ['left', 'down', 'right'], waitRelease: false });

			if (theseKeys.length > 0) {  // at least one key was pressed
				resp.keys = theseKeys[0].name;  // just the last key pressed
				resp.rt = theseKeys[0].rt;
				// was this correct?
				if (resp.keys == 'left') { // temporary
					resp.corr = 1;
				} else {
					resp.corr = 0;
				}
				// a response ends the routine
				continueRoutine = false;
			}
		}

		// check for quit (typically the Esc key)
		if (psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
			return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
		}

		// check if the Routine should terminate
		if (!continueRoutine) {  // a component has requested a forced-end of Routine
			return Scheduler.Event.NEXT;
		}

		continueRoutine = false;  // reverts to True if at least one component still running
		for (const thisComponent of trialComponents)
			if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
				continueRoutine = true;
				break;
			}

		// refresh the screen if continuing
		if (continueRoutine) {
			return Scheduler.Event.FLIP_REPEAT;
		}
		else {
			return Scheduler.Event.NEXT;
		}
	};
}


function trialRoutineEnd(trials) {
	return function () {
		//------Ending Routine 'trial'-------
		for (const thisComponent of trialComponents) {
			if (typeof thisComponent.setAutoDraw === 'function') {
				thisComponent.setAutoDraw(false);
			}
		}

		// was no response the correct answer?!
		if (resp.keys === undefined) {
			if (['None', 'none', undefined].includes(corrAns)) {
				resp.corr = 1;  // correct non-response
			} else {
				resp.corr = 0;  // failed to respond (incorrectly)
			}
		}
		// store data for thisExp (ExperimentHandler)
		psychoJS.experiment.addData('corrAns', correctAnswer);
		psychoJS.experiment.addData('orientation', targetItem.orientation);
		psychoJS.experiment.addData('resp.keys', resp.keys);
		psychoJS.experiment.addData('resp.corr', resp.corr);
		if (typeof resp.keys !== 'undefined') {  // we had a response
			psychoJS.experiment.addData('resp.rt', resp.rt);
			routineTimer.reset();
		}

		resp.stop();
		// the Routine "trial" was not non-slip safe, so reset the non-slip timer
		routineTimer.reset();

		return Scheduler.Event.NEXT;
	};
}

var thanksComponents;
function thanksRoutineBegin(trials) {
	return function () {
		//------Prepare to start Routine 'thanks'-------
		t = 0;
		thanksClock.reset(); // clock
		frameN = -1;
		routineTimer.add(2.000000);
		// update component parameters for each repeat
		// keep track of which components have finished
		thanksComponents = [];
		thanksComponents.push(thanksText);

		for (const thisComponent of thanksComponents)
			if ('status' in thisComponent)
				thisComponent.status = PsychoJS.Status.NOT_STARTED;

		return Scheduler.Event.NEXT;
	};
}

var frameRemains;
function thanksRoutineEachFrame(trials) {
	return function () {
		//------Loop for each frame of Routine 'thanks'-------
		let continueRoutine = true; // until we're told otherwise
		// get current time
		t = thanksClock.getTime();
		frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
		// update/draw components on each frame

		// *thanksText* updates
		if (t >= 0.0 && thanksText.status === PsychoJS.Status.NOT_STARTED) {
			// keep track of start time/frame for later
			thanksText.tStart = t;  // (not accounting for frame time here)
			thanksText.frameNStart = frameN;  // exact frame index
			thanksText.setAutoDraw(true);
		}

		frameRemains = 0.0 + 2.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
		if (thanksText.status === PsychoJS.Status.STARTED && t >= frameRemains) {
			thanksText.setAutoDraw(false);
		}
		// check for quit (typically the Esc key)
		if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
			return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
		}

		// check if the Routine should terminate
		if (!continueRoutine) {  // a component has requested a forced-end of Routine
			return Scheduler.Event.NEXT;
		}

		continueRoutine = false;  // reverts to True if at least one component still running
		for (const thisComponent of thanksComponents)
			if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
				continueRoutine = true;
				break;
			}

		// refresh the screen if continuing
		if (continueRoutine && routineTimer.getTime() > 0) {
			return Scheduler.Event.FLIP_REPEAT;
		}
		else {
			return Scheduler.Event.NEXT;
		}
	};
}


function thanksRoutineEnd(trials) {
	return function () {
		//------Ending Routine 'thanks'-------
		for (const thisComponent of thanksComponents) {
			if (typeof thisComponent.setAutoDraw === 'function') {
				thisComponent.setAutoDraw(false);
			}
		}

		return Scheduler.Event.NEXT;
	};
}


function endLoopIteration(thisScheduler, loop = undefined) {
	// ------Prepare for next entry------
	return function () {
		if (typeof loop !== 'undefined')
		{
			// ------Check if user ended loop early------
			if (loop.finished)
			{
				// Check for and save orphaned data
				if (psychoJS.experiment.isEntryEmpty())
				{
					psychoJS.experiment.nextEntry(loop);
				}
				thisScheduler.stop();
			} else
			{
				const thisTrial = loop.getCurrentTrial();
				if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials)
				{
					psychoJS.experiment.nextEntry(loop);
				}
			}
		}

		return Scheduler.Event.NEXT;
	};
}


function importConditions(trials) {
	return function () {
		psychoJS.importAttributes(trials.getCurrentTrial());

		return Scheduler.Event.NEXT;
	};
}


function quitPsychoJS(message, isCompleted) {
	// Check for and save orphaned data
	if (psychoJS.experiment.isEntryEmpty()) {
		psychoJS.experiment.nextEntry();
	}

	psychoJS.experiment.apiCall()

	psychoJS.window.close();
	psychoJS.quit({ message: message, isCompleted: isCompleted });

	return Scheduler.Event.QUIT;
}
