let joy = document.getElementById('quti');

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(mahsulotlar => {
    mahsulotlar.forEach(mahsulot => {
      let mahsulotQuti = document.createElement('div');
      mahsulotQuti.className = 'mahsulot';

      mahsulotQuti.innerHTML = `
        <img src="${mahsulot.image}" alt="rasm" class="rasm">
        <div class="nomi">${mahsulot.title}</div>
        <div class="narxi">$${mahsulot.price}</div>
        <div class="kategoriya">${mahsulot.category}</div>
        <div class="baho"><i class="fa-solid fa-star"></i> ${mahsulot.rating.rate} (${mahsulot.rating.count} ta)</div>
      `;
      joy.appendChild(mahsulotQuti);
    });
  })
  .catch(xato => {
    joy.innerHTML = '<p>Xatolik: Ma\'lumotlar olinmadi</p>';
    console.error(xato);
  });
