control.data = {
	infoText : "This interfaces shows the different modes for the Button / MultiButton widgets. Toggle stays lit until it is pressed again, momentary stays lit until the touch leaves the button, latch stays on until the touch leaves the phone and contact only flashes quickly when first pressed. <br><br>Buttons and sliders also have a property called requiresTouchDown. When this property is set to true, you can only manipulate a widget if the touch event started on that particular widget. You can turn this on and off in this demo interface to see the results.<br><br>For output, the MultiButton outputs to the following OSC address:<br><br>/multi/buttonNumber value <br><br>where buttonNumber starts from the top left at 0 and proceeds row by row downwards. As an example, if we had a MultiButton widget with four rows and four columns the first button in the second row would be buttonNumber 4 (remember, the count starts at 0). MIDI outputs works the same way outputting note messages.",
};

control.functions = {
	buttonKiller : function() {
	    for (var i = 0; i < leftMulti.buttons.length; i++) {
	        multi.buttons[i].setValue(0);
	    }
	},
	
	buttonChanger : function(mode) {
		modeLabel.setValue("mode : " + mode);
	    for (var i = 0; i < leftMulti.buttons.length; i++) {
	        var btn = multi.buttons[i];
	        btn.mode = mode;
	        btn.setValue(0);
	    }
	},

	requireTouchDown : function(val) {
	    for (var i = 0; i < multi.buttons.length; i++) {
	        var btn = multi.buttons[i];
	        if (val == 1) {
	            btn.requiresTouchDown = true;
	        } else {
	            btn.requiresTouchDown = false;
	        }
	    }
	},
};


control.interface = {
	name : "multibutton demo",
	orientation : "portrait",
	pages : [[
	{
	    "name": "multi",
	    "type": "MultiButton",
	    "x": 0,
	    "y": 0,
	    "rows": 8,
	    "columns": 8,
	    "width": .99,
	    "height": .6,
	    "startingValue": 0,
	    "color": "#990000",
	    "stroke": "#dd0000",
	    "min": 0,
	    "max": 127,
	    "mode": "toggle",
	    "protocol": "MIDI",
	    "midiType": "noteon",
	    "channel": 2,
	    "number": 0,
	    "requiresTouchDown": false,
	},

	{
	    "name": "modeLabel",
	    "type": "Label",
	    "x": .0,
	    "y": .625,
	    "width": .5,
	    "height": .05,
	    "value": "mode : toggle",
		"align": "left",
	},

	{
	    "name": "toggleButton",
	    "type": "Button",
	    "x": .0,
	    "y": .675,
	    "width": .25,
	    "height": .075,
	    "mode": "contact",
	    "color": "#ff0000",
	    "stroke": "#aaaaaa",
	    "min": 0,
	    "max": 1,
	    "protocol": "local",
	    "ontouchstart": function() { control.functions.buttonChanger("toggle") },
	},

	{
	    "name": "toggleLabel",
	    "type": "Label",
	    "x": .0,
	    "y": .675,
	    "width": .25,
	    "height": .075,
	    "value": "toggle",
	},

	{
	    "name": "momentaryButton",
	    "type": "Button",
	    "x": .25,
	    "y": .675,
	    "width": .25,
	    "height": .075,
	    "mode": "contact",
	    "color": "#ff0000",
	    "stroke": "#aaaaaa",
	    "min": 0,
	    "max": 1,
	    "protocol": "local",
	    "ontouchstart": function() { control.function.buttonChanger("momentary") },
	},
	{
	    "name": "momentaryLabel",
	    "type": "Label",
	    "x": .25,
	    "y": .675,
	    "width": .25,
	    "height": .075,
	    "value": "momentary",
	},

	{
	    "name": "latchButton",
	    "type": "Button",
	    "x": .0,
	    "y": .75,
	    "width": .25,
	    "height": .075,
	    "mode": "contact",
	    "color": "#ff0000",
	    "stroke": "#aaaaaa",
	    "min": 0,
	    "max": 1,
	    "protocol": "local",
	    "ontouchstart": function() { control.functions.buttonChanger("latch") },
	},

	{
	    "name": "latchLabel",
	    "type": "Label",
	    "x": .0,
	    "y": .75,
	    "width": .25,
	    "height": .075,
	    "value": "latch",
	},

	{
	    "name": "contactButton",
	    "type": "Button",
	    "x": .25,
	    "y": .75,
	    "width": .25,
	    "height": .075,
	    "mode": "contact",
	    "color": "#ff0000",
	    "stroke": "#aaaaaa",
	    "min": 0,
	    "max": 1,
	    "protocol": "local",
	    "ontouchstart": function() { control.functions.buttonChanger("contact") },
	},
	{
	    "name": "contactLabel",
	    "type": "Label",
	    "x": .25,
	    "y": .75,
	    "width": .25,
	    "height": .075,
	    "value": "contact",
	},
	{
	    "name": "touchdownButton",
	    "type": "Button",
	    "x": .65,
	    "y": .675,
	    "width": .345,
	    "height": .075,
	    "mode": "toggle",
	    "color": "#ff0000",
	    "stroke": "#aaaaaa",
	    "min": 0,
	    "max": 1,
	    "protocol": "local",
	    "ontouchstart": function() { control.functions.requireTouchDown(this.value) },
	},
	{
	    "name": "touchdownLabel",
	    "type": "Label",
	    "x": .65,
	    "y": .675,
	    "width": .345,
	    "height": .075,
	    "value": "require touchdown",
	},

	{
	    "name": "tabButton",
	    "type": "Button",
	    "x": .65,
	    "y": .75,
	    "width": .175,
	    "height": .075,
	    "mode": "toggle",
	    "color": "#333333",
	    "stroke": "#aaaaaa",
	    "protocol": "local",
	    "ontouchstart": function() { if(this.value == 1) { control.showToolbar(); tabLabel.changeValue('Hide Tabs');} else { control.hideToolbar(); tabLabel.changeValue('Show Tabs'); } },
	},
	{
	    "name": "tabButtonLabel",
	    "type": "Label",
	    "x": .65,
	    "y": .75,
	    "width": .175,
	    "height": .075,
	    "mode": "contact",
	    "protocol": "local",
	    "value": "menu",
	},
	{
	    "name": "infoButton",
	    "type": "Button",
	    "x": .825,
	    "y": .75,
	    "width": .17,
	    "height": .075,
	    "mode": "contact",
	    "color": "#333333",
	    "stroke": "#aaaaaa",
	    "midiType": "noteon",
	    "protocol": "local",
	    "ontouchstart": function() { control.changePage(1) },
	},
	{
	    "name": "infoButtonLabel",
	    "type": "Label",
	    "x": .825,
	    "y": .75,
	    "width": .17,
	    "height": .075,
	    "color": "#fff",
	    "value": "info",
	},

	],
	[
	{
	    "name": "infoText",
	    "type": "Label",
	    "x": .1,
	    "y": .1,
	    "width": .8,
	    "height": .7,
	    "value": control.data.infoText,
	    "verticalCenter": false,
	    "align": "left",
	},
	{
	    "name": "backButton",
	    "type": "Button",
	    "x": .8,
	    "y": .9,
	    "width": .19,
	    "height": .09,
	    "mode": "contact",
	    "color": "#333333",
	    "stroke": "#aaaaaa",
	    "protocol": "local",
	    "ontouchstart": function() { control.changePage(0) },
	},
	{
	    "name": "infoButtonLabel",
	    "type": "Label",
	    "x": .8,
	    "y": .9,
	    "width": .19,
	    "height": .09,
	    "color": "#fff",
	    "value": "back",
	},

	]],
};