import {
    readTag,
    createTag,
    deleteBlog,
} from './crud.js';



// GLOBALS
let formItems = document.querySelectorAll('.form-item');
let tagInput = document.querySelector('.tag-input input');
let submitButton = document.querySelector('button[type="submit"]');
let selectContainer = document.getElementsByClassName('tag-list')[0];
let selectedContainer = document.getElementsByClassName('selected-tag')[0];
let createTagButton = selectContainer.querySelector('.tag-item-create');
let tagSelects, tagSelecteds, existedTags;


/**
 * Activate input parts of the form individually
 */
function activeItems(formItemIndex) {
    formItems[formItemIndex].classList.add('active');
    formItems[formItemIndex].querySelector('button').classList.remove('hidden');
    (
        formItems[formItemIndex].querySelector('input') ||
        formItems[formItemIndex].querySelector('textarea')
    ).removeAttribute('disabled');
}


/**
 * Set events for Next button of each input fields
 */
function handleTextInput() {
    formItems.forEach((formItem, formItemIndex) => {
        let formItemInput = formItem.querySelector('input') || formItem.querySelector('textarea');
        let formItemButton = formItem.querySelector('button');
        
        formItemInput.oninput = () => {
            if (formItemInput.value !== '') {
                formItemButton.toggleAttribute('disabled', false);
            } else {
                formItemButton.toggleAttribute('disabled', true);
            }
        };

        formItemButton.onclick = () => {
            activeItems(Number(formItemIndex) + 1);
            formItemButton.classList.add('hidden');
        };
    });
}


/**
 * Request tag data from API, render tag input components
 */
function handleTagInput(tagSelectsArg = null, tagSelectedsArg = []) {
    readTag((data) => {
        existedTags = data;

        tagSelects = tagSelectsArg ? tagSelectsArg : [...existedTags];
        tagSelecteds = tagSelectedsArg;
        
        handleTagInputByText();
        
        renderTagSelect(tagSelects);
        renderTagSelected(tagSelecteds);
    })
}


/**
 * Handle text inputted tags (filter tag list, create new tags)
 */
function handleTagInputByText() {
    tagInput.onfocus = () => {
        selectContainer.classList.remove('hidden');
    };
    tagInput.onblur = () => {
        selectContainer.classList.add('hidden');
    };

    let isInput = false;
    tagInput.oninput = () => {
        isInput = tagInput.value !== '';

        if (isInput) {
            createTagButton.classList.remove('hidden');
            createTagButton.innerText = `Create '${tagInput.value}'`;
        } else {
            createTagButton.classList.add('hidden');
        }
    };
}


/**
 * Render tag list
 */
function renderTagSelect(tagSelects) {
    selectContainer.innerHTML =
        '<div class="tag-item tag-item-create hidden w-100 ps-3 py-2"></div>';
    createTagButton = selectContainer.querySelector('.tag-item-create');
    handleTagCreate();

    let tagSelectObjs = tagSelects.map((tag, index) => {
        let tagObj = document.createElement('div');
        tagObj.classList.add('tag-item', 'w-100', 'ps-3', 'py-2');
        tagObj.innerText = tag.name;

        return tagObj;
    });


    tagSelectObjs.forEach((tagObj) => {
        selectContainer.append(tagObj);

        tagObj.onclick = () => {
            // REMOVE FROM TagsSelect
            let selectingTag = tagSelects.splice(tagSelects.map(tag => tag.name).indexOf(tagObj.innerText), 1)[0];
            renderTagSelect(tagSelects);
            // ADD TO TagsSelected
            tagSelecteds.push(selectingTag);
            renderTagSelected(tagSelecteds);
            // CLEAR input
            tagInput.value = '';
        };
        tagObj.onmousedown = (event) => {
            event.preventDefault();
        };
    });
}


/**
 * Render selected tag
 */
function renderTagSelected(tagSelecteds) {
    if (tagSelecteds.length === 0) {
        document.querySelector('.tag-input + button').classList.add('disabled');
    } else {
        document
            .querySelector('.tag-input + button')
            .classList.remove('disabled');
    }

    selectedContainer.innerHTML = '';

    let tagSelectedObjs = tagSelecteds.map((tag, index) => {
        let tagObj = document.createElement('div');
        tagObj.classList.add(
            'selected-tag-item',
            'd-flex',
            'align-items-center'
        );

        let child1 = document.createElement('p');
        child1.classList.add('tag-name', 'p-1');
        child1.innerText = tag.name;

        let child2 = document.createElement('p');
        child2.classList.add('rm-tag');
        child2.innerHTML = '&times;';

        tagObj.append(child1, child2);

        return tagObj;
    });

    tagSelectedObjs.forEach((tagObj) => {
        selectedContainer.append(tagObj);

        tagObj.onclick = () => {
            let tagName = tagObj.querySelector('.tag-name');
            // REMOVE FROM tagSelecteds
            let deselectingTag = tagSelecteds.splice(tagSelecteds.map((tag) => tag.name).indexOf(tagName.innerText), 1)[0];
            renderTagSelected(tagSelecteds);
            // ADD TO tagSelects
            if (deselectingTag.id < existedTags.length) {
                tagSelects.push(deselectingTag);
                renderTagSelect(tagSelects);
            }
            else {
                // REMOVE NEW TAG FROM DATABASE
            }
        };
        tagObj.onmousedown = (event) => {
            event.preventDefault();
        };
    });
}


/**
 * Handle creating new tag
 */
function handleTagCreate() {
    createTagButton.onclick = () => {
        // ADD TO TagsSelected
        tagSelecteds.push({'id': existedTags.length, 'name': tagInput.value});
        renderTagSelected(tagSelecteds);
        // CLEAR input
        tagInput.value = '';
        createTagButton.classList.add('hidden');
    };
    createTagButton.onmousedown = (event) => {
        event.preventDefault();
    };
}


/**
 * Handle form submitting and tag's modification
 */
function handleForm(formName, callback) {
    submitButton.onclick = (e) => {
        e.preventDefault();

        let form = document.forms[formName];

        let data = {};

        for (let i in form) {
            if (form.hasOwnProperty(i) && form[i].name) {
                data[form[i].name] = form[i].value;
            }
        }

        data['author_id'] = 1;
        data['id'] = Number(form['id'].value);
        data['tag_ids'] = tagSelecteds.map((tag) => {
            if (existedTags.findIndex(existedTag => {
                for (let index in existedTag) {
                    if (existedTag[index] !== tag[index])
                        return false;
                }
                return true;
            }) === -1) {
                createTag(tag);
            }
            return tag.id;
        });

        callback(data, data.id);
    };
}


export {
    activeItems,
    handleTextInput,
    handleTagInput,
    handleTagInputByText,
    renderTagSelect,
    renderTagSelected,
    handleTagCreate,
    handleForm,
}