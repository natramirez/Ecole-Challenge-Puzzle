// Name: dynList.js
// Author: Natalia Ramirez
// 
// Description: Creates a dynamic list object along with its associated HTML elements 
// and functions. Requires dynlist.hmtl, dynlist.css and dynlist.php files.
// 
// Future potential improvements: Add "delete dynList" functionality. Tailor "Submit messages"
// to server handling and responses.

var listCount = 0; // global variable that tracks number of dynList objects
var listIds = 0; // global variable that tracks dynList IDs

window.onload = function () {

// Create dynamic list object
var dynList = function(){
	//assign unique ID to each item (unique within the list)
	this.itemIds = 0; 

	//keeps track of number of items in list
	this.itemCount = 0;

	//gives the list a number to identify it
	this.listNum = listIds;

	// update global variables
	listCount++;
	listIds++;

	// create list-# element
	var listDiv = document.createElement('div');
	listDiv.setAttribute("id","list-" + this.listNum);
	listDiv.setAttribute("class","lists");
	document.getElementById("all-lists-container").appendChild(listDiv);

	// create list-title-# element
	var inputTitle = document.createElement('input');
	inputTitle.setAttribute("type", "text");
	inputTitle.setAttribute("id", "list-title-" + this.listNum);
	inputTitle.setAttribute("class", "listTitle");
	inputTitle.setAttribute("title", "Click to edit title");
	inputTitle.setAttribute("value","My List " + (this.listNum + 1));
	document.getElementById("list-" + this.listNum).appendChild(inputTitle);

	// create list-body-# element
	var listBody = document.createElement('ul');
	listBody.setAttribute("id","list-body-" + this.listNum);
	listBody.setAttribute("class","listBody");
	document.getElementById("list-" + this.listNum).appendChild(listBody);

	// create empty-msg-# element
	var emptyMsg = document.createElement('div');
	emptyMsg.setAttribute("id", "empty-msg-" + this.listNum);
	emptyMsg.setAttribute("class", "items emptyMessage");
	emptyMsg.innerHTML = "This list is empty. Add items to it in the text box below."
	document.getElementById("list-body-" + this.listNum).appendChild(emptyMsg);

	// create form-add-# element
	var addForm = document.createElement('form');
	addForm.setAttribute("id", "form-add-" + this.listNum);
	addForm.setAttribute("class", "addForm");
	document.getElementById("list-" + this.listNum).appendChild(addForm);

	// create additem-# element
	var inputText = document.createElement('input');
	inputText.setAttribute("id", "additem-" + this.listNum);
	inputText.setAttribute("class", "inputText");
	inputText.setAttribute("type", "text");
	document.getElementById("form-add-" + this.listNum).appendChild(inputText);

	// create add-# element
	var addButton = document.createElement('input');
	addButton.setAttribute("id", "add-" + this.listNum);
	addButton.setAttribute("class", "addButtons");
	addButton.setAttribute("type", "submit");
	addButton.setAttribute("value", "Add");
	document.getElementById("form-add-" + this.listNum).appendChild(addButton);

	// create buttons-div element (for flex layout purposes)
	var buttonsDiv = document.createElement('div');
	buttonsDiv.setAttribute("id", "buttons-div-" + this.listNum);
	buttonsDiv.setAttribute("class", "buttonsDiv");
	document.getElementById("list-" + this.listNum).appendChild(buttonsDiv);

	// create form-submit-# element
	var submitForm = document.createElement('form');
	submitForm.setAttribute("id", "form-submit-" + this.listNum);
	submitForm.setAttribute("class", "submitForm");
	submitForm.setAttribute("action", "dynList.php");
	submitForm.setAttribute("method", "POST");
	document.getElementById("buttons-div-" + this.listNum).appendChild(submitForm);

	// create submit-# element
	var submitButton = document.createElement('input');
	submitButton.setAttribute("type","submit");
	submitButton.setAttribute("id","submit-" + this.listNum);
	submitButton.setAttribute("class", "submitButtons");
	submitButton.setAttribute("name", "submit");
	submitButton.setAttribute("value","Submit");
	document.getElementById("form-submit-" + this.listNum).appendChild(submitButton);

	// Check if new list button exists; reappend to current list if so, create new one if not
	var newListButton;
	if (newListButton = document.getElementById("newListButton")) {
		document.getElementById("buttons-div-" + this.listNum).appendChild(newListButton);
		// newListButton.remove();
	}
	else {
		newListButton = document.createElement('div');
		newListButton.setAttribute("id","newListButton");
		newListButton.innerHTML = "New List +";
		document.getElementById("buttons-div-" + this.listNum).appendChild(newListButton);
	}

	document.getElementById("submit-" + this.listNum).disabled = true;
};

// Takes a string s as a parameter, and adds it to the visual list of the dynList object
dynList.prototype.add = function(s){

	// Check if submit message element exists; if so, remove it; also remove hidden form inputs
	var submitMsg;
	if (submitMsg = document.getElementById("submit-message-" + this.listNum)) {
		submitMsg.remove();

		while (document.getElementById("form-submit-" + this.listNum).getElementsByTagName('input')[1]) {
			document.getElementById("form-submit-" + this.listNum).getElementsByTagName('input')[1].remove();
		}

	}

	// Remove "empty" message if list is empty before adding this item
	if (this.itemCount == 0) {
		document.getElementById("empty-msg-" + this.listNum).remove();
	}

	var itemId = "item-" + this.listNum + "-" + this.itemIds;

	// visually add the item to the form list: create item div
	var listItem = document.createElement('div');
	listItem.setAttribute("id", itemId);
	listItem.setAttribute("class", "items");
	document.getElementById("list-body-" + this.listNum).appendChild(listItem);

	// create item text div as child of listItem
	var itemText = document.createElement('li');
	itemText.setAttribute("class", "itemText");
	itemText.innerHTML = s;
	document.getElementById(itemId).appendChild(itemText);

	// add deleteButton as child of listItem
	var itemButton = document.createElement('button');
	itemButton.setAttribute("class", "deleteButtons");
	itemButton.setAttribute("title", "Delete item");
	itemButton.innerHTML = "X";
	document.getElementById("item-" + this.listNum + "-" + this.itemIds).appendChild(itemButton);

	document.getElementById("submit-" + this.listNum).disabled = false;

	this.itemIds++;
	this.itemCount++;
};

// Takes an index i as a parameter, and deletes the list item i from 
// the visual list on the page
dynList.prototype.delete = function(i){
	// Check if submit message element exists; if so, remove it; also remove hidden form inputs
	var submitMsg;
	if (submitMsg = document.getElementById("submit-message-" + this.listNum)) {
		submitMsg.remove();

		while (document.getElementById("form-submit-" + this.listNum).getElementsByTagName('input')[1]) {
			document.getElementById("form-submit-" + this.listNum).getElementsByTagName('input')[1].remove();
		}
	}

	// remove from the visual list
	listItem = document.getElementById("item-" + this.listNum + "-" + i);
	listItem.remove();
	this.itemCount--;

	// disable submit button and add empty message if list is empty
	if (this.itemCount == 0) {
		document.getElementById("submit-" + this.listNum).disabled = true;

		var emptyMsg = document.createElement('div');
		emptyMsg.setAttribute("id", "empty-msg-" + this.listNum);
		emptyMsg.setAttribute("class", "items emptyMessage");
		emptyMsg.innerHTML = "This list is empty. Add items to it in the text box below."
		document.getElementById("list-body-" + this.listNum).appendChild(emptyMsg);
	}
};

// Take a dynList object as an argument, create hidden input fields in form-submit-# to submit 
// based on list items in list-body
dynList.prototype.submit = function(){

	var formSubmit = document.getElementById("form-submit-" + this.listNum);

	// Add list title as a hidden input field to be submitted with list form
	var submitTitle = document.createElement('input');
	submitTitle.setAttribute("id", "listtitle-" + this.listNum);
	submitTitle.setAttribute("name", "listTitle-" + this.listNum);
	submitTitle.setAttribute("type","hidden");
	var listTitle = document.getElementById("list-title-" + this.listNum).value;
	submitTitle.setAttribute("value", listTitle);
	formSubmit.appendChild(submitTitle);

	// Add the items as hidden input fields to be submitted with list form; 
	// Items submitted as an array!
	for (var i = 0; i < this.itemCount; i++) {
		var submitInput = document.createElement('input');
		submitInput.setAttribute("name", "itemsList[" + this.listNum + "][" + i + "]");
		submitInput.setAttribute("type", "hidden");
		submitInput.value = document.getElementById("list-body-" + 
			this.listNum).children[i].firstChild.innerHTML;
		formSubmit.appendChild(submitInput);
	}

	// Add message saying whether or not the list was submitted successfully 
	// Message will depend on where list is sent (a PHP file)
	// E.g. If title value is blank, then return a message of unsuccessful submit
	var submitMsg;
	if (submitMsg = document.getElementById("submit-message-" + this.listNum)) {
		submitMsg.innerHTML = "\""+listTitle + "\" was successfully submitted."; 
	}
	else {
	   	submitMsg = document.createElement('div');
		submitMsg.setAttribute("class","submitMessage");
		submitMsg.setAttribute("id","submit-message-" + this.listNum);
		submitMsg.innerHTML = "\""+listTitle + "\" was successfully submitted.";
		insertAfter(submitMsg, document.getElementById("form-submit-" + this.listNum));
		// document.getElementById("form-submit-" + this.listNum).appendChild(submitMsg);
	}
};

// Takes care of click functions
document.body.onclick = function(e){
   e = window.event? event.srcElement: e.target;

   // click on "Add" button
   if (e.className && (e.className.indexOf('addButtons') != -1)) {
   	var id = e.id;
   	var array = id.split("-");
   	var num = array[1];

   	var input = document.getElementById('additem-' + lists[num].listNum);
	if (input.value == "") return false;

   	lists[num].add(input.value)
   	input.value = '';
 
   	return false;
   }

   // click on item "Delete" buttons (appears as "X")
   if (e.className && (e.className.indexOf('deleteButtons') != -1)) {
   	var id = e.parentNode.id;
   	var array = id.split("-");
   	var num = array[1];
   	var index = array[2];

   	lists[num].delete(index);
   }

	// click on "Submit" button
   if (e.className && (e.className.indexOf('submitButtons') != -1)) {
   	var id = e.id;
   	var array = id.split("-");
   	var num = array[1];

   	lists[num].submit();

   	return false;
   }

   // click on "New list" button (appears as "+")
   if (e.id && (e.id == "newListButton")) {
   		lists.push(new dynList());
   		listCount++;
   }
};

// helper function to insert a new element node after a reference node
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Upon window loading, the following will execute, creating one empty dynList object
var lists = [];
lists[0] = new dynList();

}