export default {
  '**/*.js?(x)': (filenames) =>
    filenames.length > 10 ? 'eslint .' : `eslint ${filenames.join(' ')}`
}
