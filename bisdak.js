window.addEventListener('DOMContentLoaded', function () {
  const radoRail = document.getElementById('radoRail');
  const panelMode = document.getElementById('panelMode');
  const inputSQM = document.getElementById('inputSQM');
  const inputPrice = document.getElementById('inputPrice');
  const radoImage = document.getElementById('radoImage');
  const panelImage = document.getElementById('panelImage');
  const fullForm = document.getElementById('fullForm');
  const formWrapper = document.getElementById('custom-form');

  const hiddenRadoRail = document.getElementById('hiddenRadoRail');
  const hiddenPanelMode = document.getElementById('hiddenPanelMode');
  const hiddenSQM = document.getElementById('hiddenSQM');
  const hiddenPrice = document.getElementById('hiddenPrice');

  const radoImageMap = {
    '10': 'https://mrstairpanelling.co.uk/wp-content/uploads/2025/07/19x63-Victorian.png',
    '15': 'https://mrstairpanelling.co.uk/wp-content/uploads/2025/07/15x57-Victorian.png',
    '20': 'https://mrstairpanelling.co.uk/wp-content/uploads/2025/07/25x50-Astragal.png'
  };

  const panelImageMap = {
    '30': 'https://mrstairpanelling.co.uk/wp-content/uploads/2025/07/12x25-ogee.png',
    '45': 'https://mrstairpanelling.co.uk/wp-content/uploads/2025/07/12x32-ogee.png',
    '60': 'https://mrstairpanelling.co.uk/wp-content/uploads/2025/07/16x38-ogee.png',
    '70': 'https://mrstairpanelling.co.uk/wp-content/uploads/2025/07/12x25-Astragal.png'
  };

  function calculatePrice() {
    const sqm = parseFloat(inputSQM.value) || 0;
    return (99 * sqm);
  }

  function updateAllFields() {
    const price = calculatePrice().toFixed(2);
    inputPrice.value = price;

    hiddenRadoRail.value = radoRail.options[radoRail.selectedIndex].text;
    hiddenPanelMode.value = panelMode.options[panelMode.selectedIndex].text;
    hiddenSQM.value = inputSQM.value;
    hiddenPrice.value = price;

    document.getElementById('summaryRadoRail').textContent = radoRail.options[radoRail.selectedIndex].text;
    document.getElementById('summaryPanelMode').textContent = panelMode.options[panelMode.selectedIndex].text;
    document.getElementById('summarySQM').textContent = inputSQM.value;
    document.getElementById('summaryPrice').textContent = "£" + price;

    const radoVal = radoRail.value;
    const panelVal = panelMode.value;

    if (radoImageMap[radoVal]) {
      radoImage.src = radoImageMap[radoVal];
      radoImage.style.display = 'block';
    } else {
      radoImage.style.display = 'none';
    }

    if (panelImageMap[panelVal]) {
      panelImage.src = panelImageMap[panelVal];
      panelImage.style.display = 'block';
    } else {
      panelImage.style.display = 'none';
    }
  }

  function resetFormUI() {
    // Clear images
    radoImage.style.display = 'none';
    panelImage.style.display = 'none';

    // Clear summary text
    document.getElementById('summaryRadoRail').textContent = '';
    document.getElementById('summaryPanelMode').textContent = '';
    document.getElementById('summarySQM').textContent = '';
    document.getElementById('summaryPrice').textContent = '';

    // Clear hidden fields
    hiddenRadoRail.value = '';
    hiddenPanelMode.value = '';
    hiddenSQM.value = '';
    hiddenPrice.value = '';

    // Clear calculated price
    inputPrice.value = '';
  }

 function showSuccessMessage() {
  if (formWrapper) {
    formWrapper.style.display = 'none';

    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-4';
    successDiv.id = 'successMessage';

    successDiv.innerHTML = `
      <h4 class="mb-2">Success!</h4>
      <p>Your measure-up request has been received. We’ll be in touch within 1–2 business days to arrange your site visit. Prepare for exceptional panelling!</p>
    `;

    formWrapper.parentNode.insertBefore(successDiv, formWrapper);

    // ✅ Delay the scroll slightly to ensure the DOM is ready
    setTimeout(() => {
      const messageEl = document.getElementById('successMessage');
      if (messageEl) {
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // 300ms delay helps the browser settle after page load
  }
}



 	 // Show success message on redirect
	if (window.location.search.includes('sample_request=success')) {
  	// Remove the anchor/hash and scroll behavior lock
 	 history.replaceState(null, '', window.location.pathname + window.location.search);

  	// Wait for DOM to be stable before injecting + scrolling
  	setTimeout(() => {
    showSuccessMessage();
  }, 200);
}


  // Update preview when modal is shown
  document.getElementById('detailsModal').addEventListener('show.bs.modal', updateAllFields);

  // Submit form
  fullForm.addEventListener('submit', function (e) {
    e.preventDefault();
    updateAllFields();

    const formData = new FormData(fullForm);

    fetch('/wp-admin/admin-post.php', {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if (!res.ok) throw new Error('Form submission failed.');
      return res.text();
    })
    .then(data => {
      console.log('Response:', data);

      fullForm.reset();
      document.getElementById('calculatorForm').reset();
      bootstrap.Modal.getInstance(document.getElementById('detailsModal')).hide();

      resetFormUI(); // ✅ Reset visual elements
      showSuccessMessage(); // ✅ Show thank-you
    })
    .catch(err => {
      console.error(err);
      alert('Submission failed. Please try again.');
    });
  });

  // Setup listeners for dynamic updates
  [radoRail, panelMode, inputSQM].forEach(el => {
    el.addEventListener('input', updateAllFields);
    el.addEventListener('change', updateAllFields);
  });

  window.addEventListener('load', updateAllFields);
});
