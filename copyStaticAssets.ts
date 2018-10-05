import * as shell from 'shelljs';

shell.mkdir('-p', 'build/dist/public');
shell.cp('-R', 'src/public/*', 'build/dist/public/');