document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-field');
    const typeSelect = document.getElementById('field-type');
    const labelInput = document.getElementById('field-label');
    const preview = document.querySelector('.form-preview');

    addBtn.addEventListener('click', () => {
        const fieldType = typeSelect.value;
        const labelText = labelInput.value.trim();

        if (!labelText) {
            alert('Please enter a label for the new field!');
            return;
        }

        const wrapper = document.createElement('label');
        wrapper.className = 'preview-field';

        const lbl = document.createElement('label');
        lbl.textContent = labelText;
        lbl.style.display = 'block';
        lbl.style.marginTop = '12px';

        let inputElement;

        switch (fieldType) {
            case 'text':
                inputElement = document.createElement('input');
                inputElement.type  = 'text';
                inputElement.style.width = '100%';
                inputElement.style.marginTop = '6px';
                inputElement.style.padding = '8px';
                inputElement.style.border = '1px solid #ccc';
                inputElement.style.borderRadius = '4px';
                break;
            
            case 'checkbox':
                inputElement = document.createElement('input');
                inputElement.type  = 'checkbox';
                inputElement.style.marginLeft = '6px';
                break;

            case 'radio':
                inputElement = document.createElement('input');
                inputElement.type = 'radio';
                inputElement.name = 'radio-group';
                inputElement.style.marginLeft = '6px';
                break;

            default:
                return;
        }

        wrapper.appendChild(lbl);
        wrapper.appendChild(inputElement);
        preview.appendChild(wrapper);

        labelInput.value = '';
    });
});