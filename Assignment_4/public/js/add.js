document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-user-form');
    const db = document.getElementById('database-select');
    const result = document.getElementById('result');
    const redirect = document.getElementById('redirect');
    const submit = document.getElementById('submit-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const edit = urlParams.get('edit');

    redirect.addEventListener('click', () => {
        window.location.href = '/';
    });

    if (edit === 'true') {
        const dbValue = urlParams.get('db');
        const user = JSON.parse(localStorage.getItem('user'));
        const id = dbValue === 'mongodb' ? user._id : user.id;

        form.name.value = user.name;
        form.birthdate.value = new Date(user.birthDate).toISOString().split('T')[0];
        form.email.value = user.email;
        form.phonenumber.value = user.phonenumber;
        form.streetaddress.value = user.address;
        form.database.value = dbValue;
        M.updateTextFields();

        submit.textContent = 'Save';

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: form.name.value,
                birthDate: form.birthdate.value,
                email: form.email.value,
                phonenumber: form.phonenumber.value,
                address: form.streetaddress.value
            }

            const response = await fetch(`/api/${db.value}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                alert('Failed to update user');
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                result.textContent = data.msg;
            }

            form.reset();
            submit.textContent = 'Add';
            localStorage.removeItem('user');
        });
    } else {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: form.name.value,
                birthDate: form.birthdate.value,
                email: form.email.value,
                phonenumber: form.phonenumber.value,
                address: form.streetaddress.value            
            }
    
            const response = await fetch(`/api/${db.value}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                alert('Failed to add user');
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                result.textContent = data.msg;
            }
    
            form.reset();
        });
    }
});