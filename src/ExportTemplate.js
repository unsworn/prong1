﻿// Exports boxes from Adobe Illustratorvar inputDialogResult = undefined;function inputDialog (queryString, title){    // Create a window of type dialog.    var dia = new Window("dialog", title, [100,100,330,200]);  // bounds = [left, top, right, bottom]    this.windowRef = dia;        inputDialogResult = undefined;        // Add the components, a label, two buttons and input    dia.label = dia.add("statictext", [20, 10, 210, 30]);    dia.label.text = queryString;    dia.input = dia.add("edittext", [20, 30, 210, 50]);    dia.input.textselection = "[Type series]";    dia.input.active = true;    dia.okBtn = dia.add("button", [20,65,105,85], "OK");    dia.cancelBtn = dia.add("button", [120, 65, 210, 85], "Cancel");    // Register event listeners that define the button behavior    //user clicked OK    dia.okBtn.onClick = function() {        if(dia.input.text != "") { //check that the text input wasn't empty            inputDialogResult = dia.input.text;            dia.close(); //close the window        } else { //the text box is blank            alert("Please enter a value."); //don't close the window, ask the user to enter something        }    };    //user clicked Cancel    dia.cancelBtn.onClick = function() {        dia.close();    };    // Display the window    dia.show();}function trim(str, chars) {	return ltrim(rtrim(str, chars), chars);} function ltrim(str, chars) {	chars = chars || "\\s";	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");} function rtrim(str, chars) {	chars = chars || "\\s";	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");}/** * json encoder.. */function array2json(arr){    var parts = [];    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');    for(var key in arr)    {    	var value = arr[key];        if(typeof value == "object")  //Custom handling for arrays        {            if(is_list)                parts.push(array2json(value)); /* :RECURSION: */                        else                parts[key] = array2json(value); /* :RECURSION: */        }        else        {            var str = "";            if(!is_list) str = '"' + key + '":';            //Custom handling for multiple data types            if(typeof value == "number")                str += value; //Numbers            else if(value === false)                str += 'false'; //The booleans            else if(value === true)                str += 'true';            else                str += '"' + value + '"'; //All other things            // :TODO: Is there any more datatype we should be in the lookout for? (Functions?)            parts.push(str);        }    }    var json = parts.join(",");        if(is_list)        return '[' + json + ']';//Return numerical JSON    return '{' + json + '}';//Return associative JSON}   function readProperties(item){    var out  = {};    var data = item.note;        var parts = data.split(";");    for (var i=0 ; i < parts.length ; i++)    {        var part = parts[i];                var keyVal = part.split("=");        if (keyVal.length == 2)        {            var key = trim(keyVal[0]);            var val = trim(keyVal[1]);            out[key] = val;        }    }        return out;}      /** * Game object specification */var doc = app.activeDocument;var items = doc.pageItems;//alert(doc.cropBox);//alert(doc.name);//doc.pathItems.rectangle(0, 0, 200, 100);//alert(doc.width);//alert(doc.height);//var docWidth  = doc.width;//var docHeight = doc.height;var a = new Array();for (var i=0 ; i < items.length ; i++){    var item = items[i];    var prop = readProperties(item);        if (!('game.name' in prop))        continue;            obj = new Object();                                    var b = item.geometricBounds;        var pW = (b[2] - b[0]);    var pH  = Math.abs(b[3] - b[1]);    var pX  = b[0];    var pY  = Math.abs(b[1]);            obj.absoluteX = pX;    obj.absoluteY = pY;    obj.absoluteW = pW;    obj.absoluteH = pH;        var rX = (pX / doc.width);    var rW = (pW / doc.width);    var rY = (pY / doc.height);    var rH = (pH / doc.height);        obj.relativeX = rX;    obj.relativeY = rY;    obj.relativeW = rW;    obj.relativeH = rH;                  obj.name = prop['game.name'];    obj.type   = prop['game.type'];                if (obj.type== "graphics")    {        obj.clz = prop['game.class'];    }       else if (obj.type== "property")    {        obj.parent = prop['game.parent'];    }           a.push(obj);}try{    var outputFolder = Folder.selectDialog( "Select a folder to save the template" );    if( outputFolder == null )    {        alert( "Please select a folder" );    }    else    {        var of = new File( outputFolder + "/template.json" );        of.open( "w" );        of.write( array2json(a) );        of.close();         alert( "Template saved!" );    }}catch( exception ){    alert( "Please select a folder" );}/*var color = new  RGBColor();color.red = 255;var out = doc.textFrames.add();out.left = -200;out.right = 0;out.bottom= 100;*/