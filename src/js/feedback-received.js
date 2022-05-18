const ratingSection = globalThis.document.querySelector('.rating-section');
const showFeedbackReceivedMessageYes =
    globalThis.document.querySelector('.rating-btn.yes');
const showFeedbackReceivedMessageNo =
    globalThis.document.querySelector('.rating-btn.no');
const FeedbackReceivedMessage = globalThis.document.querySelector(
    '.feedback-received-message'
);

showFeedbackReceivedMessageYes.addEventListener(
    'click',
    showFeedbackMessageYes
);
function showFeedbackMessageYes() {
    $('.rating-section').toggle('hidden');
    $('.feedback-received-message').toggle('hidden');

    // ratingSection.classList.add('hidden');
    // FeedbackReceivedMessage.add('hidden');
}

showFeedbackReceivedMessageNo.addEventListener('click', showFeedbackMessageNo);
function showFeedbackMessageNo() {
    $('.rating-section').toggle('hidden');
    $('.feedback-received-message').toggle('hidden');
    // ratingSection.classList.add('hidden');
    // FeedbackReceivedMessage.classList.toggle('hidden');
}
