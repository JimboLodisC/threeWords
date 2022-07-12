# threeWords by Jim Collins

***

This is a NodeJS app that will run from the command line. Place a text file in the same directory as the application and run it via the following command:

`node app.js filename.txt`

Output will be the Top Five 3-word phrases in this format:

> threewordphrase - 10  
anotherphraseentry - 7  
yetanotherone - 4  
heresthisphrase - 2  
andthisone - 2

***

#### Current known issues:
* slow performance on larger text files (currently processing 219 lines / second)
* need to enable command line parameter for filename instead of hardcoding
* needs tests!
