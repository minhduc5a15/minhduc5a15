export class CommandParser {
  /**
   * Parses a raw command string into a list of commands and their arguments.
   * Handles quoted strings and the && operator.
   * Example: `cd .. && cat "about us.md" arg2` -> `[['cd', '..'], ['cat', 'about us.md', 'arg2']]`
   */
  public static parse(input: string): string[][] {
    const commands: string[][] = [];
    let currentArgs: string[] = [];
    let currentArg = '';
    let quoteChar: string | null = null;
    let hasArg = false;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (!quoteChar && (char === '"' || char === "'")) {
        quoteChar = char;
        hasArg = true; // Ensure empty quotes like "" are captured
      } else if (quoteChar === char) {
        quoteChar = null;
      } else if (char === '&' && !quoteChar && input[i + 1] === '&') {
        // Handle &&
        i++; // skip second &
        if (hasArg || currentArg.length > 0) {
          currentArgs.push(currentArg);
          currentArg = '';
          hasArg = false;
        }
        if (currentArgs.length > 0) {
          commands.push(currentArgs);
          currentArgs = [];
        }
      } else if (char === ' ' && !quoteChar) {
        if (hasArg || currentArg.length > 0) {
          currentArgs.push(currentArg);
          currentArg = '';
          hasArg = false;
        }
      } else {
        currentArg += char;
        hasArg = true;
      }
    }

    if (hasArg || currentArg.length > 0) {
      currentArgs.push(currentArg);
    }

    if (currentArgs.length > 0) {
      commands.push(currentArgs);
    }

    return commands;
  }
}
