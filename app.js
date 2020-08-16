

firebase.database().ref('person').on('child_added', function (data) {
    var list = document.createElement("li");
    var text = document.createTextNode(data.val().works);
    list.appendChild(text);
    mdiv.appendChild(list)
    // Delete btn
    var btn = document.createElement("button")
    var t = document.createTextNode("Delete")
    btn.setAttribute("id", data.val().key)
    btn.setAttribute("onclick", "deleteitem(this)")
    btn.appendChild(t)
    list.appendChild(btn)

    //edit btn
    var btns = document.createElement("button")
    var E = document.createTextNode("Edit")
    btns.setAttribute("id", data.val().key)
    btns.setAttribute("onclick", "edit(this)")
    btns.appendChild(E)
    list.appendChild(btns)
})
function next() {
    location.href = "NEXT.HTML";
}

var mdiv = document.getElementsByClassName("list")[0];
// console.log(mdiv)
function Add() {
    var todoWork = document.getElementById("todoWork")
    // var Value = todoWork.value

    var keys = firebase.database().ref('person').push().key
    var work = {
        works: todoWork.value,
        key: keys
    }

    firebase.database().ref('person').child(keys).set(work)
    todoWork.value = ""
}
function firebaseDataRemove() {
    mdiv.remove();
    firebase.database().ref('person').remove()

}
function deleteitem(e) {
    e.parentNode.remove();
    firebase.database().ref('person').child(e.id).remove();

};
function edit(e) {
    var val = prompt("Edit here", e.parentNode.firstChild.nodeValue)
    var edit = {
        works: val,
        key: e.id
    }
    firebase.database().ref('person').child(e.id).set(edit)
    e.parentNode.firstChild.nodeValue = val;



}
