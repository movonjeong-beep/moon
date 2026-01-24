// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });

    // PDF file upload handling
    const pdfUpload = document.getElementById('pdf-upload');
    const pdfFileName = document.getElementById('pdf-file-name');

    pdfUpload.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            pdfFileName.textContent = '선택된 파일: ' + fileName;
            pdfFileName.classList.add('show');
        }
    });

    // Image file upload handling
    const imageUpload = document.getElementById('image-upload');
    const imageFileName = document.getElementById('image-file-name');
    const imagePreview = document.getElementById('image-preview');

    imageUpload.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const fileName = file.name;

            imageFileName.textContent = '선택된 파일: ' + fileName;
            imageFileName.classList.add('show');

            // Show image preview
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Preview">';
            };
            reader.readAsDataURL(file);
        }
    });

    // Drag and drop functionality for PDF
    const pdfLabel = pdfUpload.nextElementSibling;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        pdfLabel.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        pdfLabel.addEventListener(eventName, () => {
            pdfLabel.style.borderColor = '#4285f4';
            pdfLabel.style.background = '#f0f7ff';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        pdfLabel.addEventListener(eventName, () => {
            pdfLabel.style.borderColor = '#dee2e6';
            pdfLabel.style.background = '#f8f9fa';
        }, false);
    });

    pdfLabel.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0 && files[0].type === 'application/pdf') {
            pdfUpload.files = files;
            pdfFileName.textContent = '선택된 파일: ' + files[0].name;
            pdfFileName.classList.add('show');
        } else {
            alert('PDF 파일만 업로드 가능합니다.');
        }
    }, false);

    // Drag and drop functionality for Image
    const imageLabel = imageUpload.nextElementSibling;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        imageLabel.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        imageLabel.addEventListener(eventName, () => {
            imageLabel.style.borderColor = '#4285f4';
            imageLabel.style.background = '#f0f7ff';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        imageLabel.addEventListener(eventName, () => {
            imageLabel.style.borderColor = '#dee2e6';
            imageLabel.style.background = '#f8f9fa';
        }, false);
    });

    imageLabel.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0 && files[0].type.startsWith('image/')) {
            imageUpload.files = files;
            const fileName = files[0].name;

            imageFileName.textContent = '선택된 파일: ' + fileName;
            imageFileName.classList.add('show');

            // Show image preview
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Preview">';
            };
            reader.readAsDataURL(files[0]);
        } else {
            alert('이미지 파일만 업로드 가능합니다.');
        }
    }, false);

    // Service introduction button
    const introBtn = document.querySelector('.intro-btn');

    introBtn.addEventListener('click', function() {
        alert('서비스 소개:\n\n이 서비스는 텍스트 입력, PDF 파일, 이미지 파일을 처리하는 플랫폼입니다.\n\n주요 기능:\n• 텍스트 직접 입력\n• PDF 문서 업로드\n• 이미지 파일 업로드 및 편집\n\n편리하고 직관적인 인터페이스로 다양한 형식의 데이터를 처리할 수 있습니다.');
    });

    // Text input validation for submit button (future feature)
    const textInput = document.querySelector('.text-input');

    textInput.addEventListener('input', function() {
        // This would enable/disable submit button based on content
        // Implementation pending based on requirements
        if (this.value.trim().length > 0) {
            console.log('텍스트 입력 데이터 있음 - 제출 버튼 활성화 가능');
        } else {
            console.log('텍스트 입력 데이터 없음 - 제출 버튼 비활성화');
        }
    });
});
