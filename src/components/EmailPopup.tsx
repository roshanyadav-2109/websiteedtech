
import React, { useEffect } from "react";

const EmailPopup = () => {
  useEffect(() => {
    const emailIcon = document.getElementById('email-icon');
    const description = document.getElementById('description');
    const popupForm = document.getElementById('popup-form');
    const closeButton = document.getElementById('close-btn');
    const emailForm = document.getElementById('email-form');
    const confirmation = document.getElementById('confirmation');

    if (emailIcon && description && popupForm && closeButton && emailForm && confirmation) {
      // Toggle pop-up form
      emailIcon.addEventListener('click', function () {
        if (popupForm.style.display === 'block') {
          popupForm.style.display = 'none';
          description.style.display = 'block';
        } else {
          popupForm.style.display = 'block';
          description.style.display = 'none';
        }
      });

      // Close pop-up form
      closeButton.addEventListener('click', function () {
        popupForm.style.display = 'none';
        description.style.display = 'block';
      });

      // Handle form submission
      emailForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(emailForm as HTMLFormElement);
        fetch(emailForm.getAttribute('action') as string, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }).then(() => {
          confirmation.style.display = 'block';
          emailForm.reset();
          setTimeout(() => {
            confirmation.style.display = 'none';
            popupForm.style.display = 'none';
            description.style.display = 'block';
          }, 3000);
        }).catch(() => {
          alert('There was an error submitting the form. Please try again.');
        });
      });
    }

    return () => {
      // Clean up event listeners on component unmount
      if (emailIcon) {
        emailIcon.removeEventListener('click', () => {});
      }
      if (closeButton) {
        closeButton.removeEventListener('click', () => {});
      }
      if (emailForm) {
        emailForm.removeEventListener('submit', () => {});
      }
    };
  }, []);

  return (
    <div id="popup-container">
      <div id="description">Have queries? Raise a ticket!</div>
      <div id="email-icon">✉️</div>
      <div id="popup-form">
        <button id="close-btn">X</button>
        <form id="email-form" action="https://docs.google.com/forms/d/e/1FAIpQLSeNapdlla2DdYy2NDKyb3IPUg6IozjE-5JKzYbkxkpXBQKxhg/formResponse" method="POST" target="hidden_iframe">
          <input type="email" name="entry.196709427" placeholder="Your Email" required />
          <input type="text" name="entry.1350931538" placeholder="Subject" required />
          <textarea name="entry.267493428" placeholder="Your Message" rows={4} required></textarea>
          <button type="submit">Submit</button>
        </form>
        <div id="confirmation">Thank you! Your message has been sent.</div>
        <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
      </div>
    </div>
  );
};

export default EmailPopup;
