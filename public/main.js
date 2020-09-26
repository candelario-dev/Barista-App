var checkOrder = document.getElementsByClassName("fa-check");
var orderComplete = document.getElementsByClassName("fa-trash");

Array.from(checkOrder).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const order = this.parentNode.parentNode.childNodes[3].innerText
        const spokenMsg = name + ", your order is ready"
        const msg = new SpeechSynthesisUtterance(spokenMsg) //Firefox has issues with uttering the entire sentence
        window.speechSynthesis.speak(msg)
        fetch('orders', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'order': order,
            'complete': "yes"
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(orderComplete).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const order = this.parentNode.parentNode.childNodes[3].innerText
        const side = this.parentNode.parentNode.classList.value
        fetch('orders', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'name': name,
              'order': order,
              'complete': side === "orderCurr" ? "no" : "yes"
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
