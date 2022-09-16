
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.recipe__btn');

const nav = document.querySelector('.nav')

const section11 = document.querySelector('#section--1')


const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hide');
  overlay.classList.remove('hide');
};

const closeModal = function () {
  modal.classList.add('hide');
  overlay.classList.add('hide');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});






const preview_arrow = document.querySelector('.preview_arrow');

const next_arrow = document.querySelector('.next_arrow');

const god = document.querySelector('.myresult');

const search__btn = document.querySelector('.search__btn')

var data = [];

let pageSize = 3;
let currentPage = 1;




async function renderTable(page = 1) {
await getData()

if (page === 1) {
  preview_arrow.style.visibility = "hidden"
} else {
  preview_arrow.style.visibility = "visible"
}


if (page == numberOfPages()) {
  next_arrow.style.visibility ='hidden'
} else{
  next_arrow.style.visibility = "visible"
}


search__btn.addEventListener('click', function (e) {
  e.preventDefault();
  const searched = document.querySelector('.search__field').value;
console.log(searched);
const myresult = data.filter( details => {
  return (
    details.category.includes(searched) ||
   details.title.includes(searched));
});
displayContent(myresult)
})

 const displayContent = (data) => {
const cryptoCoin = data.filter((row, index) => {
  let start = (currentPage - 1) * pageSize;
  console.log(start);
  let end = currentPage * pageSize
if(index >= start && index < end )
  return true;
}).map(details => {
      console.log(details)
       return `
       <P><img src="${details.image}" class="head_image" alt=""/><P>
                    <div class="main_id"><svg class="recipe__icon">
                      <use href="icons.svg#icon-users"></use>
                    </svg><span>Title:${details.title}</span>
                  </div>
                    <div class="main_id">Price: ${details.price}</div>
                    <div class="main_id">Category: ${details.category}</div>
                  <ul class="main_id">Rate: ${Math.round(details.rating.rate)}</ul>
                    <ul class="main_id">Count: ${details.rating.count}
                    </ul>
                    <div class="nav_arrowed">
                  </div>  
                  </div>
         `;
      }).join('')

      god.innerHTML = '';
      god.insertAdjacentHTML('afterbegin', cryptoCoin)


}}
renderTable()


function previousPage() {
  if (currentPage > 1)
  currentPage--;
  renderTable(currentPage)
}

function nextPage() {
  if ((currentPage * pageSize) < data.length )
  currentPage++;
  renderTable(currentPage)
}


function numberOfPages() {
  return Math.ceil(data.length / pageSize);
}

preview_arrow.addEventListener('click', previousPage, false)

document.querySelector(".next_arrow").addEventListener('click', nextPage, false)

async function getData(){
const res = await fetch('https://fakestoreapi.com/products/');
 if(!res.ok) throw new Error ('No recipe found')
 data = await res.json();
}
