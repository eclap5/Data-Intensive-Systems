document.addEventListener('DOMContentLoaded', () => {
    const db = document.getElementById('database-select');
    const dataType = document.getElementById('datatype-select');
    const submit = document.getElementById('submit-button');
    const resultList = document.getElementById('results');

    db.selectedIndex = 0;
    dataType.selectedIndex = 0;

    submit.addEventListener('click', async () => {
        const dbVal = db.value;
        const dataTypeVal = dataType.value;
        
        try {
            resultList.innerHTML = '';

            switch (dataTypeVal) {
                case "users":
                    const usersResponse = await fetch(`/api/${dbVal}/users`);
                    const usersData = await usersResponse.json();

                    if (dbVal === 'mongodb') {
                        presentUsers(usersData.mongoUsers);
                    } else if (dbVal === 'postgres') {
                        presentUsers(usersData.postgresUsers);
                    } else {
                        presentUsers(usersData.mongoUsers);
                        presentUsers(usersData.postgresUsers);
                    }
                    break;

                case "books":
                    const booksResponse = await fetch(`/api/${dbVal}/books`);
                    const booksData = await booksResponse.json();

                    if (dbVal === 'mongodb') {
                        presentBooks(booksData.mongoBooks);
                    } else if (dbVal === 'postgres') {
                        presentBooks(booksData.postgresBooks);
                    } else {
                        presentBooks(booksData.mongoBooks);
                        presentBooks(booksData.postgresBooks);
                    }
                    break;

                case "borrow-history":
                    const borrowResponse = await fetch(`/api/${dbVal}/borrow-history`);
                    const borrowData = await borrowResponse.json();

                    if (dbVal === 'mongodb') {
                        presentBorrows(borrowData.mongoResponse, dbVal);
                    } else if (dbVal === 'postgres') {
                        presentBorrows(borrowData.postgreResponse, dbVal);
                    } else {
                        presentBorrows(borrowData.mongoResponse, dbVal);
                        presentBorrows(borrowData.postgreResponse, dbVal);
                    }
                    break;
            
                default:
                    break;
            }

        } catch (error) {
            console.error(error);
        }
    });

    const presentUsers = (array) => {  
        array.forEach(user => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const name = document.createElement('li');
            const birthDate = document.createElement('li');
            const email = document.createElement('li');
            const phonenumber = document.createElement('li');
            
            name.textContent = `Name: ${user.name}`;
            birthDate.textContent = `Birth Date: ${user.birthDate}`;
            email.textContent = `Email: ${user.email}`;
            phonenumber.textContent = `Phone number: ${user.phonenumber}`;
            
            cardContent.appendChild(name);
            cardContent.appendChild(birthDate);
            cardContent.appendChild(email);
            cardContent.appendChild(phonenumber);
            card.appendChild(cardContent);
            resultList.appendChild(card);
        });
    }

    const presentBooks = (array) => {
        array.forEach(book => {
            console.log(book);
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const title = document.createElement('li');
            const year = document.createElement('li');
            const isbn = document.createElement('li');
            const pages = document.createElement('li');
            const publisher = document.createElement('li');
            
            title.textContent = `Title: ${book.title}`;
            year.textContent = `Year: ${book.year}`;
            isbn.textContent = `ISBN: ${book.isbn}`;
            pages.textContent = `Pages: ${book.pages}`;
            publisher.textContent = `Publisher: ${book.publisher}`;
            
            cardContent.appendChild(title);
            cardContent.appendChild(year);
            cardContent.appendChild(isbn);
            cardContent.appendChild(publisher);
            cardContent.appendChild(pages);
            card.appendChild(cardContent);
            resultList.appendChild(card);
        });
    }

    const presentBorrows = (array, dbVal) => {
        array.forEach((borrow) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const user = document.createElement('li');
            const book = document.createElement('li');
            const borrowDate = document.createElement('li');
            const returnDate = document.createElement('li');
            const deleteBtn = document.createElement('button');
            
            user.textContent = `User: ${borrow.user.name}`;
            book.textContent = `Book: ${borrow.book.title}`;
            borrowDate.textContent = `Borrow date: ${borrow.borrowDate.split('T')[0]}`;
            returnDate.textContent = `Return date: ${borrow.returnDate.split('T')[0]}`;
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('btn');
            
            deleteBtn.addEventListener('click', async () => {
                try {
                    const id = dbVal === 'mongodb' ? borrow._id : borrow.id;

                    const response = await fetch(`/api/${dbVal}/borrow-history/${id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        card.remove();
                    }
                } catch (error) {
                    console.error(error);
                }
            });

            cardContent.appendChild(user);
            cardContent.appendChild(book);
            cardContent.appendChild(borrowDate);
            cardContent.appendChild(returnDate);
            cardContent.appendChild(deleteBtn);
            card.appendChild(cardContent);
            resultList.appendChild(card);
        });
    }
});