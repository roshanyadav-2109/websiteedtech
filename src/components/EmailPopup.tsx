
import React, { useEffect } from "react";

const EmailPopup = () => {
  useEffect(() => {
    const emailIcon = document.getElementById('email-icon');
    const description = document.getElementById('description');
    const popupForm = document.getElementById('popup-form');
    const closeButton = document.getElementById('close-btn');
    const emailForm = document.getElementById('email-form') as HTMLFormElement;
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
        const formData = new FormData(emailForm);
        fetch(emailForm.getAttribute('action') as string, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }).then(() => {
          if (confirmation) {
            confirmation.style.display = 'block';
            emailForm.reset();
            setTimeout(() => {
              if (confirmation && popupForm && description) {
                confirmation.style.display = 'none';
                popupForm.style.display = 'none';
                description.style.display = 'block';
              }
            }, 3000);
          }
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
    <div id="popup-container" className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div id="description" className="bg-golden text-black py-2 px-4 rounded-lg shadow-lg text-sm animate-fade-in">
        Have queries? Raise a ticket!
      </div>
      <div id="email-icon" className="bg-royal text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-royal-dark transition-colors">
        ✉️
      </div>
      <div id="popup-form" className="hidden bg-white p-5 rounded-lg shadow-lg w-full max-w-sm">
        <button id="close-btn" className="bg-red-500 text-white border-none px-2 py-1 cursor-pointer float-right rounded-md hover:bg-red-600 transition-colors">
          X
        </button>
        <form id="email-form" className="space-y-4 mt-10" action="https://docs.google.com/forms/d/e/1FAIpQLSeNapdlla2DdYy2NDKyb3IPUg6IozjE-5JKzYbkxkpXBQKxhg/formResponse" method="POST" target="hidden_iframe">
          <input type="email" name="entry.196709427" placeholder="Your Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal" />
          <input type="text" name="entry.1350931538" placeholder="Subject" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal" />
          <textarea name="entry.267493428" placeholder="Your Message" rows={4} required className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-royal"></textarea>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Submit
          </button>
        </form>
        <div id="confirmation" className="hidden bg-green-100 text-green-800 p-3 rounded-lg mt-4 text-center">
          Thank you! Your message has been sent.
        </div>
        <iframe name="hidden_iframe" className="hidden"></iframe>
      </div>
    </div>
  );
};

export default EmailPopup;
