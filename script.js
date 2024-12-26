'use strict'
const element = document.querySelector('.max');
const select = document.querySelector('select');
const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal-header');
const modalBody = modal.querySelector('.modal-body');
// Carga JSON con camaras

  fetch('jsonCamaras.json')
    .then(response => response.json())
    .then(data => {
        data.listaCamaras.forEach(item => {
          const title = document.createElement('option');
          title.value = item.nomeCamara;
          title.textContent = item.concello + ' - ' + item.nomeCamara;
          select.appendChild(title);
          element.appendChild(select);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));


function loadImaxes(){
  const selectedOption = select.value;
  fetch('jsonCamaras.json')
  .then(response => response.json())
  .then(data => {
    data.listaCamaras.forEach(item => {
      const id = item.nomeCamara;
      const idString = id.toString();
      if (idString === selectedOption) {
        modalTitle.textContent = idString;
        const img = document.createElement('img');
        img.src = item.imaxeCamara;
        img.style.width = '100%';
        modalBody.appendChild(img);
      }
    });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));

}
  select.addEventListener('change', function() {
    modalBody.innerHTML = '';
    modalTitle.textContent = '';
    loadImaxes();
    modal.classList.add('show');
  });

  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.classList.remove('show');
    }
  });

  window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      modal.classList.remove('show');
    }
  });

  const closeBtn = modal.querySelector('.closeBtn');
  closeBtn.addEventListener('click', function() {
    modal.classList.remove('show');
  });

 