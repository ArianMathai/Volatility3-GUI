## Folder Structure

### Frontend
Everything related to front end. Communicates with backend.

### Backend

Everything related to backend. Communicates with volatility3. 

### Tests

Everything related to testing. Communicates with backend and frontend. 

### Volatility3

The volatility engine. See its own README file on how to get started and 
installing requirements.

# Git Workflow Guide

## Branching

Create a new branch for each feature or bug fix:

```bash
git checkout -b feature/feature-name
```
```bash
git checkout -b bugfix/bug-name
````

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
To install all the necessary dependencie for testing, go to the root directory terminal and use:
```bash
pip install -e .
pip install -r ./requirements.txt
```

You can then test using:
```bash
pytest --maxfail=1 --disable-warnings -v
```
or simply run the tests through the ide
