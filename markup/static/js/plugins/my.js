
const btnShowSelector = document.querySelector(".js-show-menu");

function showMenuMob() {
    
    const mobDropMenu = document.querySelector(".js-mob-drop-menu");
    btnShowSelector.classList.toggle('active');
    mobDropMenu.classList.toggle('active');
}
btnShowSelector.addEventListener("click", showMenuMob )




//slider 

let slider = tns({
    container: '.js_slider', 
    items: 3, 
    slideBy: 1,  
    loop:false,
    controls:true,
    mouseDrag:true,
    gutter: 24, 
    nav: false,
    speed: 400,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    autoplayButtonOutput:false,
    responsive: {
        200: {
          gutter: 24,
          items: 1,
          controls:true,
          nav:false
        },
        768: { 
          gutter: 24,
          items: 2
        },
        1025: {
          gutter: 24,
          controls:true,
          items: 3,
          nav:true,
          nav: false,
        }
      }
  }); 


// form
(function() {

    // These are the constraints used to validate the form
    var constraints = {
        email: {
        // Email is required
        presence: { message: "^Обязательное поле" }, 
        // and must be an email (duh)
        email: true,
        
        length: {
            minimum: 4,
            maximum: 50,
            message: "Мин. 4 и Макс. 20 символов",
        },
  
      },

      name: {
        // You need to pick a username too
        presence: { message: "^Обязательное поле" },
        // And it must be between 3 and 20 characters long
        length: {
          minimum: 6,
          maximum: 20,
          message: "Мин. 6 и Макс. 20 символов",
          
        },
        format: {
          // We don't allow anything that a-z and 0-9
          pattern: "[а-я0-9]+",
          // but we don't care if the username is uppercase or lowercase
          flags: "i",
          message: "Может содержать только а-я и 0-9",
          
        }
      }

    };

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form.js_form");
    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      handleFormSubmit(form);
    });

    // Hook up the inputs to validate on the fly
    var inputs = document.querySelectorAll("input, textarea, select")
    for (var i = 0; i < inputs.length; ++i) {
      inputs.item(i).addEventListener("change", function(ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name])
      });
    }

    function handleFormSubmit(form, input) {
      // validate the form against the constraints
      var errors = validate(form, constraints);
      // then we update the form to reflect the results
      showErrors(form, errors || {});
      if (!errors) {
        showSuccess();
      }
    }

    // Updates the inputs with the validation errors
    function showErrors(form, errors) {
      // We loop through all the inputs and show the errors for that input
      _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
        // Since the errors can be null if no errors were found we need to handle
        // that
        showErrorsForInput(input, errors && errors[input.name]);
      });
    }

    // Shows the errors for a specific input  
    function showErrorsForInput(input, errors) {
      // This is the root of the input
      var formGroup = closestParent(input.parentNode, "form-group")
        // Find where the error messages will be insert into
        , messages = formGroup.querySelector(".messages");
      // First we remove any old messages and resets the classes
      resetFormGroup(formGroup);
      // If we have errors   
      if (errors) {
        // we first mark the group has having errors
        formGroup.classList.add("has-error");
        // then we append all the errors
        _.each(errors, function(error) {
          addError(messages, error);
        });
      } else {
        // otherwise we simply mark it as success
        formGroup.classList.add("has-success");
      }
    }

    // Recusively finds the closest parent that has the specified class
    function closestParent(child, className) {
      if (!child || child == document) {
        return null;
      }
      if (child.classList.contains(className)) {
        return child;
      } else {
        return closestParent(child.parentNode, className);
      }
    }

    function resetFormGroup(formGroup) {
      // Remove the success and error classes
      formGroup.classList.remove("has-error");
      formGroup.classList.remove("has-success");
      // and remove any old messages
      _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
        el.parentNode.removeChild(el);
      });
    }

    // Adds the specified error with the following markup
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
      var block = document.createElement("p");
      block.classList.add("help-block");
      block.classList.add("error");
      block.innerText = error;
      messages.appendChild(block);
    }

    function showSuccess() {  
      // We made it \:D/
       const form_inner = document.querySelector(".js-form-success");
       form_inner.innerHTML = "Ура! Данные успешно отправлены, мы с вами скоро свяжемся.."
    }
  })();


  

