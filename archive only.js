// content.js
const button = document.createElement('button');
button.textContent = 'Copy Chinese Text';
button.style.position = 'fixed';
button.style.top = '10px';
button.style.left = '10px';
button.style.zIndex = 1000;

// Add the button to the page
document.body.appendChild(button);

// Add a click event listener to copy the text
button.addEventListener('click', () => {
    // Select all <p> elements
    const paragraphs = document.querySelectorAll('p');

    // Regular expression to match Chinese characters
    const chineseRegex = /[\u4e00-\u9fa5]+/g;

    // Extract Chinese text from each paragraph
    const chineseTexts = Array.from(paragraphs)
        .map(p => {
            const matches = p.textContent.match(chineseRegex);
            return matches ? matches.join('') : '';
        })
        .filter(text => text.trim() !== ''); // Remove empty strings

    // Combine the text contents into a single string
    const combinedText = chineseTexts.join('\n');

    // Copy the combined text to the clipboard
    navigator.clipboard.writeText(combinedText)
        .then(() => {
            alert('Chinese text copied to clipboard!');
            button.remove(); // Remove the button after copying
        })
        .catch(err => console.error('Failed to copy text: ', err));
});
