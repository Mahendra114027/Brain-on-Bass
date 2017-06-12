# Brain-on-Bass
Music recommender and visualiser

## Install notes.
We are using python 2.7, so please download and install python2.7 from [python.org](https://www.python.org/) for your system.

##### for windows
1. install ```unirest``` - for making HTTP requests
    > pip install unirest
2. install ```pyaudio``` - for recoding voice input
 - download the right wheel file from [python wheel](http://www.lfd.uci.edu/~gohlke/pythonlibs/) for pyaudio i.e if you use **python 2.7** with windows and a **64 bit system**
then, just download **PyAudio-0.2.11-cp27-cp27m-win_amd64.whl** wheel file, and the use the following command to install this wheel file.
    > pip install PyAudio-0.2.11-cp27-cp27m-win_amd64.whl
3. install ```SpeechRecognition``` - for audio to text conversion API call.
    > pip install SpeechRecognition
        

##### for linux
1. install ```unirest``` - for making HTTP requests
    > pip install unirest
2. install port audio dependency and other dependency
    > apt-get install portaudio19-dev python-all-dev
3. install ```pyaudio``` - for recoding voice input
    > apt-get install python-pyaudio
- **OPTIONAL** - The program require pyaudio@0.2.9, if it gives the following error, upgrade using the following command.
    > pip install pyaudio==0.2.9 --upgrade
4. install ```SpeechRecognition``` - for audio to text conversion API call.
    > pip install SpeechRecognition
        