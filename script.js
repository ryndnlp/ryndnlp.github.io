const words = [document.getElementById('type-animation').innerHTML];
let i = 0;
let timer;

function typingEffect() {
    document.getElementById('type-animation').innerHTML = '';
	let word = words[i].split("");
	var loopTyping = function() {
		if (word.length > 0) {
			document.getElementById('type-animation').innerHTML += word.shift();
		} else {
            blinkingEffect(230);
            setTimeout(deletingEffect, 2000);
            setTimeout(stopBlinkingEffect, 2000);
			return;
		};
		timer = setTimeout(loopTyping, 100);
	};
	loopTyping();
};

function deletingEffect() {
	let word = words[i].split("");
	var loopDeleting = function() {
		if (word.length > 0) {
			word.pop();
			document.getElementById('type-animation').innerHTML = word.join("");
		} else {
			if (words.length > (i + 1)) {
				i++;
			} else {
				i = 0;
			};
			typingEffect();
			return;
		};
		timer = setTimeout(loopDeleting, 50);
	};
	loopDeleting();
};

var blink;
var cursor;

function blinkingEffect(speed){
    blink = setInterval(() => {
        if(cursor) {
          document.getElementById('cursor').style.opacity = 0;
          cursor = false;
        }else {
          document.getElementById('cursor').style.opacity = 1;
          cursor = true;
        }
    }, speed);
}

function stopBlinkingEffect() {
    if(!cursor) {
        document.getElementById('cursor').style.opacity = 1;
      }
    clearInterval(blink);
}


typingEffect();
