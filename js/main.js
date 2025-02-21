document.getElementById("burger").addEventListener("click", function () {
    document.getElementById("phone-nav").classList.remove("hidden");
});

document.getElementById("close").addEventListener("click", function () {
    document.getElementById("phone-nav").classList.add("hidden");
});

let currentPage = 1;
const itemsPerPage = 6;
let allCourses = [];

async function renderCourses() {
    try {
        if (allCourses.length === 0) {
            const response = await fetch('cursuri.json');
            allCourses = await response.json();
        }

        let filteredCourses = filterCourses(allCourses);

        const container = document.getElementById('courses-container');
        const paginationContainer = document.getElementById('pagination-container');

        const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedCourses = filteredCourses.slice(start, end);

        container.innerHTML = '';

        paginatedCourses.forEach(course => {
            const courseElement = `
            <a href="/pages/curs.html?id=${course.id}">
                <div class="grid grid-cols-1 gap-4 p-5 border border-black/30 dark:border-white/50 rounded-xl h-full hover:bg-black/10 dark:hover:bg-gray-100/10">
                    <div class="flex justify-start items-center gap-2 font-medium ">
                        <div><img src="${course.image}" class="max-w-fit" alt="Course"></div>
                        <div><p class="lg:text-xl">${course.name}</p></div>
                    </div>
                    <div class="max-w-[250px]">
                        <p class="text-sm lg:text-md 2xl:text-lg text-sur dark:text-white/50">${course.description}</p>
                    </div>
                    <div class="flex justify-between text-xs">
                        <div class="flex flex-col gap-1">
                            <div class="flex gap-1 items-center">
                                <img src="assets/timp.png" alt="Time">
                                <p class="lg:text-md 2xl:text-lg">${course.ore} ore</p>
                            </div>
                            <div class="flex gap-1 items-center">
                                <img src="assets/calendar.png" alt="Calendar">
                                <p class="lg:text-md 2xl:text-lg">${course.perioada}</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1">
                            <div class="flex gap-1 items-center">
                                <img src="assets/locuri.png" alt="Spots">
                                <p class="lg:text-md 2xl:text-lg">${course.locuri} locuri</p>
                            </div>
                            <div class="flex gap-1 items-center">
                                <img src="assets/experienta.png" alt="Experience">
                                <p class="lg:text-md 2xl:text-lg">${course.categorie}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            `;
            
            container.innerHTML += courseElement;
        });
        
        renderPagination(totalPages);
        
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

function filterCourses(courses) {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const durationFilter = document.getElementById('durationFilter').value;
    const languageFilter = document.getElementById('languageFilter').value;
    
    return courses.filter(course => {
        const matchesCategory = !categoryFilter || course.categorie === categoryFilter;
        const matchesDuration = !durationFilter || course.durata === durationFilter;
        const matchesLanguage = !languageFilter || course.limba === languageFilter;
        
        return matchesCategory && matchesDuration && matchesLanguage;
    });
}

function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
    
    const paginationContent = `
        <div class="flex justify-center gap-2 mt-8">
            ${currentPage > 1 ? `
                <button 
                    onclick="changePage(${currentPage - 1})"
                    class="hidden md:block px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/10"
                >
                    Inapoi
                </button>
            ` : ''}
            
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                <button 
                    onclick="changePage(${page})"
                    class="px-4 py-2 rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/10'}"
                >
                    ${page}
                </button>
            `).join('')}
            
            ${currentPage < totalPages ? `
                <button 
                    onclick="changePage(${currentPage + 1})"
                    class="hidden md:block px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/10"
                >
                    Inainte
                </button>
            ` : ''}
        </div>
    `;
    
    paginationContainer.innerHTML = paginationContent;
}

function changePage(page) {
    currentPage = page;
    renderCourses();
    document.getElementById('courses-container').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    
    document.getElementById('categoryFilter').addEventListener('change', () => {
        currentPage = 1;
        renderCourses();
    });
    
    document.getElementById('durationFilter').addEventListener('change', () => {
        currentPage = 1;
        renderCourses();
    });
    
    document.getElementById('languageFilter').addEventListener('change', () => {
        currentPage = 1;
        renderCourses();
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggleDarkIcon.classList.add('hidden');
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }
    }

    function handleTheme() {
        const savedTheme = localStorage.getItem('color-theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            applyTheme('light');
            localStorage.setItem('color-theme', 'light');
        }
    }


    handleTheme();


    
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('color-theme', 'light');
            applyTheme('light');
        } else {
            localStorage.setItem('color-theme', 'dark');
            applyTheme('dark');
        }
    });
});
document.documentElement.classList.toggle('dark');


document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle2');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon2');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon2');

    function applyTheme2(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggleDarkIcon.classList.add('hidden');
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }
    }

    function handleTheme2() {
        const savedTheme = localStorage.getItem('color-theme');
        if (savedTheme) {
            applyTheme2(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme2('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            applyTheme2('light');
            localStorage.setItem('color-theme', 'light');
        }
    }


    handleTheme2();


    
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('color-theme', 'light');
            applyTheme2('light');
        } else {
            localStorage.setItem('color-theme', 'dark');
            applyTheme2('dark');
        }
    });
});
document.documentElement.classList.toggle('dark');


let searchInput;
let searchDropdown;

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (searchTerm.length === 0) {
        searchDropdown.classList.add('hidden');
        return;
    }
    
    const filteredCourses = allCourses.filter(course => 
        course.name.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm)
    );
    
    if (filteredCourses.length > 0) {
        searchDropdown.innerHTML = filteredCourses.map(course => `
            <a href="cmiea/pages/curs.html?id=${course.id}" class="block">
                <div class="p-4 hover:bg-black/10 dark:hover:bg-gray-100/10 cursor-pointer">
                    <div class="flex items-center gap-2">
                        <img src="${course.image}" class="w-[30px] h-[30px]" alt="Course">
                        <div>
                            <p class="text-sm font-medium dark:text-white text-start">${course.name}</p>
                            <p class="text-xs text-sur dark:text-white/50 text-start">${course.description}</p>
                        </div>
                    </div>
                </div>
            </a>
        `).join('');
        searchDropdown.classList.remove('hidden');
    } else {
        searchDropdown.innerHTML = `
            <div class="p-4 text-center text-sur dark:text-white/50">
                Nu s-au găsit cursuri
            </div>
        `;
        searchDropdown.classList.remove('hidden');
    }
}

function handleClickOutside(event) {
    if (!event.target.closest('.hero .relative')) {
        searchDropdown.classList.add('hidden');
    }
}


document.addEventListener('DOMContentLoaded', () => {

    searchInput = document.getElementById('searchInput');
    searchDropdown = document.getElementById('searchDropdown');

    if (searchInput && searchDropdown) {
        searchInput.addEventListener('input', handleSearch);
        document.addEventListener('click', handleClickOutside);
    }
});

var swiper = new Swiper(".multiple-slide-carousel", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-n",
      prevEl: ".swiper-button-p",
    },
    breakpoints: {
     1920: {
         slidesPerView: 3,
         spaceBetween: 30
     },
     848: {
         slidesPerView: 2,
         spaceBetween: 30
     },
     0: {
         slidesPerView: 1,
         spaceBetween: 0
     }
   }
  });


