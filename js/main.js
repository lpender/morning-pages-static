/* Google SignIn */
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();

  document.body.classList.add("signed-in")

  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

/* Monitor */

var activeTimeout;

document.onmousemove = function () {
  document.body.classList.add("screen-active");

  clearTimeout(activeTimeout)

  activeTimeout = setTimeout(function () {
    document.body.classList.remove("screen-active");
  }, 3000);
}

/* Keyboard stuff */

let hasPressedAnyKey = false;
let hasJustPressedHelp = false;
let showHelp = true

let textarea = document.getElementById("write");
let cachedText = ""

let prompts = [
  'Just write.',
  'Write down what you observe around you.',
  'Is life fun or scary? Are people good or bad?',
  'Stream of consciousness. Go.'
]

textarea.focus()

textarea.addEventListener("keydown", function(event) {
  console.log(event.key)
  let keyGetHelp = (event.key === "?")
  let keyLog = (event.key === "l" && event.altKey)
  let keyToggleOff = (event.key === "s" && event.ctrlKey)
  let keyPrompt = (event.key === "p" && event.ctrlKey)

  if (hasJustPressedHelp) {
    hasJustPressedHelp = false

    return textarea.value = cachedText;
  }

  if (keyToggleOff) {
    if (showHelp) {
      showHelp = false
    } else {
      showHelp = true
    }

    event.preventDefault()
  }

  if (keyGetHelp && showHelp) {
    return
    // show help
    hasJustPressedHelp = true
    cachedText = textarea.value + "?";
    let result = cachedText;

    result += "\n\n"
    // result += "hit cmd-s to save\n"
    result += "to silence this, ctrl-s\n\n"
    result += "ctrl-p for a prompt\n"
    result += "ctrl-l to log this entry\n"
    result += "ctrl-b for bird sounds\n"
    result += "or just keep typing..."

    textarea.value = result;

    event.preventDefault()
  }

  if (keyLog) {
    let result = textarea.value;

    result += "\n\n"
    result += "first word:\n"
    result += "last word:\n"
    result += "password:\n\n"
    result += "anyone with these credentials will be able to view your log "
      + "which will be saved forever on the blockchain.\n"


    textarea.value = result;

    event.preventDefault()
  }

  if (keyPrompt) {
    let result = textarea.value;

    let prompt = prompts[Math.floor(Math.random()*prompts.length)]

    result += prompt + "\n\n"

    textarea.value = result

    event.preventDefault()
  }

  if (hasPressedAnyKey === false) {
    // clear the junk
    hasPressedAnyKey = true;

    const el = document.documentElement,
      rfs = el.requestFullScreen
      || el.webkitRequestFullScreen
      || el.mozRequestFullScreen;

    rfs.call(el);

    textarea.value = "";
  }
});
