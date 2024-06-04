// array methods
/* 
friends.sort();
friends.reverse();


 friends.push()
 friends.pop()


 friends.unshift( "hammmmadaa" )
 friends.shift(  )


  friends.splice(   2    ,    3  ) // remove

 friends.splice(   3    ,    0   ,   "ali"   ) // add 


  friends.splice(   3    ,    1   ,   "ali"   ) // add    + remove (update)



 friends.includes( "ali" )
  friends.indexOf("usama"   , 3 )
  friends.lastIndexOf("usama"   , 3 )


   friends.join(  " "  )

*/

//  0           1       2           3          4                5

// ----------------------------------------------------------------

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");

var productList = [];

if (localStorage.getItem("ProductLIST") !== null) {
  productList = JSON.parse(localStorage.getItem("ProductLIST"));
  displayProduct();
}

function addProduct() {
  if (
    validationInput(productName, "errMsgName") &&
    validationInput(productPrice, "errMsgPrice") &&
    validationInput(productCategory, "errMsgCat") &&
    validationInput(productDescription, "errMsgDesc")
    // validationInput(productImage , "errMsgImg")
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      type: productCategory.value,
      desc: productDescription.value,
      img: productImage.files[0]?.name
        ? `images/${productImage.files[0]?.name}`
        : "images/1.jpg",
    };

    productList.push(product);

    clear();
    displayProduct();

    localStorage.setItem("ProductLIST", JSON.stringify(productList));

  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");

  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");


  }



}

function clear() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  productImage.value = null;
}

function deleteProduct(indexProduct) {
  productList.splice(indexProduct, 1);
  console.log(indexProduct);
  localStorage.setItem("ProductLIST", JSON.stringify(productList));
  displayProduct();
}

function displayProduct() {
  var search = searchProduct.value;
  var table = ``;

  for (i = 0; i < productList.length; i++) {
    // if(productList[i].name.toLowerCase().includes( search.toLowerCase()) == true)

    if (productList[i].name.toLowerCase().startsWith(search.toLowerCase())) {
      table += `
      <tr>
      <td>${i}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].type}</td>
      <td>${productList[i].desc}</td>
      <td>
        <img width="100px" src="${productList[i].img}" alt="product">
      </td>

      <td>
        <button onclick="setUpdateData(${i})" class="btn btn-outline-warning btn-sm">Update</button>
        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
      </td>
    </tr>
      `;
    }
  }
  document.getElementById("table-body").innerHTML = table;
}

function validationInput(element, msgId) {
  var text = element.value;
  var regex = {
    productName: /^[A-Z][a-z]{3,8}$/,
    productPrice: /^[0-9]{3,5}$/,
    productCategory: /^(tv|mobile|screens|electronic)$/i,
    productDescription: /^.{3,}/m,
    // productImage: /^.{1,}\.(jpg|jpeg|svg|png|avif)$/,
  };

  var errMsg = document.getElementById(msgId);

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    errMsg.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    errMsg.classList.remove("d-none");
    return false;
  }

}

var index =0;

function setUpdateData(indexElement) {
  productName.value = productList[indexElement].name;
  productPrice.value = productList[indexElement].price;
  productCategory.value = productList[indexElement].type;
  productDescription.value = productList[indexElement].desc;

  btnUpdate.classList.remove("d-none");

  index =indexElement;

}


function updateData(){
  
  var product = {
    name: productName.value,
    price: productPrice.value,
    type: productCategory.value,
    desc: productDescription.value,
    img: productImage.files[0]?.name
      ? `images/${productImage.files[0]?.name}`
      : "images/1.jpg",
  };

  productList.splice( index , 1 , product);

  clear();
  displayProduct();

  localStorage.setItem("ProductLIST", JSON.stringify(productList));

  btnUpdate.classList.add("d-none")

}