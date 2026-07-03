export class CommandParser {
  /**
   * Parses a raw command string into a list of commands and their arguments.
   * Handles quoted strings and the && operator.
   * Example: `cd .. && cat "about us.txt" arg2` -> `[['cd', '..'], ['cat', 'about us.txt', 'arg2']]`
   */
  public static parse(input: string): string[][] {
    const commands: string[][] = [];
    let currentArgs: string[] = [];
    let currentArg = '';
    let inQuotes = false;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === '&' && !inQuotes && input[i + 1] === '&') {
        // Handle &&
        i++; // skip second &
        if (currentArg.length > 0) {
          currentArgs.push(currentArg);
          currentArg = '';
        }
        if (currentArgs.length > 0) {
          commands.push(currentArgs);
          currentArgs = [];
        }
      } else if (char === ' ' && !inQuotes) {
        if (currentArg.length > 0) {
          currentArgs.push(currentArg);
          currentArg = '';
        }
      } else {
        currentArg += char;
      }
    }

    if (currentArg.length > 0) {
      currentArgs.push(currentArg);
    }

    if (currentArgs.length > 0) {
      commands.push(currentArgs);
    }

    return commands;
  }
}
