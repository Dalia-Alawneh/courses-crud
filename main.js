//get inputs values

var courseName = document.getElementById('courseName')
var courseCategory = document.getElementById('courseCategory')
var coursePrice = document.getElementById('coursePrice')
var courseDescription = document.getElementById('courseDescription')
var courseCapacity = document.getElementById('courseCapacity')
var data = document.getElementById('data')
var addbtn = document.getElementById('click')
var deleteBtn = document.getElementById('deleteBtn')
var search = document.getElementById('search')
var currentIndex=0
var courses
if(JSON.parse(localStorage.getItem('courses')) == null){
    courses = []
}else{
    courses = JSON.parse(localStorage.getItem('courses'))
    displayData()
}

//create course
addbtn.onclick = function(event){
    event.preventDefault();
    if(addbtn.value=='Add Course'){
        addCourse()
    }else
        updateCourse()
    displayData()
    clearInputs()
    courseName.classList.remove('is-valid')
    courseCategory.classList.remove('is-valid')
    coursePrice.classList.remove('is-valid')
    courseDescription.classList.remove('is-valid')
    courseCapacity.classList.remove('is-valid')
}

//ADD course
function addCourse(){
    var course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity:courseCapacity.value
    }
    courses.push(course)
    localStorage.setItem('courses', JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course added successfully',
        showConfirmButton: false,
        timer: 1500
    })
}
//clear inputs
function clearInputs(){
    courseName.value = ''
    courseCategory.value = ''
    coursePrice.value = ''
    courseDescription.value = ''
    courseCapacity.value = ''
}

//Read ==> display Data in table
function displayData(){
    var result='';
    for(var i=0; i<courses.length;i++){
        result+=`
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
        </tr>
        `
    }
    data.innerHTML = result;
}

//delete course

function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                courses.splice(index, 1)
                localStorage.setItem('courses', JSON.stringify(courses))
                displayData()
            Swal.fire(
                'Deleted!',
                'Course has been deleted.',
                'success'
            )
            }
        })
}

//delete all
deleteBtn.onclick= function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                courses = [];
                localStorage.setItem('courses', JSON.stringify(courses))
                data.innerHTML='';  
            Swal.fire(
                'Deleted!',
                'All data has been deleted.',
                'success'
            )
            }
        })
}

//search
/**
 * onkeyup
 * onkeypress
 * onkeydown
 */

search.onkeyup = function(){
    console.log(search.value);
    var result='';
    for(var i=0; i<courses.length;i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){
            result+=`
            <tr>
                <td>${i+1}</td>
                <td>${courses[i].courseName}</td>
                <td>${courses[i].courseCategory}</td>
                <td>${courses[i].coursePrice}</td>
                <td>${courses[i].courseDescription}</td>
                <td>${courses[i].courseCapacity}</td>
                <td><button class="btn btn-info">update</button></td>
                <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
            </tr>
            `
        }
    }
    data.innerHTML = result;
}


//update

function getCourse(index){
    var course = courses[index]
    courseName.value = course.courseName
    courseCategory.value = course.courseCategory
    coursePrice.value = course.coursePrice
    courseDescription.value = course.courseDescription
    courseCapacity.value = course.courseCapacity
    addbtn.value = 'Update Course'
    currentIndex = index
}

function updateCourse(){
    var course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity:courseCapacity.value
    }
    var name= courses[currentIndex].courseName 
    console.log(courses[currentIndex])
    courses[currentIndex].courseName = course.courseName
    courses[currentIndex].courseCategory = course.courseCategory
    courses[currentIndex].coursePrice = course.coursePrice
    courses[currentIndex].courseDescription = course.courseDescription
    courses[currentIndex].courseCapacity = course.courseCapacity
    localStorage.setItem('courses', JSON.stringify(courses))
    addbtn.value = 'Add Course'
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${name} updated successfully`,
        showConfirmButton: false,
        timer: 1500
    })
}


//validation
/**
 * 
 * regex
 */


/**
 * first letter capital
 * name 3-10
 * no numbers
 * regex /^[A-Z][a-z]{2,10}$/
 */
courseName.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,10}$/
    if(pattern.test(courseName.value)){//Web
        if(courseName.classList.contains('is-invalid')
        && document.getElementById('nameAlert').classList.contains('d-block')){
            courseName.classList.replace('is-invalid', 'is-valid')
            document.getElementById('nameAlert').classList.replace('d-block', 'd-none')
        }else
            courseName.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    }else{
        if(courseName.classList.contains('is-valid')
        && document.getElementById('nameAlert').classList.contains('d-none')){
            document.getElementById('nameAlert').classList.replace('d-none', 'd-block')
            courseName.classList.replace('is-valid', 'is-invalid')
        }else
            courseName.classList.add('is-invalid')
            document.getElementById('nameAlert').classList.replace('d-none', 'd-block')
        addbtn.setAttribute('disabled', 'disabled')
    }
}


//category
/**
 * first letter capital
 * name 3-20
 * no numbers
 * regex /^[A-Z][a-z]{2,20}$/
 */
courseCategory.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,20}$/
    if(pattern.test(courseCategory.value)){//Web
        if(courseCategory.classList.contains('is-invalid')){
            courseCategory.classList.replace('is-invalid', 'is-valid')
        }else
            courseCategory.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    }else{
        if(courseCategory.classList.contains('is-valid')){
            courseCategory.classList.replace('is-valid', 'is-invalid')
        }else
            courseCategory.classList.add('is-invalid')
        addbtn.setAttribute('disabled', 'disabled')
    }
}

//price
/**
 * numbers
 * 3 digits
 * regex /^[0-9]{3,4}$
 */
coursePrice.onkeyup = function(){
    var pattern = /^[0-9]{3,4}$/
    if(pattern.test(coursePrice.value)){//Web
        if(coursePrice.classList.contains('is-invalid')){
            coursePrice.classList.replace('is-invalid', 'is-valid')
        }else
            coursePrice.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    }else{
        if(coursePrice.classList.contains('is-valid')){
            coursePrice.classList.replace('is-valid', 'is-invalid')
        }else
            coursePrice.classList.add('is-invalid')
        addbtn.setAttribute('disabled', 'disabled')
    }
}

//description
/**
 * first letter capital
 *  numbers
 * number of chars 120
 * regex /^[A-Z][a-z]{2,20}$/
 */
courseDescription.onkeyup = function(){
    var pattern = /^[A-Z][A-Za-z0-9\s]{3,120}$/
    if(pattern.test(courseDescription.value)){//Web
        if(courseDescription.classList.contains('is-invalid')){
            courseDescription.classList.replace('is-invalid', 'is-valid')
        }else
            courseDescription.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    }else{
        if(courseDescription.classList.contains('is-valid')){
            courseDescription.classList.replace('is-valid', 'is-invalid')
        }else
            courseDescription.classList.add('is-invalid')
        addbtn.setAttribute('disabled', 'disabled')
    }
}

//capacity
/**
 * numbers
 * 2-3 digits
 * regex //^[0-9]{2,3}$/
 */
courseCapacity.onkeyup = function(){
    var pattern = /^[0-9]{2,3}$/
    if(pattern.test(courseCapacity.value)){//Web
        if(courseCapacity.classList.contains('is-invalid')){
            courseCapacity.classList.replace('is-invalid', 'is-valid')
        }else
            courseCapacity.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    }else{
        if(courseCapacity.classList.contains('is-valid')){
            courseCapacity.classList.replace('is-valid', 'is-invalid')
        }else
            courseCapacity.classList.add('is-invalid')
        addbtn.setAttribute('disabled', 'disabled')
    }
}