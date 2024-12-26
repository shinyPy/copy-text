document.getElementById('copyButton').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: extractAndCopyChineseText,
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Chinese text copied to clipboard!';
    status.style.color = 'green';
    status.style.display = 'block';

    // Hide the status message after 3 seconds
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  });
});

function extractAndCopyChineseText() {
  const paragraphs = document.querySelectorAll('p.chapter');
  const chineseRegex = /[\u4e00-\u9fa5]+/g;

  const chineseTexts = Array.from(paragraphs)
    .map(p => {
      const matches = p.textContent.match(chineseRegex);
      return matches ? matches.join('') : '';
    })
    .filter(text => text.trim() !== '');

  const combinedText = chineseTexts.join('\n');
  navigator.clipboard.writeText(combinedText)
    .catch(err => console.error('Failed to copy text: ', err));
}
