const spinner = document.querySelector('.dot-spinner');
const allpets = document.getElementById('allpets');
const rightside = document.getElementById('rightside');
const sort = document.getElementById('sort');
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

//show categorys
function showCategorys(categorys) {
  const pets = document.getElementById('pets');
  pets.innerHTML = '';
  for (const element of categorys) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add(
      'p-3',
      'sm:p-6',
      'cursor-pointer',
      'bg-white',
      'border',
      'border-solid',
      'border-main/15',
      'rounded-2xl',
      'flex',
      'items-center',
      'justify-center',
      'gap-3',
      'sm:gap-6',
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
    spinner.classList.add('hidden');
    allpets.classList.remove('hidden');
    const response = await fetch(
      'https://openapi.programming-hero.com/api/peddy/pets'
    );
    const data = await response.json();

    loadData.push(...data.pets);
    showAllPets(data.pets);
  } catch (error) {
    console.log(error.message);
  }
}
spinner.classList.remove('hidden');
allpets.classList.add('hidden');
setTimeout(() => {
  getCategorys();
  getAllPets();
}, 2000);

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
              >Price : ${element?.price ? element.price : '0'}$
            </p>
            <hr class="my-4 text-second/10" />
            <div class="flex items-center justify-between xl:gap-1">
              <div onClick="addToRight('${element.petId}')"
                class="px-[18px] py-[9px] text-main rounded-lg border boprder-solid border-main/15 cursor-pointer"
              >
                <span><i class="fa-regular fa-thumbs-up"></i></span>
              </div>
              <button data-id="${element.petId}" onClick="ShowCounterModal('${
        element.petId
      }')"
                class="px-[18px] py-[9px] text-main rounded-lg border border-solid adopt-btn border-main/15 cursor-pointer"
              >
                Adopt
              </button>
              <div onClick="fetchPetDetails('${element.petId}')"
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
    Currently, there are no pets available for this type of pet. Please check later for updates on our available pets. We are continuously working to provide you best pets.
  </p>
</div>

        `;
  }
}
//fetch pet details
async function fetchPetDetails(id) {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    const data = await response.json();
    showDetails(data.petData);
  } catch (error) {
    console.log(error.message);
  }
}

//show details of pet in modal
function showDetails(data) {
  const modal = document.getElementById('my_modal_2');
  modal.showModal();
  modal.innerHTML = `
      <div class="modal-box p-6">
             <img class="w-full rounded-lg h-[220px]" src=${
               data?.image
             } alt="" />
               <h3 class="mt-6 font-inter font-[700] text-[20px] leading-[24px]">
                ${data?.pet_name}
            </h3>
            <div class="flex sm:gap-10 gap-5">
            
            <div>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fas fa-th-large icon"></i> </span>
              Breed: ${data?.breed ? data.breed : 'N/A'}
            </p>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fa-regular fa-calendar"></i></span
              >Birth: ${data?.date_of_birth ? data.date_of_birth : 'N/A'}
            </p>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fa-solid fa-syringe"></i></span
              >Vaccinated_status: ${
                data?.vaccinated_status ? data.vaccinated_status : 'N/A'
              }
            </p>
            
            </div>
            <div>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fa-solid fa-mercury"></i></span
              >Gender: ${data?.gender ? data.gender : 'N/A'}
            </p>
            <p
              class="text-second/70 mt-1 font-lato font-normal text-[16px] leading-[19px]"
            >
              <span class="mr-1"><i class="fa-solid fa-dollar-sign"></i></span
              >Price : ${data?.price ? data.price : '0'}$
            </p>
            
            </div>
            </div>
            <hr class="my-4 text-second/10" />
            <div>
            <h5 class="font-inter font-[700] text-[20px] leading-[24px]">Details Information</h5>         
            <p class="text-second/70 mt-2 font-inter font-normal text-[16px] leading-[24px]">${
              data?.pet_details
            }</p>
            </div>
              <div class="modal-action">
              <form class="w-full" method="dialog">
                  <button class="btn w-full py-[13px] rounded-lg border border-solid border-main/20 bg-main/10 text-main font-lato text-[18px] leading-[22px] font-bold ">Close</button>
              </form>
              </div>
          </div>
  `;
}

//show adopt modal
function ShowCounterModal(id) {
  const modal = document.getElementById('my_modal_1');
  count.innerHTML = 3;
  const adoptBtn = document.querySelector(`.adopt-btn[data-id="${id}"]`);
  modal.showModal();
  const modalInterval = setInterval(() => {
    const count = document.getElementById('count');
    if (count.innerHTML > 0) {
      count.innerHTML = count.innerHTML - 1;
    }
    if (count.innerHTML <= 0) {
      clearInterval(modalInterval);
      count.innerHTML = 1;
      if (adoptBtn) {
        console.log(adoptBtn);
        adoptBtn.setAttribute('disabled', true);
        adoptBtn.style.cursor = 'not-allowed';
        adoptBtn.style.opacity = '0.5';
        adoptBtn.textContent = 'Adopted';
      }
      modal.close();
    }
  }, 1000);
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
   <img src="${data.image}" class="lg:w-full md:w-full w-full rounded-lg h-[124px]" alt="" />
  
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
    loadData = [];
    loadData.push(...data.data);
    showAllPets(data.data);
  } catch (error) {
    console.log(error.message);
  }
}

//sort by price
sort.addEventListener('click', () => {
  spinner.classList.remove('hidden');
  allpets.classList.add('hidden');
  setTimeout(() => {
    loadData.sort((a, b) => {
      const priceA = a.price === null || a.price === undefined ? 0 : a.price;
      const priceB = b.price === null || b.price === undefined ? 0 : b.price;
      return priceB - priceA;
    });
    showAllPets(loadData);
    spinner.classList.add('hidden');
    allpets.classList.remove('hidden');
  }, 2000);
});
