# What went well during the sprint?

### Writing human-readable pseudocode is a good idea!

- A lot of times I'll write pseudocode in the way that's quickest to get the ideas from my head onto the page. That means I'll often write it in a way that looks closer to JavaScript than plain English

- Getting ideas onto the page quickly is a good instinct, but actually writing down pseudocode in plain English can be beneficial both in seeing a problem holistically and in quickly understanding intent when I come back to the pseudocode later

- One way to combine the best of both approaches is to quickly write down ideas using JS-style pseudocode, and then to edit the pseudocode afterwards to be more human-readable

### Having a separate .ts file for scratch TypeScript helps keep my pseudocode neat and tidy

- Using notes.ts for scratch TypeScript while pseudocoding allows me to quickly write ideas in code (and using Intellisense) while keeping notes.md clear for more human-readable pseudocode

- Keeping TS in a .ts file instead of a .md file also keeps Prettier from auto-formatting it like an .md file (this auto-formatting makes ts hard to read)

### I like having the separate solvePart1 and solvePart2 modules

- Having just an extra layer of separation between app.js and the logic in those modules helps things feel cleaner

## Takeaways

- Write human-readable pseudocode, or edit pseudocode to be human readable after the ideas are on the page

- Use notes.ts for scratch ts while pseudocoding

- Have fun!

# What can I learn from difficult points?

### Some modules were difficult to test because their methods largely dealt with changes to unexposed state

### Part 2 was tricky

- Look out for hints in the question prompts! That "You'll need to find another way to keep your worry levels manageable" line was a conspicuous clues

- Remember to take breaks! Especially when it seems like working more is yielding diminishing returns. Doing so can give your brain a fresh outlook, and maybe help you think about clues in a different light

## Takeaways

- Look out for hints in the question prompts!

- Remember to take breaks!

# Ideas for possible future implementation

### Continue using notes.ts for scratch ts while pseudocoding

### Put energy into making pseudocode human-readable

### Take breaks!
