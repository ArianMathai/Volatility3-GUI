## CTF first flag example

[![Image of going through CTF](https://img.youtube.com/vi/KQwYCWXXF94/0.jpg)](https://www.youtube.com/watch?v=KQwYCWXXF94)

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

