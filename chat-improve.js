// chatArea is the variable that stores the place on the screen the chats will appear.
var chatArea = document.querySelector('#chatBox');
var composer = document.querySelector('#compose-area');
var compose_area = document.querySelector('.text-input');
var wait;

// count is a variable that stores how many total chats have been sent.
var count = 0;

// nextMessage is an object variable that stores the next message that will be sent and who will be sending it.
var nextMessage = {
    message: "",
    sender: ""
};

var botSilent = false;

var enterListener = window;
var sendListener = document.querySelector('#sendButton')

var suggestions = ['Appointment with SHS/SCS', 'Options of therapy', 'How much does a visit cost?', 'Type my own question'];
var oEvent = { //oEvent是自己定义的Object对象，格式是json对象
    defaultEvent: function (text) {
        nextMessage.sender = 'bot';
        nextMessage.message = text;
        send(nextMessage.sender, nextMessage.message).then(() => {
            helpPrompt();
        })
    },
    event_0: function () {
        nextMessage.sender = 'bot';
        nextMessage.message = appointment;
        send(nextMessage.sender, nextMessage.message).then(() => {
            helpPrompt();
        })
    },
    event_1: function () {
        nextMessage.sender = 'bot';
        nextMessage.message = therapy;
        send(nextMessage.sender, nextMessage.message).then(() => {
            helpPrompt();
        })
    },
    event_2: function () {
        nextMessage.sender = 'bot';
        nextMessage.message = cost;
        send(nextMessage.sender, nextMessage.message).then(() => {
            helpPrompt();
        })
    },
    event_3: function () {
        nextMessage.sender = 'bot';
        nextMessage.message = 'What would you like to know?';
        send(nextMessage.sender, nextMessage.message);
    }
};


// send is the function that sends the next message stored in nextMessage object.
function send(sender, message) {
    return new Promise((resolve, reject) => {
        if (sender == "bot" && count != 0 && count != 1) {
            wait = 2000;
        } else {
            wait = 0;
        };
        // 在setTimeout外面就提前定好count的值免的count的值在setTimeout等待时乱变
        var idStr = 'chat-' + count;
        count += 1;
        chatBox.insertAdjacentHTML("beforeend", "<div id='" + idStr + "' class='chat-container'> <div class='chat-" + sender + "'><div class='blink'>" + "..." + "</div><div class='avatar avatar-" + sender + "'></div></div></div>");
        //这个scroll是为了在setTimeout之前先scroll下去而不是等待setTimeout之后才scroll
        scrollBottom();
        setTimeout(function () {
            var currentChat = document.querySelector('#' + idStr);
            currentChat.innerHTML = "<div class='chat-" + sender + "'>" + message + "<div class='avatar avatar-" + sender + "'></div></div>";
            //这个scroll是为了在每次bot回复完最后一条消息后能使prompt和suggestion显示出来
            scrollBottom();
            resolve();
        }, wait)
    });
}

function initiateDialogue() {
    listenFor();
    nextMessage.sender = 'bot';
    if (count ==0){
        nextMessage.message = 'Hi! Thank you for visiting the Wellness Center website :) What can I help you with today? ';
        send(nextMessage.sender, nextMessage.message).then(() => {
            nextMessage.message = "If a situation seems life-threatening, or if you need immediate treatment of very serious or critical conditions, go to the nearest emergency room or call 911. <br>For more information on emergency help, see here: <a href='https://wellness.uchicago.edu/get-help-now/' target='_blank'>https://wellness.uchicago.edu/get-help-now/</a>";
            send(nextMessage.sender, nextMessage.message).then(() => {
              appendPrompts();
            });
        });
    }else{
        nextMessage.message = 'What else can I help you with?';
        send(nextMessage.sender, nextMessage.message).then(() => {
            appendPrompts();
        });
    }

}

function appendPrompts(){
    var suggestionDiv = $('<div class="suggestions" />');
    $('#chatBox').append(suggestionDiv);

    for (var i = 0; i < suggestions.length; i++) {

        $('<div class="suggestion" id="' + i + '" ><div class="avatar avatar-prompts"></div>' + suggestions[i] + '</div>').on('click', function () {

            compose_area.focus();

            //oEvent['event_' + $(this).attr('id')] || oEvent['defaultEvent']
            // 这个写法就是说如果oEvent['event_' + $(this).attr('id')]不存在就拿后面的值赋给eventFn
            var eventFn = oEvent['event_' + $(this).attr('id')];
            //给网页传递你点击的文本信息和点击的这个html元素对象，this代表用户点击的那个html元素
            eventFn($(this).text(), $(this));

        }).appendTo(suggestionDiv); //这里也是appendTo当前的suggestionDiv实例上面
    };
}

function update() {
    var promptDiv = $('<div class="prompts" />');

    nextMessage.sender = 'bot';

    nextMessage.message = "Can I help you with anything else?";
    send(nextMessage.sender, nextMessage.message).then(() => {
        $('#chatBox').append(promptDiv);
    });

    $('<div id="inChat"><div class="avatar avatar-prompts"></div>Yes</div>').on('click', function () {

        compose_area.focus();
        initiateDialogue();
    }).appendTo($(promptDiv));

    $('<div id="inChat"><div class="avatar avatar-prompts"></div>No</div>').on('click', function () {

        compose_area.focus();
        botSilent = true;
        nextMessage.sender = 'bot';
        nextMessage.message = 'Thank you for chatting! I hope you found what you are looking for :)';
        send(nextMessage.sender, nextMessage.message);
    }).appendTo($(promptDiv));

    listenFor();
}

function noHelp() {
    nextMessage.sender = 'bot';
    nextMessage.message = "Sorry that I couldn't be of more help! Here are some contact information of some people who might be able help: ";
    send(nextMessage.sender, nextMessage.message).then(() => {
        nextMessage.message = "Student insurance: Call 773.834.4543 (press option #2) to reach Student Insurance staff. They are available to assist students with questions about the University Health Insurance Plan (U-SHIP).";
        send(nextMessage.sender, nextMessage.message).then(() => {
            nextMessage.message = "Student health: Call 773.702.4156 (available 24/7) to talk with an experienced registered nurse.";
            send(nextMessage.sender, nextMessage.message).then(() => {
                nextMessage.message = "Student counseling: during office hours - call the front desk at 773.702.9800, or walk into Student Counseling Service (SCS) at 5555 South Woodlawn Avenue. After hour - The Therapist-on-Call can be reached at 773.702.3625. ";
                send(nextMessage.sender, nextMessage.message).then(() => {
                    update();
                })
            })
        })
    })
}

function helpPrompt() {
    var promptDiv = $('<div class="prompts" />');

    nextMessage.sender = 'bot';
    nextMessage.message = "Was the information helpful?";
    send(nextMessage.sender, nextMessage.message).then(() => {
        $('#chatBox').append(promptDiv);
    });

    $('<div id="helpful"><div class="avatar avatar-prompts"></div>Yes</div>').on('click', function () {

        compose_area.focus();
        update();
    }).appendTo($(promptDiv));

    $('<div id="helpful"><div class="avatar avatar-prompts"></div>No</div>').on('click', function () {

        compose_area.focus();
        noHelp();
    }).appendTo($(promptDiv));
}

function listen(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        if (!e.shiftKey) {
            pauseListening();
            lookForChat();
        }
    }
    if (e.type == "click") {
        pauseListening();
        lookForChat();
    }
}

function listenFor() {
    enterListener.addEventListener("keydown", listen);
    sendListener.addEventListener("click", listen);
}

// To avoid double submitting on enter key if someone clicks the button we have to
//  stop listening for enter until the robot sends a question.
function pauseListening() {
    enterListener.removeEventListener("keydown", listen);
    sendListener.removeEventListener("click", listen);
}

function userChat() {

    // Set the user as the sender of the next message.
    nextMessage.sender = "user";

    // Get the user's input in the compose_area and clear the compose_area.
    nextMessage.message = compose_area.value;

    // Send user's message.
    send(nextMessage.sender, nextMessage.message);

    lookForChat();
    compose_area.value = "";
}

function botChat() {
    var isMatch = false;
    nextMessage.sender = 'bot';
    //把所有的句号.  替换成空'',  再加上一个空格 
    var userInput = compose_area.value.replace(/\./g, '').toLowerCase() + ' ';

    // We can test if the user's message matches any of the prompts using if statements.
    for (var i = 0; i < keys.length; i++) {
        var keyArr = keys[i].split(', ');
        for (var j in keyArr) {
            if (userInput.indexOf(keyArr[j].toLowerCase() + ' ') > -1) {
                // 匹配
                isMatch = true;
                break;
            }
        }
        if (isMatch && (i == 7 || i == 8)) {

            nextMessage.message = genericResponse + responses[i];
            send(nextMessage.sender, nextMessage.message).then(() => {
                nextMessage.message = appointment;
                send(nextMessage.sender, nextMessage.message).then(() => {
                    helpPrompt();
                    listenFor();
                });
            });
            break;
        } else if (isMatch) {
            // 匹配,展示 key 对应的 response
            nextMessage.message = genericResponse + responses[i];
            send(nextMessage.sender, nextMessage.message).then(() => {
                helpPrompt();
                listenFor();
            });
            break;
        }
    }

    if (isMatch === false) {
        noHelp();
    }

}

function lookForChat() {

    // check who sent the last chat
    last = nextMessage.sender;

    if (last == "bot") {
        // if the bot chatted last wait for the user to send a chat
        userChat();

    } else {
        // Send the cursor to the compose text area.
        compose_area.focus();

        // If botSilent is true the bot is done chatting
        // Set nextMessage.sender to "bot" to make the user chat next
        // Run listenFor() to wait for the user to chat.
        if (botSilent) {
            $(".text-input").prop('disabled', true);
            nextMessage.sender = "bot";
            nextMessage.message = "";
            listenFor();

        } else {

            botChat();
        }
    }
}

function scrollBottom() {
    // chatBox 里面最后一个元素
    var lastDiv = $('#chatBox').children(':last').find('div:last');
    // 要滚动的高度 = 最后一个元素到顶部的高度 + chatBox被滚去的顶部高度
    var h = lastDiv.offset().top + $('#chatBox').scrollTop()
    $('#chatBox').animate({ scrollTop: h }, 400);
}

initiateDialogue();