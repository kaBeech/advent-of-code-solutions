# What went well during the sprint?

### Writing code in a more real-world way

- Well, I asked for it! This was a good excuse to add in a Constructor, and I
  took the opportunity to reassess some of my structure and build this Day in a
  way closer to how I build real-world projects. All in all, I'm proud of this
  code. It could be improved, sure, but it's relatively clean, organized, SOLID,
  and optimized, especially for a short challenge

### Optimizing!

- Related to the above. I hadn't planned on thinking too much about optimization
  during this project, but after choosing to memoize the visibility data I
  started noticing more opportunities to speed up my code as I was writing it

  - Mostly these are little things. Like when writing error handling it makes
    more sense to put the errors that are cheaper to check for before more
    expensive ones (e.g. `if (myVar > 0)` before `if (myVar % 1 === 0)` ), or
    more common errors before less common ones. I think that's fun! Noticing
    those opportunites (if not actively looking for them) makes writing fairly
    straightforward code feel more like a game =)

### Organizing!

- Also related to the above. Adding separate folders for tests makes my
  directory feel cleaner

- Adding a runnable app.ts that shows the solutions makes this friendlier for
  someone (e.g. me in three years) looking at this with less context

- Adding the ToDo helps me reserve focus for current tasks while also organizing
  my ideas for future improvements. It also helps me feel better about
  displaying obviously imperfect code. Knowing that outside observers can see
  that I'm aware that my code isn't perfect and that I have ideas for how to
  improve it (once I have the resources to do so) is reassuring =)

## Takeaways

- Writing more real-world-ready code feels good

- Optimizing is fun!

- Healthy organization adds a lot of clarity

- Have fun!

# What can I learn from difficult points?

### When struggling with a hard obstacle, it's okay to write non-optimized code to get through it!

- During the couple times when my functions weren't working as expected and I
  didn't know why, I found myself working extra hard to reason out a solution
  optimized to a similar level as the code around it. I found that it was easier
  to just write out the possible solution however it come easiest/fastest, and
  then to refactor afterwards. Once the code works it is often clearer to see
  how best to refactor it anyway!

### Define Types before writing tests

- This wasn't a big difficulty, but early on it became clear that these tests
  were easier to write when I already have some Types defined, and maybe some
  scaffolding done as well. I'm still experimenting with my order of approach
  (and I like keeping it flexible), but this general flow seems to be working
  well:

  1. Add boilerplate content
  2. Add pseudocode
  3. Define Types
  4. Scaffold modules (i.e. add properly typed inputs and outputs and any
     necessary boilerplate content)
  5. Write tests
  6. Pass tests
  7. Refactor
  8. Retrospect

## Takeaways

- When called for it's okay to write non-optimized code and refactor later!

- Following a sensible order of approach can be very beneficial! But always stay
  flexible!

# Ideas for possible future implementaion

### ^_^
