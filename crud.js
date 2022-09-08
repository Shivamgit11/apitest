function SavetoCrud(event){
    e.preventDefault();
    const amount = event.target.amount.value;
    const discripton = event.target.description.value;
    const category = event.target.category.value;

    const obj = {
        amount,
        discripton,
        category
    }

    axios.post("https://crudcrud.com/api/fccd94a33a6d4381ba3e81ed7fa8ee2b/Expense", obj)
    .then((response) => {
        showNewUserOnScreen(response.data);
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/fccd94a33a6d4381ba3e81ed7fa8ee2b/Expense")
    .then((response) => {
        console.log(response)
        for(var i =0; i< response.data.length; i++){
            shownewUserOnScreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
    
})

function showNewUserOnScreen(user) {

    
    const parentNode = document.getElementById('listofusers');

    const childHtml = `<li id=${user._id}>${user.amount} -- ${user.expense} -- ${user._id}
                                <button onclick=deleteuser('${user._id}')> DeleteUser </button>
                                <button onclick=editUserDetails('${user.amount}','${user.expense}','${user.category}','${user._id}')>Edit User</button>
                            </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHtml;
}

//Edit User
function editUserDetails(amount, expense, category, userId) {
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = description;
    document.getElementById('category').value = category;

    
    deleteuser(userId);

}

function deleteuser(userId){
    axios.delete(`https://crudcrud.com/api/fccd94a33a6d4381ba3e81ed7fa8ee2b/Expense/${userId}`)
    .then((response) => {
        removeUserFromScreen(userId);  
    })
    .catch((err) => {
        console.log(err)
    })
    
}

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listofusers');
    const childNodetoBeDeleted = document.getElementById(userId);

    parentNode.removeChild(childNodetoBeDeleted);
    
}
