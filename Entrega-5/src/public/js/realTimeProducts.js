const socket = io();
const input = document.getElementById('textbox');
const log = document.getElementById('log');

document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;

  socket.emit('nuevoProducto', { title, description, price });
});

socket.on('productos', (products) => {
    const tableBody = document.getElementById('productTableBody');
  
    tableBody.innerHTML = '';
  
    products.forEach((product) => {
      const row = tableBody.insertRow();
  
      const titleCell = row.insertCell();
      titleCell.innerHTML = product.title;
  
      const descriptionCell = row.insertCell();
      descriptionCell.innerHTML = product.description;
  
      const priceCell = row.insertCell();
      priceCell.innerHTML = product.price;
    });
  }); 