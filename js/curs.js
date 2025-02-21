async function renderCourseDetails() {
    try {
        
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('id');
        
        if (!courseId) {
            throw new Error('niciun id');
        }

        
        const response = await fetch('../cursuri.json');
        const courses = await response.json();
        
        
        const course = courses.find(c => c.id.toString() === courseId);
        
        if (!course) {
            throw new Error('Curs negasit');
        }

        
        const container = document.getElementById('course-details-container');
        
        container.innerHTML = '';
        
        
        const courseDetails = `
            <div class="flex flex-col gap-4">
          <div>
            <p class="font-semibold text-4xl">${course.name}</p>
          </div>
          <div class="flex flex-wrap max-w-[400px] gap-2">
            <div class="eticheta bg-[#3542FF] flex gap-1 items-center"><img src="./assets/limbaAlb.png" alt=""><p class="text-white">${course.limba}</p> </div>
            <div class="eticheta bg-[#3542FF] flex gap-1 items-center"><img src="./assets/timpAlb.png" alt=""><p class="text-white">${course.ore} Ore</p> </div>
            <div class="eticheta bg-[#3542FF] flex gap-1 items-center"><img src="./assets/calendarAlb.png" alt=""><p class="text-white">${course.durata}</p> </div>
            <div class="eticheta bg-[#3542FF] flex gap-1 items-center"><img src="./assets/experientaAlb.png" alt=""><p class="text-white">${course.categorie}</p> </div>
            <div class="eticheta bg-[#3542FF] flex gap-1 items-center"><img src="./assets/locuriAlb.png" alt=""><p class="text-white">Locuri disponibile: ${course.locuri}</p> </div>
          </div>
          <div class="max-w-[400px] mt-6 flex flex-col gap-2">
            <p class="font-semibold text-3xl">Ce o sa inveti?</p>
            <div class="flex flex-col gap-3 text-[18px]">
             <div class="flex gap-1"> <img src="./assets/checkmark.png" class="w-6 h-6" alt=""><p>${course.inveti1}</p></div>
             <div class="flex gap-1"> <img src="./assets/checkmark.png" class="w-6 h-6" alt=""><p>${course.inveti2}</p></div>
             <div class="flex gap-1"> <img src="./assets/checkmark.png" class="w-6 h-6" alt=""><p>${course.inveti3}</p></div>
            </div>
          </div>
        </div>
        `;
        
        container.innerHTML = courseDetails;

        document.getElementById('numeCurs').value = course.name;
        
    } catch (error) {
        console.error('Eroare', error);
        const container = document.getElementById('course-details-container');
        container.innerHTML = `
            <div class="text-center p-6 flex flex-col items-center justify-center h-[70vh]">
                <h2 class="text-3xl lg:text-5xl font-bold text-red-600">Eroare</h2>
                <a href="/" class="mt-2 underline">Intoarce-te la pagina principala</a>
            </div>
        `;
    }
}



document.addEventListener('DOMContentLoaded', renderCourseDetails);

window.onload = function() {
  document.getElementById("form").reset();
};