const newsletterForm = globalThis.document.querySelector('#newsletter-form');
const input = globalThis.document.querySelector('#newsletter-input');
/* Intercept submit event and handle posting of form value via Fetch API rather than
relying on the browser's document HTTP API.
*/
const signupPrompt = globalThis.document.querySelector('.signup-prompt');
const afterSubmit = globalThis.document.querySelector('.after-submit');
const newsletterSubmitContainer = globalThis.document.querySelector(
    '.newsletter-submit-container'
);

// mark.wentowski@techwritex.com
newsletterForm.addEventListener('submit', function (submitEvent) {
    submitEvent.preventDefault();
    globalThis.fetch(
        'https://tq2kej6n0b.execute-api.us-east-2.amazonaws.com/default/create-newsletter-subscription',
        {
            body: input.value,
            method: 'POST',
        }
    );
    signupPrompt.classList.toggle('hidden');
    afterSubmit.classList.toggle('hidden');
    newsletterSubmitContainer.classList.toggle('hidden');
});
