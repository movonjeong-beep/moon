// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');

        // Check if submit button should be enabled
        checkSubmitButton();
    });
});

// Text input handling
const textInput = document.getElementById('text-input');
const submitBtn = document.getElementById('submit-btn');

textInput.addEventListener('input', checkSubmitButton);

// Image upload handling
const imageUpload = document.getElementById('image-upload');
const selectImageBtn = document.getElementById('select-image-btn');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const imagePreview = document.getElementById('image-preview');
const previewImg = document.getElementById('preview-img');
const removeImageBtn = document.getElementById('remove-image-btn');

let uploadedImage = null;

// Click to select image
selectImageBtn.addEventListener('click', () => {
    imageUpload.click();
});

uploadPlaceholder.addEventListener('click', () => {
    imageUpload.click();
});

// Handle file selection
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageFile(file);
    }
});

// Drag and drop functionality
uploadPlaceholder.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadPlaceholder.classList.add('drag-over');
});

uploadPlaceholder.addEventListener('dragleave', () => {
    uploadPlaceholder.classList.remove('drag-over');
});

uploadPlaceholder.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadPlaceholder.classList.remove('drag-over');

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageFile(file);
    }
});

// Handle image file
function handleImageFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        uploadedImage = file;
        previewImg.src = e.target.result;
        uploadPlaceholder.style.display = 'none';
        imagePreview.style.display = 'block';
        checkSubmitButton();
    };

    reader.readAsDataURL(file);
}

// Remove image
removeImageBtn.addEventListener('click', () => {
    uploadedImage = null;
    previewImg.src = '';
    imageUpload.value = '';
    uploadPlaceholder.style.display = 'block';
    imagePreview.style.display = 'none';
    checkSubmitButton();
});

// Check if submit button should be enabled
function checkSubmitButton() {
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    let hasInput = false;

    if (activeTab === 'text') {
        hasInput = textInput.value.trim().length > 0;
    } else if (activeTab === 'image') {
        hasInput = uploadedImage !== null;
    }

    submitBtn.disabled = !hasInput;
}

// Submit button click handler
submitBtn.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;

    if (activeTab === 'text') {
        const text = textInput.value.trim();
        alert(`텍스트가 제출되었습니다!\n\n내용: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`);
    } else if (activeTab === 'image') {
        alert(`이미지가 제출되었습니다!\n\n파일명: ${uploadedImage.name}\n크기: ${(uploadedImage.size / 1024).toFixed(2)} KB`);
    }
});

// Modal functionality
const introBtn = document.getElementById('intro-btn');
const modal = document.getElementById('intro-modal');
const closeModalBtn = document.getElementById('close-modal');

introBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});

// Initialize
checkSubmitButton();
