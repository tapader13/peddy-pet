const spinner = document.querySelector('.dot-spinner');
const allpets = document.getElementById('allpets');
const rightside = document.getElementById('rightside');
let loadData = [];

//find categorys
async function getCategorys() {
  try {
    const response = await fetch(
      'https://openapi.programming-hero.com/api/peddy/categories'
    );
    const data = await response.json();
    showCategorys(data.categories);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}
getCategorys();

//show categorys
function showCategorys(categorys) {
  const pets = document.getElementById('pets');
  pets.innerHTML = '';
  for (const element of categorys) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add(
      'p-6',
      'cursor-pointer',
      'bg-white',
      'border',
      'border-solid',
      'border-main/15',
      'rounded-2xl',
      'flex',
      'items-center',
      'justify-center',
      'gap-6',
      'forselectactive'
    );

    categoryDiv.innerHTML = `
      <img src="${element.category_icon}" alt="" />
      <h2 class="font-inter font-[700] text-second text-[24px] leading-[29px]">
        ${element.category}
      </h2>
    `;
    categoryDiv.addEventListener('click', () => {
      document.querySelectorAll('.forselectactive').forEach((element) => {
        element.classList.remove('active');
      });
      categoryDiv.classList.add('active');

      spinner.classList.remove('hidden');
      allpets.classList.add('hidden');
      setTimeout(() => {
        getCategoryPets(element.category);
      }, 2000);
    });
    pets.appendChild(categoryDiv);
  }
}
//get all pets
async function getAllPets() {
  try {
    const response = await fetch(
      'https://openapi.programming-hero.com/api/peddy/pets'
    );
    const data = await response.json();
    showAllPets(data.pets);
    loadData = data.pets;
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}
getAllPets();

//show all pets
function showAllPets(pets) {
  allpets.innerHTML = '';
  if (pets.length > 0) {
    for (const element of pets) {
      allpets.innerHTML += `
<div
            class="p-5 bg-white rounded-xl border border-solid border-second/10"
          >
            <img class="w-full h-[160px] rounded-lg" src=${
              element.image ? element.image : 'N/A'
            } alt="" />
            <h3 class="mt-6 font-inter font-[700] text-[20px] leading-[24px]">
              ${element?.pet_name ? element.pet_name : 'N/A'}
            </h3>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fas fa-th-large icon"></i> </span>
              Breed: ${element?.breed ? element.breed : 'N/A'}
            </p>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fa-regular fa-calendar"></i></span
              >Birth: ${element?.date_of_birth ? element.date_of_birth : 'N/A'}
            </p>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fa-solid fa-mercury"></i></span
              >Gender: ${element?.gender ? element.gender : 'N/A'}
            </p>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fa-solid fa-dollar-sign"></i></span
              >Price : ${element?.price ? element.price : 'N/A'}$
            </p>
            <hr class="my-4 text-second/10" />
            <div class="flex items-center justify-between">
              <div onClick="addToRight('${element.petId}')"
                class="px-[18px] py-[9px] text-main rounded-lg border boprder-solid border-main/15 cursor-pointer"
              >
                <span><i class="fa-regular fa-thumbs-up"></i></span>
              </div>
              <div
                class="px-[18px] py-[9px] text-main rounded-lg border boprder-solid border-main/15 cursor-pointer"
              >
                Adopt
              </div>
              <div
                class="px-[18px] py-[9px] text-main rounded-lg border boprder-solid border-main/15 cursor-pointer"
              >
                Details
              </div>
            </div>
          </div>
        `;
    }
  } else {
    allpets.innerHTML = `
      <div
  class="p-5 py-24 text-center w-full col-span-3 bg-[rgba(19,19,19,0.03)] rounded-xl border border-solid border-second/10 flex flex-col items-center justify-center"
>
  <img class="w-[160px] h-[160px] rounded-lg" src="./error.webp" alt="" />
  <h3 class="mt-10 mb-4 font-inter font-[700] text-[32px] leading-[39px]">
    No Information Available
  </h3>
  <p class="text-second/70 w-7/12 mx-auto font-lato font-normal text-[16px] leading-[26px]">
    It is a long established fact that a reader will be distracted by the
    readable content of a page when looking at its layout. The point of using
    Lorem Ipsum is that it has a.
  </p>
</div>

        `;
  }
}

//add to right
async function addToRight(id) {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    const data = await response.json();
    showRightSideImg(data.petData);
  } catch (error) {
    console.log(error.message);
  }
}

//show right side img
function showRightSideImg(data) {
  const div = document.createElement('div');
  div.innerHTML = `
   <img src="${data.image}" class="w-[124px] rounded-lg h-[124px]" alt="" />
  
   `;
  rightside.appendChild(div);
}

//get category pets
async function getCategoryPets(category) {
  try {
    spinner.classList.add('hidden');
    allpets.classList.remove('hidden');
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );
    const data = await response.json();
    showAllPets(data.data);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

//sort by price
function sortByPrice() {
  allpets.innerHTML = '';
  const priceSort = loadData.sort((a, b) => a.price - b.price);
  showAllPets(priceSort);
}
