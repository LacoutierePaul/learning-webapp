Node & React Project - Learning WebApp
=====================


# Description of the website
## Purpose of the application: 
Working on the user lesson memory using flashcards.

## Main features:
- [x]  Create/modify/delete a course
- [x]  Create/modify/delete a flashcard
- [x]  Select a course as Favorite 
- [x]  Work on a course (start/review)
- [x]  See course details (all questions/statistics)
- [x]  See general statistics 


## Description of the pages of the website 
The website is working with a static menu at the top of the website pages.
[PAGE 1 - home page]

On the home page, the user sees the different possibilities that he has: starting(or reviewing) a course he already selected or selecting a new course. 

[PAGE 2 - browse packages]

On the browse packages page, the user is able to see all his selected courses (title, progression...), and add them as favorite if he wants to. 
He can also filter on his favorite courses only. 

[PAGE 3 - learning page]

On the learning page, the user can see his course details (Name, Description, Difficulty, Progression, Total number of facts, Number of facts to learn in the next session, what to review for this package, Total time spent on the package, Time spent now on the package)
He can do different actions: 
- start learning his course 
- start reviewing his course 
- see all facts from the course.

#### HOW IT WORKS? 
Once the user start a course, all the facts of the course are in "Learning Status".
When a "Learning Status" fact is shown, the user can say :
- to review : it will be shown again at the end of the list of facts.
- correct : 
    - if it's the first time -> the fact will show again in 10 minutes
    - if it's the second time -> the fact will shown again in 10 minutes 
    - if it's the third time -> the fact goes in "Revision Status" and will be shown again tomorrow
- easy : the fact goes in "Revision status" and will be shown again in 4 days

When a "Revision Status" fact is shown, the user can say :
- to review : the time when the fact will be shown again decrease of 1 day (with a minimum of 1 day)
- difficult : the time when the fact will be shown again increase of 2 days
- correct : the time when the fact will be shown again increase of 5 days
- easy : the time when the fact will be shown again increase of 10 days



[PAGE 4 - statistics]

On the statistics page, the user can see his state of condidence on the answers he gave while studying his course, for all started courses. 
He can also see his time spent on specific courses over time.

[PAGE 5 - create a course/package]

To create a package, the user has to fill some data :
Package Name, Package Description, Package Difficulty, Mark as Favorite or not.

[PAGE 6 - create a fact in a package]

To create a fact, the user has to choose a package in which the fact will be studied. 
Then, he has to fill the Fact Question and the Fact Answer.

[PAGE 7 - modify a course/package]

The user start by selecting the package he wants to modify. Then, he can change informations such as:
Package Name, Package Description, Package Difficulty, Mark as Favorite or not.
He can save his modifications or reset them.

[PAGE 8 - modify a fact in a package]

To create a fact, the user has to choose the package in which the fact is located. 
Then, he has to choose the fact he wants to modify. Finally, he can change the Fact Question and the Fact Answer.
He can save his modifications or reset them.

[PAGE 9 - delete a course/package]

To delete a course, the user has to select the course he wants to delete and click the button.

[PAGE 10 - delete a fact]

To delete a fact, the user has to select the fact he wants to delete and click the button.

## Used technologies 
- Front-End: Angular, Typescript, ng-Bootstrap.
- Back-End: Node.js, TypeScript, Express + PostgreSQL


# Installation
## Prerequisites


## Utilisation


## Tests Unitaires ????


## Known Issues/Limitations


## Future improvements


# Conclusion 
The website is operational.

# Contacts / Authors
- [Mathias BALIAN]
- [Paul LACOUTIERE]
- [Hector MELL MARIOLLE]
- [Lucie GALLOIS]
