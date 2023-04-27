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

let tagsSelect = [
    'JavaScript',
    'Python',
    'HTML',
    'CSS',
    'Java',
    'PHP',
    'Ruby',
]
let tagsSelected = [];

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

renderTagSelect(tagsSelect);
renderTagSelected(tagsSelected);

function renderTagSelect(tagsSelect) {
    selectContainer.innerHTML = '<div class="tag-item tag-item-create hidden w-100 ps-3 py-2"></div>';
    createTag = selectContainer.querySelector('.tag-item-create');
    createTagHandle();

    let tagsSelectObjs = tagsSelect.map((tag, index) => {
        let tagObj = document.createElement('div');
        tagObj.classList.add('tag-item', 'w-100', 'ps-3', 'py-2');
        tagObj.innerText = tag;
        
        return tagObj;
    });

    tagsSelectObjs.forEach((tagObj) => {
        selectContainer.append(tagObj);

        tagObj.onclick = () => {
            // REMOVE FROM TagsSelect
            tagsSelect.splice(tagsSelect.indexOf(tagObj.innerText), 1);
            renderTagSelect(tagsSelect);
            // ADD TO TagsSelected
            tagsSelected.push(tagObj.innerText);
            renderTagSelected(tagsSelected);
            // CLEAR input
            tagInput.value = '';
        }
        tagObj.onmousedown = (event) => {
            event.preventDefault();
        }
    });
}

function renderTagSelected(tagsSelected) {
    if (tagsSelected.length === 0) {
        document.querySelector('.tag-input + button').toggleAttribute('disabled', true);
    }
    else {
        document.querySelector('.tag-input + button').toggleAttribute('disabled', false);
    }

    selectedContainer.innerHTML = '';

    let tagsSelectedObjs = tagsSelected.map((tag, index) => {
        let tagObj = document.createElement('div');
        tagObj.classList.add('selected-tag-item', 'd-flex', 'align-items-center');
        
        let child1 = document.createElement('p');
        child1.classList.add('p-1');
        child1.innerText = tag;

        let child2 = document.createElement('i');
        child2.classList.add('ti-close');

        tagObj.append(child1, child2);

        return tagObj;
    });

    tagsSelectedObjs.forEach((tagObj) => {
        selectedContainer.append(tagObj);

        tagObj.onclick = () => {
            // REMOVE FROM tagsSelected
            tagsSelected.splice(tagsSelected.indexOf (tagObj.innerText), 1);
            renderTagSelected(tagsSelected);
            // ADD TO tagsSelect
            tagsSelect.push(tagObj.innerText);
            renderTagSelect(tagsSelect);
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
        tagsSelected.push(tagInput.value);
        renderTagSelected(tagsSelected);
        // CLEAR input
        tagInput.value = '';
        createTag.classList.add('hidden');
    }
    createTag.onmousedown = (event) => {
        event.preventDefault();
    }
}