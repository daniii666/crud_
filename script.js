document.addEventListener('DOMContentLoaded', () => {
    const jobForm = document.getElementById('jobForm');
    const applicantTable = document.getElementById('applicantTable').getElementsByTagName('tbody')[0];
    let applicants = [];

    jobForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const fullName = this.fullName.value;
        const position = this.position.value;
        const email = this.email.value;
      

        const applicant = { id: Date.now(), fullName, position, email};
        applicants.push(applicant);
        this.reset();
        renderTable();
    });

    function renderTable() {
        applicantTable.innerHTML = '';
        applicants.forEach(applicant => {
            const row = applicantTable.insertRow();
            row.insertCell(0).textContent = applicant.fullName;
            row.insertCell(1).textContent = applicant.position;
            row.insertCell(2).textContent = applicant.email;
            const actionsCell = row.insertCell(3);
            actionsCell.className = 'actions';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit';
            editButton.addEventListener('click', () => editApplicant(applicant.id));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => deleteApplicant(applicant.id));
            actionsCell.appendChild(deleteButton);
        });
    }

    function editApplicant(id) {
        const applicant = applicants.find(applicant => applicant.id === id);
        if (applicant) {
            jobForm.fullName.value = applicant.fullName;
            jobForm.position.value = applicant.position;
            jobForm.email.value = applicant.email;

            deleteApplicant(id);
        }
    }

    function deleteApplicant(id) {
        applicants = applicants.filter(applicant => applicant.id !== id);
        renderTable();
    }
});
