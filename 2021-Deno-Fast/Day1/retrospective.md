# What went well during the sprint?

### That was fun!

- Yeah!

### Setting up my workspace beforehand = <3

- This was a good idea! Since I had everything at hand, I got to focus on the puzzle

### Part 1 went quick!

- Possibly because the puzzle was so simple

- Possibly went quicker than Part 2 because I was writing the program from scratch, so I had a more intimate knowledge of what each part was doing

- Also partly because I got lucky/smart/worked around the rules a little bit. My program was giving me a solution that was too low by 1
    - When you submit an answer on the Advent Of Code website it will tell you if your answer is too low or too high (or just right) and then lock you out from submitting another answer for 60 seconds. When this happened I went back and looked at my code
    
        I thought my code might have been improperly handling the first input, so I submitted a number one greater as an answer. The 60 seconds weren't up, so I was given a notification that I was locked out. I went back to my code to scrutinize anything else that might be at issue

        At some point I remembered to try the one-greater-number again and it worked!

        So the moral is... I dunno, be lucky?

    - A similar thing actually happened in Part 2, on a larger scale. I knew something was fuzzy with the break clauses*, so I messily fiddled with it until I got an answer that seemed correct. Lucky for me, it was

    ...buuuuut I still didn't have a program that reliably gave both solutions (or that I intimately understood, even though I had written it less than an hour previously)

    So I kept playing with it after finishing, until I A) intimately understood the program, B) figured out the underlying issue, and C) got the program to reliably give both solutions (not necessarily in that order)

    When I say 'playing with it,' I do mean playing. While this did give me valuable clues, it wasn't until I used a more structured approach and stepped through the function line by line that I fully understood what was going on

    * (is this even a term? I mean the parts where I used `return` to end the `.forEach()` statements. I don't think it's actually a loop, but whatever)

    - So! The moral is twofold:
        
        1. Be resourceful! Think outside the box! Use whatever suitable resources are available to solve the task at hand. You can always come back after the timer stops to gain a greater understanding <3
        2. If your code is doing things you don't expect, pretend you don't understand it and step through it line by line!
    


## Takeaways

- Set up workspace beforehand!

- Use whatever suitable resources are available to solve the task at hand

- If your code is doing things you don't expect, pretend you don't understand it and step through it line by line!

- Have fun!

# What can I learn from difficult points?

### Keep code readable while coding quickly!

- Readable code is fast to understand and fast to debug!

- When having difficulty getting the correct solution, improve the readability of the code and the solution may become clearer

### When times get rough, go step by step!

- When having difficulty debugging, step through the program one line at a time

## Takeaways

- Readable code is fast to debug!

- When having difficulty getting the correct solution, improve the readability of the code 

- When having difficulty debugging, step through the program one line at a time

# Ideas for possible future implementation

### Keep both Parts 1 and 2 in the same branch

- So far, since this project is focused on speedrunning, I haven't felt the need to separate branches into Part 1 and Part 2 (like I'm doing for the 2022 challenges)

### Keep appPart1.ts for archive

- At least while the programs remain single files

- I like being able to compare my code between the 2 programs

- I also like being able to destructively edit the code for the Part 1 solution (even though this program gives both solutions correctly)