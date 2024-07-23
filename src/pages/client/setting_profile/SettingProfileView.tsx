<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="bai3.css">
</head>
<body>
   <div class="container">
    <h3>Danh mục sản phẩm</h3>
    <table class="table table-bordered border-primary" style="text-align: center;">
        <thead>
            <tr>
                <th scope="col">
                    <input type="checkbox" class="largerCheckbox" id="chkAll" onclick="toggleSelectAll(this)" />
                </th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td scope="row">
                    <input type="checkbox" class="chkItem" onchange="toggleProductSelection(this)" />
                </td>
                <td>Iphone 10</td>
                <td><img src="https://rakistan.pk/wp-content/uploads/2021/11/Apple_iPhone_X_4G__256GB__Silver__73564.jpg" width="50" class="product-image"></td>
                <td data-price="10000000">10.000.000 VND</td>
                <td>
                    <div class="quantity-container">
                        <button class="minus-btn" onclick="updateQuantity(this, -1)">-</button>
                        <input type="text" class="quantity-input" value="1" disabled>
                        <button class="plus-btn" onclick="updateQuantity(this, 1)">+</button>
                    </div>
                </td>
                <td><span class="amount">10.000.000 VND</span></td>
                <td><button class="add-to-cart" onclick="addToCart(this)" disabled><i class="fa fa-cart-plus" style="font-size:36px; color: blue; text-align: center;"></i></button></td>
            </tr>
            <tr>
              <td scope="row">
                  <input type="checkbox" class="chkItem" onchange="toggleProductSelection(this)" />
              </td>
              <td>Sam sung j3</td>
              <td><img src="https://rakistan.pk/wp-content/uploads/2021/11/Apple_iPhone_X_4G__256GB__Silver__73564.jpg" width="50" class="product-image"></td>
              <td data-price="30000000">30.000.000 VND</td>
              <td>
                  <div class="quantity-container">
                      <button class="minus-btn" onclick="updateQuantity(this, -1)">-</button>
                      <input type="text" class="quantity-input" value="1" disabled>
                      <button class="plus-btn" onclick="updateQuantity(this, 1)">+</button>
                  </div>
              </td>
              <td><span class="amount">30.000.000 VND</span></td>
              <td><button class="add-to-cart" onclick="addToCart(this)" disabled><i class="fa fa-cart-plus" style="font-size:36px; color: blue; text-align: center;"></i></button></td>
          </tr>
        </tbody>
    </table>
    <h3>Giỏ hàng</h3>
    <table class="table table-bordered border-primary" style="text-align: center;" id="cart">
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="6">Tổng số tiền:</td>
                <td id="totalAmount">0 VND</td>
            </tr>
        </tbody>
    </table>
   </div>
</body>
<script>
    // Hàm bật/tắt trạng thái của các sản phẩm khi checkbox được thay đổi
    function toggleProductSelection(checkbox) {
        const row = checkbox.parentElement.parentElement;
        const quantityInput = row.querySelector(".quantity-input");
        const addButton = row.querySelector(".add-to-cart");
        if (checkbox.checked) {
            quantityInput.disabled = false;
            addButton.disabled = false;
        } else {
            quantityInput.disabled = true;
            addButton.disabled = true;
        }
        updateAmount(row);
    }

    // Hàm bật/tắt trạng thái của tất cả sản phẩm khi checkbox chọn tất cả được thay đổi
    function toggleSelectAll(checkbox) {
        const productCheckboxes = document.querySelectorAll(".chkItem");
        productCheckboxes.forEach(cb => {
            cb.checked = checkbox.checked;
            toggleProductSelection(cb);
        });
    }

    // Hàm cập nhật số lượng của sản phẩm khi nhấn nút + hoặc -
    function updateQuantity(button, delta) {
        const quantityInput = button.parentElement.querySelector(".quantity-input");
        let quantity = parseInt(quantityInput.value);
        quantity = isNaN(quantity) ? 0 : quantity + delta;
        if (quantity < 1) quantity = 1;
        quantityInput.value = quantity;
        const row = button.parentElement.parentElement.parentElement;
        updateAmount(row);
    }

    // Hàm cập nhật thành tiền của sản phẩm
    function updateAmount(row) {
        const price = parseFloat(row.querySelector("td[data-price]").getAttribute("data-price"));
        const quantity = parseInt(row.querySelector(".quantity-input").value);
        row.querySelector(".amount").innerText = (price * quantity).toLocaleString() + " VND";
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(button) {
        const row = button.parentElement.parentElement;
        const productName = row.cells[1].textContent;
        const price = parseFloat(row.cells[3].getAttribute("data-price"));
        const quantity = parseInt(row.querySelector(".quantity-input").value);
        const productImage = row.querySelector(".product-image").src;

        const cartTable = document.getElementById("cart").querySelector("tbody");
        const existingRow = Array.from(cartTable.rows).find(r => r.cells[1] && r.cells[1].textContent === productName);

        if (existingRow) {
            const existingQuantityInput = existingRow.querySelector(".quantity-input");
            existingQuantityInput.value = parseInt(existingQuantityInput.value) + quantity;
            updateAmount(existingRow);
        } else {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${cartTable.rows.length}</td>
                <td>${productName}</td>
                <td><img src="${productImage}" width="50"></td>
                <td>${price.toLocaleString()} VND</td>
                <td>
                    <div class="quantity-container">
                        <button class="minus-btn" onclick="updateCartQuantity(this, -1)">-</button>
                        <input type="text" class="quantity-input" value="${quantity}">
                        <button class="plus-btn" onclick="updateCartQuantity(this, 1)">+</button>
                    </div>
                </td>
                <td class="amount">${(price * quantity).toLocaleString()} VND</td>
                <td><button onclick="removeFromCart(this)"><i class="fa fa-trash" style="font-size:36px; color:red;text-align: center;"></i></button></td>
            `;
            cartTable.insertBefore(newRow, cartTable.lastElementChild);
        }
        updateTotalAmount();
    }

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    function updateCartQuantity(button, delta) {
        const quantityInput = button.parentElement.querySelector(".quantity-input");
        let quantity = parseInt(quantityInput.value);
        quantity = isNaN(quantity) ? 0 : quantity + delta;
        if (quantity < 1) quantity = 1;
        quantityInput.value = quantity;
        const row = button.parentElement.parentElement.parentElement;
        updateAmount(row);
        updateTotalAmount();
    }

    // Hàm xóa sản phẩm khỏi giỏ hàng
    function removeFromCart(button) {
        const row = button.parentElement.parentElement;
        row.parentElement.removeChild(row);
        updateCartIndices();
        updateTotalAmount();
    }

    // Hàm cập nhật lại chỉ số các sản phẩm trong giỏ hàng
    function updateCartIndices() {
        const cartTable = document.getElementById("cart").querySelector("tbody");
        Array.from(cartTable.rows).forEach((row, index) => {
            if (row.cells[0]) {
                row.cells[0].innerText = index + 1;
            }
        });
    }

    // Hàm tính tổng tiền của giỏ hàng
    function updateTotalAmount() {
        const cartTable = document.getElementById("cart").querySelector("tbody");
        let total = 0;
        Array.from(cartTable.rows).forEach(row => {
            if (row.cells[5]) {
                total += parseFloat(row.cells[5].innerText.replace(/[^0-9.-]+/g, ""));
            }
        });
        document.getElementById("totalAmount").innerText = total.toLocaleString() + " VND";
    }

   
</script>
</html>
