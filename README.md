# 🥗 Organic Recipe Sharing Platform

![Main Page](https://github.com/user-attachments/assets/2e11ebd3-7214-447c-8b1d-82655cdb7e64)

---
<br>
<br>
<br>

## 🛠️ How to Run the Project  
<br>

1. Navigate to the `frontend` folder and run the following commands: 
   
   ```bash
   cd frontend
   npm start
      ```


2. Navigate to the `backend` folder and start the server with: 
   
   ```bash
   cd backend
   nodemon index.js
   ```

3. Navigate to the `custom-proxy-server` folder and start the server with: 
   
   ```bash
   cd custom-proxy-server
   nodemon index.js
   ```  

<br>
<br>
<br>

## 🌟 Main Features
<br>

### 🖥️ Main Page

<img src="https://github.com/user-attachments/assets/fdad47e4-086e-42e0-a3da-f8480b707673" alt="Main Page" width="500"/>

![Responsive View](https://github.com/user-attachments/assets/b0bb0647-e82d-4fb4-89b7-1a7d38363d88)

- **Fully Responsive Design**: The platform is designed to adapt to different screen sizes, ensuring an optimal user experience across devices.
<br>

| Mobile - Main | Mobile - Recipe |
|--------------|-----------------|
| <img src="https://github.com/user-attachments/assets/e22206ed-a84b-4b84-8c2b-e49c1ebf291a" alt="반응형-메인페이지" width="320"/> | <img src="https://github.com/user-attachments/assets/39ac03ce-79e9-4e4a-be12-6ddb516c8d3a" alt="반응형-레시피 검색" width="320"/> |



 <br/>

### 🥑 Recipe Page
![검색 기능](https://github.com/user-attachments/assets/bd8f4c19-af6e-497e-9f6e-3e13c2cedbff)


- **Search**: Users can search by pressing the Enter key, clicking the search icon, or selecting from the list.
- **Backend Optimization**: Search filtering handled server-side for improved performance.
- **Debounce Function**: Prevents excessive API calls during typing.

<br/>

### 📄 Detail Page
<img src="https://github.com/user-attachments/assets/e946003d-5a99-4e7a-8750-6a33854a42e1" alt="Detail Page" width="500"/>


- **Comment Functionality**: Users can leave comments on posts.
- **Edit Comments**: Logged-in users can edit their comments.
<br>

### 📝 Registration Page

![Registration Page](https://github.com/user-attachments/assets/e737a0d9-159a-4a8e-b089-cc4fab9f03bc)

- **Form Validation**: Ensures that all fields are correctly filled out.
- **Password Encryption**: Passwords are securely hashed using `bcryptjs`.
<br>

### 🔐 Login Page

<img width="1706" alt="Login Page" src="https://github.com/user-attachments/assets/bc1cb6fd-b1b7-472e-9de2-17d2c42fa611">

- **Form Validation**: Ensures correct input for user authentication.
- **Password Encryption**: Secure password storage with `bcryptjs`.
- **JWT Authentication**: Upon successful login, a JWT is generated and stored in the cookie for session management.


