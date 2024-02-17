var app = new Vue({
  el: '#app',
  data: {
    form: {
      lastname: '',
      firstname:'',
      email: '',
      country: '',
      subject: '',
      message:'',
      acceptedConditions: false,
    },
      isOpen: false,
  },
  computed: {
    lastnameIsValid() {
      let nameRegex = /^[a-z ,.'-]+$/i;
      return nameRegex.test(this.form.lastname);
    },
    firstnameIsValid() {
      let nameRegex = /^[a-z ,.'-]+$/i;
      return nameRegex.test(this.form.firstname);
      },
    emailIsValid() {
      let emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      return emailRegex.test(this.form.email);
    },
    countryIsValid() {
      return this.form.country.trim() !== '';
    },
    subjectIsValid() {
        return this.form.subject !== '';
      },
    messageIsValid() {
        const messageLength = this.form.message.trim().length;
        return messageLength >= 50 && messageLength <= 300;
      },
    checkboxIsValid() {
      return this.form.acceptedConditions === true;
    },
    formIsValid() {
      return ( this.lastnameIsValid && this.firstnameIsValid && this.emailIsValid && this.countryIsValid && this.messageIsValid && this.checkboxIsValid && this.subjectIsValid );
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    }
  },
  isFormValid() {
    return (
        this.form.lastname !== '' &&
        this.form.firstname !== '' &&
        this.form.email !== '' &&
        this.form.country !== '' &&
        this.form.subject !== '' &&
        this.form.message !== '' &&
        this.form.acceptedConditions
        )
}});

//Code to enable submit button only when all fields are filled

(function() {
  $('form > input').keyup(function() {

      var empty = false;
      $('form > input').each(function() {
          if ($(this).val() == '') {
              empty = true;
          }
      });

      if (empty) {
          $('#submit').attr('disabled', 'disabled'); 
          $('#submit').removeAttr('disabled');
      }
  });
})()
