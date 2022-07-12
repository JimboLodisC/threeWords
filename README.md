# threeWords by Jim Collins

***

This is a NodeJS app that will run from the command line. Place a text file in the same directory as the application and run it via the following command:

`node app.js filename.txt`

Output will be the Top 100 3-word phrases in this format:

> three word phrase - 10  
another phrase entry - 7  
yet another one - 4  
here's this phrase - 2  
and this one - 2

Should be performant enough to process over 22,000 lines of Herman Melville's *Moby Dick* in about 250 milliseconds.

Also works with unicode characters such as Æ Ää Öö Üü Ěě ē̂ τ ρ ῆ μ α

Two test files have been provided:

* `test_file.txt`: smaller data set, unicode chars
* `moby_dick.txt`: 22,108 lines of text

***

#### Current known issues: 
* needs tests!

#### Future Ideas
* Dockerize it
* add ability to point to text files stored on a server or on github
* handle multiple files at once