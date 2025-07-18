window.addEventListener('DOMContentLoaded', function () {
  const radoRail = document.getElementById('radoRail');
  const panelMode = document.getElementById('panelMode');
  const inputSQM = document.getElementById('inputSQM');
  const inputPrice = document.getElementById('inputPrice');
  const radoImage = document.getElementById('radoImage');
  const panelImage = document.getElementById('panelImage');

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
    //const rado = parseFloat(radoRail.value) || 0;
    //const panel = parseFloat(panelMode.value) || 0;
    const sqm = parseFloat(inputSQM.value) || 0;
    return (99 * sqm);
  }

  function updateAllFields() {
    console.log("updateAllFields called");

    const price = calculatePrice().toFixed(2);
    inputPrice.value = price;

	hiddenRadoRail.value = radoRail.options[radoRail.selectedIndex].text;
    hiddenPanelMode.value = panelMode.options[panelMode.selectedIndex].text;
    hiddenSQM.value = inputSQM.value;
    hiddenPrice.value = price;

	 // Update preview summary (modal table)
	document.getElementById('summaryRadoRail').textContent = radoRail.options[radoRail.selectedIndex].text;
	document.getElementById('summaryPanelMode').textContent = panelMode.options[panelMode.selectedIndex].text;
	document.getElementById('summarySQM').textContent = inputSQM.value;
	document.getElementById('summaryPrice').textContent = "£" + price;

    const radoVal = radoRail.value;
    const panelVal = panelMode.value;

    if (radoImageMap[radoVal]) {
      console.log("Updating Rado Image to:", radoImageMap[radoVal]);
      radoImage.src = radoImageMap[radoVal];
      radoImage.style.display = 'block';
    } else {
      radoImage.style.display = 'none';
    }

    if (panelImageMap[panelVal]) {
      console.log("Updating Panel Image to:", panelImageMap[panelVal]);
      panelImage.src = panelImageMap[panelVal];
      panelImage.style.display = 'block';
    } else {
      panelImage.style.display = 'none';
    }



  }

  [radoRail, panelMode, inputSQM].forEach(el => {
    el.addEventListener('input', updateAllFields);
    el.addEventListener('change', updateAllFields);
  });

  window.addEventListener('load', updateAllFields);
});
