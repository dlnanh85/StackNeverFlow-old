// INPUT FIELDS HANDLE
let formFields = document.querySelectorAll('.form-item');

function activeField(formField) {
    formField.classList.add('active');
    formField.querySelector('button').classList.remove('hidden');
    (formField.querySelector('input') || formField.querySelector('textarea')).removeAttribute('disabled');
}

// Activate the first input field
activeField(formFields[0]);

formFields.forEach((item, index) => {
    let formFieldInput = item.querySelector('input') || item.querySelector('textarea');
    let nextButton = item.querySelector('button');
    
    formFieldInput.oninput = () => {
        if (formFieldInput.value !== '') {
            nextButton.toggleAttribute('disabled', false);
        }
        else {
            nextButton.toggleAttribute('disabled', true);
        }
    }

    nextButton.onclick = () => {
        if (index !== formFields.length - 1) {
            activeField(formFields[Number(index) + 1]);
            item.querySelector('button').classList.add('hidden');
        }
    }
});


// TAGS HANDLE
const tags = [
    'JavaScript',
    'Python',
    'HTML',
    'CSS',
    'Java',
    'PHP'
];
let tagSelects = [...tags];
let tagSelecteds = [];

let selectContainer = document.getElementsByClassName('tag-list')[0];
let selectedContainer = document.getElementsByClassName('selected-tag')[0];
let tagInput = document.querySelector('.tag-input input');
let createTag = selectContainer.querySelector('.tag-item-create');


tagInput.onfocus = () => {
    selectContainer.classList.remove('hidden');
}
tagInput.onblur = () => {
    selectContainer.classList.add('hidden');
}

let isInput = false;
tagInput.oninput = () => {
    isInput = tagInput.value !== '';

    if (isInput) {
        createTag.classList.remove('hidden');
        createTag.innerText = `Create "${tagInput.value}"`;
    }
    else {
        createTag.classList.add('hidden');
    }
}

renderTagSelect(tagSelects);
renderTagSelected(tagSelecteds);

function renderTagSelect(tagSelects) {
    selectContainer.innerHTML = '<div class="tag-item tag-item-create hidden w-100 ps-3 py-2"></div>';
    createTag = selectContainer.querySelector('.tag-item-create');
    createTagHandle();

    let tagsSelectObjs = tagSelects.map((tag, index) => {
        let tagObj = document.createElement('div');
        tagObj.classList.add('tag-item', 'w-100', 'ps-3', 'py-2');
        tagObj.innerText = tag;
        
        return tagObj;
    });

    tagsSelectObjs.forEach((tagObj) => {
        selectContainer.append(tagObj);

        tagObj.onclick = () => {
            // REMOVE FROM TagsSelect
            tagSelects.splice(tagSelects.indexOf(tagObj.innerText), 1);
            renderTagSelect(tagSelects);
            // ADD TO TagsSelected
            tagSelecteds.push(tagObj.innerText);
            renderTagSelected(tagSelecteds);
            // CLEAR input
            tagInput.value = '';
        }
        tagObj.onmousedown = (event) => {
            event.preventDefault();
        }
    });
}

function renderTagSelected(tagSelecteds) {
    if (tagSelecteds.length === 0) {
        document.querySelector('.tag-input + button').classList.add('disabled');
    }
    else {
        document.querySelector('.tag-input + button').classList.remove('disabled');
    }

    selectedContainer.innerHTML = '';

    let tagsSelectedObjs = tagSelecteds.map((tag, index) => {
        let tagObj = document.createElement('div');
        tagObj.classList.add('selected-tag-item', 'd-flex', 'align-items-center');
        
        let child1 = document.createElement('p');
        child1.classList.add('tag-name', 'p-1');
        child1.innerText = tag;

        let child2 = document.createElement('p');
        child2.classList.add('rm-tag');
        child2.innerHTML = '&times;';

        tagObj.append(child1, child2);

        return tagObj;
    });

    tagsSelectedObjs.forEach((tagObj) => {
        selectedContainer.append(tagObj);

        tagObj.onclick = () => {
            let tagName = tagObj.querySelector('.tag-name');
            // REMOVE FROM tagSelecteds
            tagSelecteds.splice(tagSelecteds.indexOf (tagName.innerText), 1);
            renderTagSelected(tagSelecteds);
            // ADD TO tagSelects
            tagSelects.push(tagName.innerText);
            renderTagSelect(tagSelects);
        }
        tagObj.onmousedown = (event) => {
            event.preventDefault();
        }
    })
}


// HANDLE CREATE NEW TAG
function createTagHandle() {
    createTag.onclick = () => {
        // ADD TO TagsSelected
        tagSelecteds.push(tagInput.value);
        renderTagSelected(tagSelecteds);
        // CLEAR input
        tagInput.value = '';
        createTag.classList.add('hidden');
    }
    createTag.onmousedown = (event) => {
        event.preventDefault();
    }
}



// HANDLE CREATE BLOG
let submitButton = document.querySelector('button[type="submit"]')
submitButton.onclick = (e) => {
    e.preventDefault();

    createBlog();

    // console.log([document.forms['blog-create']['problem']])

    document.forms['blog-create'].submit();
}


function createBlog() {
    let form = document.forms['blog-create'];
    form['author-id'].value = 1;
    form['tag-ids'].value = JSON.stringify(tagSelecteds.map(tag => {
        return tags.indexOf(tag)
    }));

    return true;
}