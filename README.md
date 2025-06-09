#  🧠 Learning WebApp (Anki like app) 🧠

<p align="center">
  <img src="https://img.shields.io/badge/frontend-Angular-orange?logo=angular&logoColor=white&style=flat-square">
  <img src="https://img.shields.io/badge/backend-Node.js-green?logo=node.js&logoColor=white&style=flat-square">
  <img src="https://img.shields.io/badge/database-PostgreSQL-blue?logo=postgresql&logoColor=white&style=flat-square">
  <img src="https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white&style=flat-square">
</p>

---
## How to run the project

See the [Build file](./BUILD.md)

## 📖 Description of the website
### 🎯Purpose of the application: 
Working on the user lesson memory using flashcards.

### ✨ Main features:
- ✅ Create/modify/delete a course
- ✅ Create/modify/delete a flashcard
- ✅ Select a course as Favorite 
- ✅ Work on a course (start/review)
- ✅ See course details (questions/statistics)
- ✅ See general statistics


## 🗂 Description of the pages of the website 
The website is working with a static menu at the top of the website pages.
### PAGE 1 - Home page
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/e60d0f9f-010f-4520-8828-c7745c306ef9)

The home page is a simple page telling the user what he can do on this website.

### PAGE 2 - Browse packages
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/2898a72f-78f1-4b18-8b8c-8522572778b1)

On the browse packages page, the user is able to see all his selected courses (title, progression...), and add them as favorite if he wants to. 
He can also filter on his favorite courses only. 

### PAGE 3 - Learning page
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/a7f361de-f9e2-43f3-88cf-3b5c5637df37)
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/3564de0c-cebd-4f24-a73f-2fe88bebd69b)

On the learning page, the user can see his course details (Name, Description, Difficulty, Progression, Total number of facts, Number of facts to learn in the next session, what to review for this package, Total time spent on the package, Time spent now on the package)  
He can do different actions: 
- start learning some facts 
- start reviewing some facts 
- see all facts from the course.

#### HOW IT WORKS
Once the user starts a course for the first time, all the facts of the course are in "Learning Status".
When a "Learning Status" fact is shown, the user can say :
- to review : it will be shown again the next time the user presses the "Start learning" button.
- correct : 
    - if it's the first time -> the fact will show again in 10 minutes
    - if it's the second time -> the fact will shown again in 10 minutes 
    - if it's the third time -> the fact goes in "Revision Status" and will be shown again tomorrow
- easy : the fact goes in "Revision status" and will be shown again in 4 days, no matter what his previous answers were.

When a "Revision Status" fact is shown, the user can say :
- to review : the time when the fact will be shown again decreases by 1 day (with a minimum of 1 day)
- difficult : the time when the fact will be shown again increases by 2 days
- correct : the time when the fact will be shown again increases by 5 days
- easy : the time when the fact will be shown again increases by 10 days



### PAGE 4 - Statistics
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/53da85ed-22b8-4b8a-a538-4396b4d357a2)

On the statistics page, the user can see his state of condidence on the answers he gave while studying his course, for all courses in progress.  
He can also see the evolution of the time spent by session on a specific course in progress over time. 
A course "in progress" corresponds to a course that has a progression greater than 0.  
The progress of a course is calculated based on the number of facts that are in a "Revision" status. If a course only has facts that are still in "Learning" status, then its progress will be 0, and the package won't appear in the statistics page.

### PAGE 5 - Create a course/package
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/030172f0-2b08-4ab3-a416-fe10aa9ad24a)

To create a package, the user has to fill some data :
Package Name, Package Description, Package Difficulty, Mark as Favorite or not.

### PAGE 6 - Create a fact in a package
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/f61dcc4e-b674-4790-8e34-6778f54d0aa7)

To create a fact, the user has to choose a package in which the fact will be studied. 
Then, he has to fill the Fact Question and the Fact Answer.

### PAGE 7 - Modify a course/package
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/1bbfe506-364d-4780-af11-78b081c1e68d)

The user start by selecting the package he wants to modify. Then, he can change informations such as:
Package Name, Package Description, Package Difficulty, Mark as Favorite or not.
He can save his modifications or reset them.

### PAGE 8 - Modify a fact in a package
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/fcb74f71-0a28-4a6e-ab10-a0ba1fd95a50)

To create a fact, the user has to choose the package in which the fact is located. 
Then, he has to choose the fact he wants to modify. Finally, he can change the Fact Question and the Fact Answer.
He can save his modifications or reset them.

### PAGE 9 - Delete a course/package
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/0da27bca-d51a-4a5f-9641-f715dc282bc3)

To delete a course, the user has to select the course he wants to delete and click the button.

### PAGE 10 - Delete a fact
![image](https://github.com/mathiasbalian/learning-webapp/assets/107269689/e2112579-7594-48a2-a93e-a82727e298e7)

To delete a fact, the user has to select the fact he wants to delete and click the button.

## 🛠️ Used technologies 
**Frontend**  
- Angular  
- TypeScript  
- ng-Bootstrap  
- Angular Material  
- HighCharts  

**Backend**  
- Node.js  
- TypeScript  
- Express  
- PostgreSQL (via Sequelize)



## ✅ Conclusion 
The website is operational.

## 👥Contacts / Authors
- Mathias BALIAN
- Paul LACOUTIERE
- Hector MELL MARIOLLE
- Lucie GALLOIS
