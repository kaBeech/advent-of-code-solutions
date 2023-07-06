# What went well during the sprint?

### Adding the solutions into testing

This is a nice way to track solutions!

### I did well at staying in the flow!

I did a good job about staying focused on making a working product and not
worrying too much about optimization/refactoring right away. I didn't modularize
as much as I would like (see also the following sections), but it was helpful to
look at the situation from the other point of view and to see more clearly why
and how I want to modularize further

### I took a couple breaks!

Wooo! Breaks are important!! I actually felt better and more productive today
when I was taking good breaks than when I was just powering through =)

## Takeaways

- Add solutions into testing
- Balance staying in the flow with big-picture thinking
- Take breaks!!
- Have fun!

# What can I learn from difficult points?

### Modularize more!

I like to break up these files into smaller modules and my approach to this
puzzle wasn't very conducive to that. See also 'Ideas for future
implementation.' In particular I'd like to add more testing for individual
modules. I don't want to get bogged down with writing tests but I want to have
more tests in place. Think about streamlining writing tests

## Takeaways

- Modularize more!
- Think about streamlining writing tests

# Ideas for possible future implementation

### Modularize further and use state

It might be getting to be a good time to start using factory functions with
state and all that in this project. The variables are getting intricate enough
that it's becoming problematic to pass them around between ES6 modules without
state and I'd really like to modularize these more so I don't wind up with a
single .ts file that's 111 lines long

Maybe I'll refactor this one later to be more modular!
