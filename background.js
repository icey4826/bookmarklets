chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: command === "execute_bookmarklet_s" ? bookmarkletS :
        command === "execute_bookmarklet_c" ? bookmarkletC :
          bookmarkletE
    });
  });
});

function bookmarkletS() {
  javascript: (function () { var statuses = ['ERP - Available', 'Available for Voice', 'Break', 'Meeting', 'Lunch', 'Personal Time', 'Backing Off', 'ERP - Backlog']; var statusChoices = statuses.map(function (status, index) { return (index + 1) + '. ' + status; }).join('\n'); var selectedStatusIndex = prompt("Select a status by entering the number:\n" + statusChoices); if (selectedStatusIndex && statuses[parseInt(selectedStatusIndex) - 1]) { var selectedStatus = statuses[parseInt(selectedStatusIndex) - 1]; var delayInMinutes = prompt("Enter the delay time in minutes:"); if (delayInMinutes) { var delayInMilliseconds = delayInMinutes * 60 * 1000; document.title = 'Waiting ' + delayInMinutes + ' minute(s) to change status to ' + selectedStatus + '...'; setTimeout(function () { var statusChanged = false; var statusElements = document.querySelectorAll('.slds-truncate'); statusElements.forEach(function (element) { if (element.textContent.trim() === selectedStatus) { element.closest('a').click(); statusChanged = true; } }); if (statusChanged) { var omniChannelElements = document.querySelectorAll('span.itemTitle.slds-truncate'); omniChannelElements.forEach(function (element) { if (element.textContent.includes('Omni-Channel')) { element.textContent = 'Omni-Channel (' + selectedStatus + ')'; } }); document.title = 'Status Changed to ' + selectedStatus; } else { document.title = 'Status Change Failed'; } }, delayInMilliseconds); } else { alert('No delay time entered. Process cancelled.'); } } else { alert('Invalid selection or process cancelled.'); } })();
}

function bookmarkletC() {
  javascript: (function () { var caseElements = document.querySelectorAll('.title.slds-truncate'); var caseNumber = ''; for (var i = 0; i < caseElements.length; i++) { var caseText = caseElements[i].textContent; var caseMatch = caseText.match(/\d+ \| Case/); if (caseMatch && caseMatch.length > 0) { caseNumber = caseMatch[0].split(' | ')[0]; var caseDummy = document.createElement('input'); document.body.appendChild(caseDummy); caseDummy.setAttribute('value', caseNumber); caseDummy.select(); document.execCommand('copy'); document.body.removeChild(caseDummy); alert('Case number copied to clipboard: ' + caseNumber); break; } } var regex = /procore\.com\/(\d+)\/company\/home/g; var found = document.body.innerHTML.match(regex); if (found && found.length > 0) { var match = regex.exec(found[0]); if (match && match.length > 1) { var numberToCopy = match[1]; var dummy = document.createElement('input'); document.body.appendChild(dummy); dummy.setAttribute('value', numberToCopy); dummy.select(); document.execCommand('copy'); document.body.removeChild(dummy); alert('Number copied to clipboard: ' + numberToCopy); } } else { alert('No matching URL found.'); } })();
}

function bookmarkletE() {
  javascript: (function () { var allElements = document.querySelectorAll("*"); var regex = /https:\/\/(us02|app)\.procore\.com\/(\d+)\/company\/home(\/list)?/; var found = false; for (var i = 0; i < allElements.length; i++) { var element = allElements[i]; var innerContent = element.innerHTML || element.textContent; var match = regex.exec(innerContent); if (match) { var newUrl = match[0].replace(/home(\/list)?/, % 27erp_integrations % 27); window.open(newUrl, %27_blank % 27); found = true; break; } } if (!found) { alert(% 27No matching URL found in the page.% 27); } })();
}
