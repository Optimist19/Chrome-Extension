let listOfItems = []
let input = document.getElementById("input")
let inputBtn = document.getElementById("input-btn")
let ul = document.getElementById("ul")
let delBtn = document.getElementById("delete")
let tabBtn = document.getElementById("tab-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("listOfItems"))
console.log(leadsFromLocalStorage)




if(leadsFromLocalStorage){
	listOfItems = leadsFromLocalStorage
	display()
	
}

delBtn.addEventListener("click", function(){
	console.log("i am clicked")
	localStorage.clear()
	listOfItems = []
	display()
})

// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]

tabBtn.addEventListener("click", function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log("the event worked")
		listOfItems.push(tabs[0].url)
		localStorage.setItem("listOfItems", JSON.stringify(listOfItems))
		display()
	})
})

// The tabBtn only works when you install the extension,which helps us to get/grab the  present url or current tab in the window(browser). multiple windows can be open with chrome,so tabBtn helps to get the current/active url of the tab opened.

inputBtn.addEventListener("click", function(){
	listOfItems.push(input.value)
	// let items = input.value
	// p.textContent += items
	console.log(listOfItems)
	input.value = " "
	localStorage.setItem("listOfItems", JSON.stringify(listOfItems))
	console.log(localStorage.getItem("listOfItems"))
	display()
})


function display(){
	let letters = ""
	for(let i = 0; i < listOfItems.length; i++){
	letters += `
		<li>
			<a href="${listOfItems[i]}" target="_blank"> ${listOfItems[i]} </a>
		</li>`
		// console.log(`${letters}`)
	}
	ul.innerHTML = letters
}
