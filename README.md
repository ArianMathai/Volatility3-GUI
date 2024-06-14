## Requirements

python or python3

## Setup

- Clone the repo
```
git clone <repository_url>
```

#### For python 
```bash
pip install -r requirements.txt
```
#### For python3 
```bash
pip3 install -r requirements.txt
```

### On Mac/Linux:
```bash
cd backend
```
run script:
```bash
pyinstaller --add-data "app.py:." --add-data "./util/*.py:util" --add-data "../volatility3/*:volatility3" app.py
```
navigate back to root directory:
```bash
cd ..
```
### On Windows:
```bash
cd backend
```
run script:
```bash
pyinstaller --add-data "app.py;." --add-data "./util/*.py;util" --add-data "../volatility3/*;volatility3" app.py
```
### Navigate to frontend and run npm install
Navigate back to root directory:
```bash
cd ..
```
Navigate to frontend:
```bash
cd frontend
```
Run npm install
```bash
npm install
```
Navigate back to root folder:
```bash
cd ..
```

### To run application:
```bash
npm start
```



## Folder Structure

### Frontend
Everything related to front end. Communicates with backend.

### Backend

Everything related to backend. Communicates with volatility3. 

### Tests

Everything related to testing. Communicates with backend.

### Volatility3

The volatility engine. See its own README file on how to get started and 
installing requirements.

# Git Workflow Guide

## Branching

Create a new branch for each feature or bug fix:



## Pushing Changes
Push changes regularly to your branch:
```bash
git push --set-upstream origin feature/feature-name
```
After the initial push, use:
```bash
git add .
git commit -m "Your message"
git push
```

## Pulling Remote Branches
To pull a branch created by another team member:

```bash
git fetch origin
git checkout origin/remote-branch-name
```

Alternatively, create a local branch from the remote branch:

```bash
git checkout -b local-branch-name origin/remote-branch-name
```

## Creating Pull Requests
When a feature is complete, create a pull request on GitHub and invite a team member for review.

## Merging and Reviewing
The reviewer checks the definition of done and merges into the main branch.

## Handling Merge Conflicts
Merge conflicts will occur, but not many if we follow this routine, and 
feel free to ping for help if needed! :)

Pulling Remote Branches
To pull a branch created by another team member:

# Testing
To install all the necessary dependencies for testing, go to the root directory terminal and use:
```bash
pip install -e .
pip install -r ./requirements_dev.txt
```

Then download this test memory dump (20210430-Win10Home-20H2-64bit-memdump.mem.7z):

https://archive.org/download/Africa-DFIRCTF-2021-WK02

once that's installed, unzip and move the .mem file into the "tests" folder of this project.

you can then enter the terminal at the projects root and type:
```bash
pip install tox
```
After tox is installed, simply type:
```bash
tox
```
in the project root.

