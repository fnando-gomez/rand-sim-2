const renderer = new Renderer()

LOGIN_TEMPLATE = "login-template"
LOGIN_AREA = "login-area"

MESSAGES_TEMPLATE = "messages-template"
MESSAGE_AREA = "messages-area"

const render = (templateID, data, destination) => renderer.render(templateID, data, destination)

const logIn = function () {
    const username = $("#username").val()
    const password = $("#password").val()


    $.post('/login', { username, password }, function (u) {
        user = new User(username)
        if(!u){
            alert("Incorrect password")
        }
        else{
        render(LOGIN_TEMPLATE, { isLoggedIn: true, username }, LOGIN_AREA)

        render(MESSAGES_TEMPLATE, { messages: u.messages }, MESSAGE_AREA)
        }
    })
}

const logOut = function () {
    user = undefined
    render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
    renderer.clear()
}


const sendMessage = function () {
    const completeRequest = user.sendMessage($("#new-message").val(), $("#to").val())
    completeRequest.then(function () {
        render(MESSAGES_TEMPLATE, { messages: user.messages }, MESSAGE_AREA)
    })
}

render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)